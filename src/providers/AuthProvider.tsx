import React, { useEffect, useState } from "react"

import { useRouter } from "expo-router"

import AsyncStorage from "@react-native-async-storage/async-storage"

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
  const [role, setRole] = useState<string | null>(null)

  const [loading, setLoading] = useState<boolean>(true)
  const [hasMetrics, setHasMetrics] = useState<boolean>(false)

  const checkAuthentication = async () => {
    try {
      setLoading(true)
      const token = await AsyncStorage.getItem("accessToken")
      setIsAuthenticated(!!token)

      if (token) {
        const userInfo = await whoIAm()

        setUser(userInfo)
        setRole(userInfo?.role)

        if (userInfo.role === "User") {
          const metricsData = await getMetricsByUserId(userInfo.userId)
          const metricsExist = metricsData && metricsData.length > 0
          setHasMetrics(metricsExist)

          await delay(2000)

          if (metricsExist) {
            router.replace("/tabs/user/home")
          } else {
            router.replace("/onboarding/welcome")
          }
        } else if (userInfo.role === "Consultant") {
          await delay(2000)
          router.replace("/tabs/consultant/dashboard")
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
      setRole(userInfo?.role)

      if (userInfo.role === "User") {
        const metricsData = await getMetricsByUserId(userInfo.userId)
        const metricsExist = metricsData && metricsData.length > 0

        if (metricsExist) {
          router.replace("/tabs/user/home")
        } else {
          router.replace("/onboarding")
        }
      } else if (userInfo.role === "Consultant") {
        router.replace("/tabs/consultant/dashboard")
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
        role,
        hasMetrics,
        login: handleLogin,
        register: handleRegister,
        logout: handleLogout,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
