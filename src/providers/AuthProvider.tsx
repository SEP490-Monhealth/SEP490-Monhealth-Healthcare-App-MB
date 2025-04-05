import React, { useEffect, useState } from "react"

import { useRouter } from "expo-router"

import AsyncStorage from "@react-native-async-storage/async-storage"

import { Modal } from "@/components/global/atoms"

import { AuthContext } from "@/contexts/AuthContext"
import { useError } from "@/contexts/ErrorContext"
import { useModal } from "@/contexts/ModalContext"

import { login, logout, register, whoIAm } from "@/services/authService"
import { getMetricsByUserId } from "@/services/metricService"

import { delay } from "@/utils/helpers"

interface UserPayload {
  userId: string
  consultantId?: string
  fullName: string
  phoneNumber: string
  email: string
  role: string
  subscription: string
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const handleError = useError()
  const { showModal } = useModal()

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

  const [user, setUser] = useState<UserPayload | null>(null)
  const [role, setRole] = useState<string | null>("Member")

  const [loading, setLoading] = useState<boolean>(true)

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
        const userInfo = await whoIAm(showModal)

        setUser(userInfo)
        setRole(userInfo?.role)

        if (
          userInfo.role === "Member" ||
          userInfo.role === "Subscription Member"
        ) {
          const metricData = await getMetricsByUserId(userInfo.userId)
          const metricExist = metricData && metricData.length > 0

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
          setRole("Member")
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

      await delay(2000)
      setRole("Member")
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
      // 1. Login và lưu token
      const response = await login(phoneNumber, password, showModal)
      await AsyncStorage.setItem("accessToken", response.accessToken)
      await AsyncStorage.setItem("refreshToken", response.refreshToken)
      setIsAuthenticated(true)

      // 2. Lấy thông tin user
      const userInfo = await whoIAm(showModal)
      setUser(userInfo)

      const selectedRole = role || "Member"
      const actualRole = userInfo.role

      // CASE 1: Đăng nhập dưới dạng Member
      if (selectedRole === "Member") {
        // 1.1: Tài khoản là Consultant
        if (actualRole === "Consultant") {
          setModalContent({
            title: "Thông báo",
            description:
              "Tài khoản này là chuyên viên tư vấn. Vui lòng đăng nhập với tư cách chuyên viên.",
            confirmText: "Đồng ý"
          })
          setIsModalVisible(true)

          // Logout và chuyển về sign-in cho Consultant
          await AsyncStorage.removeItem("accessToken")
          await AsyncStorage.removeItem("refreshToken")
          setIsAuthenticated(false)
          setUser(null)
          setRole("Consultant")
          router.replace("/auth/sign-in")
          return
        }

        // 1.2: Tài khoản là Member
        const metricData = await getMetricsByUserId(userInfo.userId)
        if (metricData && metricData.length > 0) {
          // Đã có metrics -> vào home
          router.replace("/(tabs)/user/home")
        } else {
          // Chưa có metrics -> vào onboarding
          router.replace({
            pathname: "/onboarding",
            params: { role: "Member" }
          })
        }
        return
      }

      // CASE 2: Đăng nhập dưới dạng Consultant
      if (selectedRole === "Consultant") {
        // 2.1: Tài khoản là Member - Cho phép chuyển đổi thành Consultant
        if (actualRole === "Member" || actualRole === "Subscription Member") {
          // Chuyển tới onboarding consultant để setup profile
          router.replace({
            pathname: "/onboarding",
            params: { role: "Consultant" }
          })
          return
        }

        // 2.2: Tài khoản là Consultant
        if (actualRole === "Consultant") {
          if (userInfo.consultantId) {
            // Đã setup consultant profile -> vào dashboard
            router.replace("/(tabs)/consultant/dashboard")
          } else {
            // Chưa setup consultant profile -> vào onboarding
            router.replace({
              pathname: "/onboarding",
              params: { role: "Consultant" }
            })
          }
        }
        return
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
      await register(fullName, email, phoneNumber, password, showModal)
      await handleLogin(phoneNumber, password)
    } catch (error) {
      handleError(error)
      throw error
    }
  }

  const handleLogout = async () => {
    try {
      await logout(showModal)
      await AsyncStorage.removeItem("accessToken")
      await AsyncStorage.removeItem("refreshToken")
      setIsAuthenticated(false)
      setUser(null)
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
