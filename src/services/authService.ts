import axios from "axios"

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
      throw {
        isCustomError: true,
        message: "Không nhận được phản hồi từ máy chủ."
      }
    }

    const { success, message, data } = response.data

    if (success && data) {
      return {
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        expiredAt: data.expiredAt
      }
    } else {
      throw {
        isCustomError: true,
        message: message || "Đăng nhập không thành công."
      }
    }
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.log(
        "Lỗi từ server (login):",
        error.response?.data || error.message
      )
      throw error
    } else {
      console.log("Lỗi không phải Axios (login):", error)
      throw {
        isCustomError: true,
        message: "Đã xảy ra lỗi không mong muốn."
      }
    }
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
      throw {
        isCustomError: true,
        message: response?.data?.message || "Đăng ký tài khoản thất bại."
      }
    }
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.log(
        "Lỗi từ server (register):",
        error.response?.data || error.message
      )
      throw error
    } else {
      console.log("Lỗi không phải Axios (register):", error)
      throw {
        isCustomError: true,
        message: "Đã xảy ra lỗi không mong muốn."
      }
    }
  }
}

export const logout = async (): Promise<void> => {
  try {
    const response = await monAPI.post(`/auth/logout`)

    if (!response || !response.data?.success) {
      throw {
        isCustomError: true,
        message: response?.data?.message || "Đăng xuất thất bại."
      }
    }
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.log(
        "Lỗi từ server (logout):",
        error.response?.data || error.message
      )
      throw error
    } else {
      console.log("Lỗi không phải Axios (logout):", error)
      throw {
        isCustomError: true,
        message: "Đã xảy ra lỗi không mong muốn."
      }
    }
  }
}
