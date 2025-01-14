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
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const handleError = useError()

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<UserPayload | null>(null)
  const [loading, setLoading] = useState(true)
  const [hasMetrics, setHasMetrics] = useState(false)

  const checkAuthentication = async () => {
    try {
      setLoading(true)
      const token = await AsyncStorage.getItem("accessToken")
      setIsAuthenticated(!!token)

      if (token) {
        const userInfo = await whoIAm()
        setUser(userInfo)

        const metricsData = await getMetricsByUserId(userInfo.userId)
        const metricsExist = metricsData && metricsData.length > 0
        setHasMetrics(metricsExist)

        await delay(2000)

        if (metricsExist) {
          router.replace("/(tabs)/home")
        } else {
          router.replace("/(onboarding)/welcome")
        }
      } else {
        await delay(2000)
        router.replace("/(onboarding)/welcome")
      }
    } catch (error) {
      handleError(error)

      setIsAuthenticated(false)
      setUser(null)
      setHasMetrics(false)

      await delay(2000)
      router.replace("/(auth)/sign-in")
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

      const metricsData = await getMetricsByUserId(userInfo.userId)
      const metricsExist = metricsData && metricsData.length > 0

      if (metricsExist) {
        router.replace("/(tabs)/home")
      } else {
        router.replace("/(setup)")
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
      router.replace("/(auth)/sign-in")
    } catch (error) {
      handleError(error)
      throw error
    }
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
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
