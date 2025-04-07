import React, { useEffect, useState } from "react"

import { useRouter } from "expo-router"

import AsyncStorage from "@react-native-async-storage/async-storage"

import { Modal } from "@/components/global/atoms"

import { AuthContext } from "@/contexts/AuthContext"
import { useError } from "@/contexts/ErrorContext"
import { useModal } from "@/contexts/ModalContext"

import { login, logout, register, whoIAm } from "@/services/authService"

import { checkAuthentication, routeUserByRole } from "@/utils/authRoutes"

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

  const routingDependencies = {
    router,
    setIsModalVisible,
    setModalContent,
    setIsAuthenticated,
    setUser,
    setRole,
    showModal
  }

  useEffect(() => {
    const initAuth = async () => {
      setLoading(true)
      await checkAuthentication(routingDependencies, handleError)
      setLoading(false)
    }

    initAuth()
  }, [])

  const handleLogin = async (phoneNumber: string, password: string) => {
    try {
      const response = await login(phoneNumber, password, showModal)
      await AsyncStorage.setItem("accessToken", response.accessToken)
      await AsyncStorage.setItem("refreshToken", response.refreshToken)
      setIsAuthenticated(true)

      const userInfo = await whoIAm()
      setUser(userInfo)

      await routeUserByRole(userInfo, role, routingDependencies)
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
