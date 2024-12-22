import AsyncStorage from "@react-native-async-storage/async-storage"
import { useMutation } from "@tanstack/react-query"

import { login, logout, register } from "@/services/authService"

interface LoginResponse {
  accessToken: string
  refreshToken: string
  expiredAt: string
}

interface LoginPayload {
  phoneNumber: string
  password: string
}

interface RegisterPayload {
  fullName: string
  email: string
  phoneNumber: string
  password: string
}

const storeTokens = async (accessToken: string, refreshToken: string) => {
  try {
    await AsyncStorage.setItem("accessToken", accessToken)
    await AsyncStorage.setItem("refreshToken", refreshToken)
  } catch (error) {
    console.error("Lỗi khi lưu token:", error)
    throw new Error("Không thể lưu trữ token, vui lòng thử lại.")
  }
}

const removeTokens = async () => {
  try {
    await AsyncStorage.removeItem("accessToken")
    await AsyncStorage.removeItem("refreshToken")
  } catch (error) {
    console.error("Lỗi khi xóa token:", error)
    throw new Error("Không thể xóa token, vui lòng thử lại.")
  }
}

export const useLogin = () => {
  return useMutation<LoginResponse, Error, LoginPayload>({
    mutationFn: async (payload: LoginPayload) => {
      const response = await login(payload.phoneNumber, payload.password)
      await storeTokens(response.accessToken, response.refreshToken)
      return response
    }
  })
}

export const useRegister = () => {
  return useMutation<void, Error, RegisterPayload>({
    mutationFn: async (payload: RegisterPayload) => {
      await register(
        payload.fullName,
        payload.email,
        payload.phoneNumber,
        payload.password
      )
    }
  })
}

export const useLogout = () => {
  return useMutation<void, Error, void>({
    mutationFn: async () => {
      await logout()
      await removeTokens()
    }
  })
}
