import axios from "axios"

import monAPI from "@/lib/monAPI"

interface LoginResponse {
  accessToken: string
  refreshToken: string
  expiredAt: string
}

export const login = async (
  phoneNumber: string,
  password: string,
  showModal: (message: string) => void
): Promise<LoginResponse> => {
  try {
    const response = await monAPI.post(`/auth/login`, { phoneNumber, password })

    const { success, message, data } = response.data

    if (!success) {
      showModal(message || "Đăng nhập thất bại")

      throw {
        isCustomError: true,
        message: "Không nhận được phản hồi từ máy chủ"
      }
    }

    return {
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
      expiredAt: data.expiredAt
    }
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.log(
        "Lỗi từ server (login):",
        error.response?.data || error.message
      )
      throw error
    } else {
      showModal("Đã xảy ra lỗi không mong muốn")

      console.log("Lỗi không phải Axios (login):", error)
      throw {
        isCustomError: true,
        message: "Đã xảy ra lỗi không mong muốn"
      }
    }
  }
}

export const register = async (
  fullName: string,
  email: string,
  phoneNumber: string,
  password: string,
  showModal: (message: string) => void
): Promise<void> => {
  try {
    const response = await monAPI.post(`/auth/register`, {
      fullName,
      email,
      phoneNumber,
      password
    })

    const { success, message } = response.data

    if (!success) {
      showModal(message || "Đăng ký thất bại")

      throw {
        isCustomError: true,
        message: response?.data?.message || "Đăng ký tài khoản thất bại"
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
      showModal("Đã xảy ra lỗi không mong muốn")

      console.log("Lỗi không phải Axios (register):", error)
      throw {
        isCustomError: true,
        message: "Đã xảy ra lỗi không mong muốn"
      }
    }
  }
}

export const logout = async (
  showModal: (message: string) => void
): Promise<void> => {
  try {
    const response = await monAPI.post(`/auth/logout`)

    const { success, message } = response.data

    if (!success) {
      showModal(message || "Đăng xuất thất bại")

      throw {
        isCustomError: true,
        message: response?.data?.message || "Đăng xuất thất bại"
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
      showModal("Đã xảy ra lỗi không mong muốn")

      console.log("Lỗi không phải Axios (logout):", error)
      throw {
        isCustomError: true,
        message: "Đã xảy ra lỗi không mong muốn"
      }
    }
  }
}

export const whoIAm = async (showModal?: (message: string) => void) => {
  try {
    const response = await monAPI.get(`/auth/me`)

    const { success, message, data } = response.data

    if (!success) {
      if (showModal) showModal(message || "Không thể lấy thông tin người dùng")

      throw {
        isCustomError: true,
        message: "Không nhận được phản hồi từ máy chủ"
      }
    }

    return data
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      if (showModal) showModal("Đã xảy ra lỗi không mong muốn")

      console.log(
        "Lỗi từ server (whoIAm):",
        error.response?.data || error.message
      )
      throw error
    } else {
      console.log("Lỗi không phải Axios (whoIAm):", error)
      throw {
        isCustomError: true,
        message: "Đã xảy ra lỗi không mong muốn"
      }
    }
  }
}
