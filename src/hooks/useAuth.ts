import AsyncStorage from "@react-native-async-storage/async-storage"
import { useMutation } from "@tanstack/react-query"

import { login, register } from "@/services/authService"

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
  await AsyncStorage.setItem("accessToken", accessToken)
  await AsyncStorage.setItem("refreshToken", refreshToken)
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
