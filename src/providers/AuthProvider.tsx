import React, { useEffect, useState } from "react"

import { Alert } from "react-native"

import { useRouter } from "expo-router"

import AsyncStorage from "@react-native-async-storage/async-storage"

import { Modal } from "@/components/global/atoms"

import { AuthContext } from "@/contexts/AuthContext"
import { useError } from "@/contexts/ErrorContext"

import { login, logout, register, whoIAm } from "@/services/authService"
import { getMetricsByUserId } from "@/services/metricService"

import { delay } from "@/utils/helpers"

interface UserPayload {
  userId: string
  fullName: string
  phoneNumber: string
  email: string
  role: string
  subscription: string
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const handleError = useError()

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

  const [user, setUser] = useState<UserPayload | null>(null)
  const [role, setRole] = useState<string | null>("Member")

  const [loading, setLoading] = useState<boolean>(true)
  const [hasMetrics, setHasMetrics] = useState<boolean>(false)

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [modalContent, setModalContent] = useState({
    title: "",
    description: "",
    confirmText: "Đồng ý"
  })

  const checkAuthentication = async () => {
    try {
      setLoading(true)
      const token = await AsyncStorage.getItem("accessToken")
      setIsAuthenticated(!!token)

      if (token) {
        const userInfo = await whoIAm()

        setUser(userInfo)
        setRole(userInfo?.role)

        if (
          userInfo.role === "Member" ||
          userInfo.role === "Subscription Member"
        ) {
          const metricData = await getMetricsByUserId(userInfo.userId)
          const metricExist = metricData && metricData.length > 0
          setHasMetrics(metricExist)

          await delay(2000)

          if (metricExist) {
            router.replace("/(tabs)/user/home")
          } else {
            router.replace("/onboarding/welcome")
          }
        } else if (userInfo.role === "Consultant") {
          await delay(2000)
          router.replace("/(tabs)/consultant/dashboard")
        } else {
          await delay(2000)
          router.replace("/auth/sign-in")
        }
      } else {
        await delay(2000)
        router.replace("/onboarding/welcome")
      }
    } catch (error) {
      handleError(error)

      setIsAuthenticated(false)
      setUser(null)
      setHasMetrics(false)

      await delay(2000)
      router.replace("/auth/sign-in")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    checkAuthentication()
  }, [])

  const handleLogin = async (phoneNumber: string, password: string) => {
    try {
      const response = await login(phoneNumber, password)
      await AsyncStorage.setItem("accessToken", response.accessToken)
      await AsyncStorage.setItem("refreshToken", response.refreshToken)
      setIsAuthenticated(true)

      const userInfo = await whoIAm()
      setUser(userInfo)

      if (
        (role === "Consultant" && userInfo.role !== "Consultant") ||
        (role === "Member" &&
          userInfo.role !== "Member" &&
          userInfo.role !== "Subscription Member")
      ) {
        setModalContent({
          title: "Cảnh báo",
          description: "Tài khoản chưa được đăng ký là chuyên viên tư vấn",
          confirmText: "Đồng ý"
        })

        setIsModalVisible(true)
        await AsyncStorage.removeItem("accessToken")
        await AsyncStorage.removeItem("refreshToken")
        setIsAuthenticated(false)
        setUser(null)
        return
      }

      setRole(userInfo?.role)

      if (
        userInfo.role === "Member" ||
        userInfo.role === "Subscription Member"
      ) {
        const metricData = await getMetricsByUserId(userInfo.userId)
        const metricExist = metricData && metricData.length > 0

        if (metricExist) {
          router.replace("/(tabs)/user/home")
        } else {
          router.replace({
            pathname: "/onboarding",
            params: { role: "Member" }
          })
        }
      } else if (userInfo.role === "Consultant") {
        // const consultantData = await getConsultantByUserId(userInfo.userId)
        // const consultantExist = consultantData && consultantData.length > 0
        // if (consultantExist && consultantExist.status) {
        //   router.replace("/(tabs)/consultant/dashboard")
        // } else {
        //   router.replace({
        //     pathname: "/onboarding",
        //     params: { role: "Consultant" }
        //   })
        // }

        // router.replace("/(tabs)/consultant/dashboard")

        router.replace({
          pathname: "/onboarding",
          params: { role: "Consultant" }
        })
      } else {
        router.replace("/auth/sign-in")
      }
    } catch (error) {
      handleError(error)
      throw error
    }
  }

  const handleRegister = async (
    fullName: string,
    phoneNumber: string,
    email: string,
    password: string
  ) => {
    try {
      await register(fullName, email, phoneNumber, password)
      await handleLogin(phoneNumber, password)
    } catch (error) {
      handleError(error)
      throw error
    }
  }

  const handleLogout = async () => {
    try {
      await logout()
      await AsyncStorage.removeItem("accessToken")
      await AsyncStorage.removeItem("refreshToken")
      setIsAuthenticated(false)
      setUser(null)
      setHasMetrics(false)
      router.replace("/auth/sign-in")
    } catch (error) {
      handleError(error)
      throw error
    }
  }

  // if (loading) return <LoadingScreen />

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        setUser,
        role,
        setRole,
        hasMetrics,
        login: handleLogin,
        register: handleRegister,
        logout: handleLogout,
        loading
      }}
    >
      {children}

      <Modal
        isVisible={isModalVisible}
        title={modalContent.title}
        description={modalContent.description}
        confirmText={modalContent.confirmText}
        onClose={() => setIsModalVisible(false)}
      />
    </AuthContext.Provider>
  )
}
