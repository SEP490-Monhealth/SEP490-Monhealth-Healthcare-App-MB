import axios from "axios"

import monAPI from "@/lib/monAPI"

import { UserType } from "@/schemas/userSchema"

interface UserResponse {
  users: UserType[]
  totalPages: number
  totalItems: number
}

export const getAllUsers = async (
  page: number,
  limit?: number,
  search?: string,
  role?: string,
  status?: boolean
): Promise<UserResponse> => {
  try {
    const response = await monAPI.get(`/users`, {
      params: { page, limit, search, role, status }
    })

    if (!response || !response.data) {
      throw {
        isCustomError: true,
        message:
          "Không nhận được phản hồi từ máy chủ. Có thể máy chủ đang gặp sự cố hoặc kết nối mạng của bạn bị gián đoạn."
      }
    }

    const { success, message, data } = response.data

    if (success) {
      const { totalPages, totalItems, items: users } = data
      return { users, totalPages, totalItems }
    } else {
      throw {
        isCustomError: true,
        message: message || "Không thể lấy danh sách người dùng."
      }
    }
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.log("Lỗi từ server:", error.response?.data || error.message)
      throw error
    } else {
      console.log("Lỗi không phải Axios:", error)
      throw {
        isCustomError: true,
        message: "Đã xảy ra lỗi không mong muốn."
      }
    }
  }
}

export const getUserById = async (
  userId: string | undefined
): Promise<UserType> => {
  try {
    const response = await monAPI.get(`/users/${userId}`)

    if (!response || !response.data) {
      throw {
        isCustomError: true,
        message:
          "Không nhận được phản hồi từ máy chủ. Có thể máy chủ đang gặp sự cố hoặc kết nối mạng của bạn bị gián đoạn."
      }
    }

    const { success, message, data } = response.data

    if (success) {
      return data as UserType
    } else {
      throw {
        isCustomError: true,
        message: message || "Không thể lấy thông tin chi tiết người dùng."
      }
    }
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.log("Lỗi từ server:", error.response?.data || error.message)
      throw error
    } else {
      console.log("Lỗi không phải Axios:", error)
      throw {
        isCustomError: true,
        message: "Đã xảy ra lỗi không mong muốn."
      }
    }
  }
}
