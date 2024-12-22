import AsyncStorage from "@react-native-async-storage/async-storage"

import monAPI from "@/lib/monAPI"

interface LoginResponse {
  accessToken: string
  refreshToken: string
  expiredAt: string
}

export const login = async (
  phoneNumber: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const response = await monAPI.post(`/auth/login`, { phoneNumber, password })

    if (!response || !response.data) {
      throw new Error("Không nhận được phản hồi từ máy chủ.")
    }

    const { success, message, data } = response.data

    if (success && data) {
      return {
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        expiredAt: data.expiredAt
      }
    } else {
      throw new Error(message || "Đăng nhập không thành công.")
    }
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Đã xảy ra lỗi không mong muốn, vui lòng thử lại sau."
    console.error("Lỗi khi đăng nhập:", errorMessage)
    throw new Error(errorMessage)
  }
}

export const register = async (
  fullName: string,
  email: string,
  phoneNumber: string,
  password: string
): Promise<void> => {
  try {
    const response = await monAPI.post(`/auth/register`, {
      fullName,
      email,
      phoneNumber,
      password
    })

    if (!response || !response.data?.success) {
      throw new Error(response?.data?.message || "Đăng ký tài khoản thất bại.")
    }
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Đã xảy ra lỗi không mong muốn, vui lòng thử lại sau."
    console.error("Lỗi khi đăng ký tài khoản:", errorMessage)
    throw new Error(errorMessage)
  }
}

export const logout = async (): Promise<void> => {
  try {
    const response = await monAPI.post(`/auth/logout`)

    if (!response || !response.data?.success) {
      throw new Error(response?.data?.message || "Đăng xuất thất bại.")
    }
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Đã xảy ra lỗi không mong muốn, vui lòng thử lại sau."
    console.error("Lỗi khi đăng xuất:", errorMessage)
    throw new Error(errorMessage)
  }
}
