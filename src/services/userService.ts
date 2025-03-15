import axios from "axios"

import monAPI from "@/lib/monAPI"

import { UpdateUserType, UserType } from "@/schemas/userSchema"

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
          "Không nhận được phản hồi từ máy chủ. Có thể máy chủ đang gặp sự cố hoặc kết nối mạng của bạn bị gián đoạn"
      }
    }

    const { success, message, data } = response.data

    if (success) {
      const { totalPages, totalItems, items: users } = data
      return { users, totalPages, totalItems }
    } else {
      throw {
        isCustomError: true,
        message: message || "Không thể lấy danh sách người dùng"
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
        message: "Đã xảy ra lỗi không mong muốn"
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
          "Không nhận được phản hồi từ máy chủ. Có thể máy chủ đang gặp sự cố hoặc kết nối mạng của bạn bị gián đoạn"
      }
    }

    const { success, message, data } = response.data

    if (success) {
      return data as UserType
    } else {
      throw {
        isCustomError: true,
        message: message || "Không thể lấy thông tin chi tiết người dùng"
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
        message: "Đã xảy ra lỗi không mong muốn"
      }
    }
  }
}

export const updateUser = async (
  userId: string,
  userData: UpdateUserType,
  showModal: (message: string) => void
): Promise<string> => {
  try {
    const response = await monAPI.put(`/users/${userId}`, userData)

    if (!response || !response.data) {
      throw {
        isCustomError: true,
        message:
          "Không nhận được phản hồi từ máy chủ. Có thể máy chủ đang gặp sự cố hoặc kết nối mạng của bạn bị gián đoạn"
      }
    }

    const { success, message } = response.data

    if (!success) {
      throw {
        isCustomError: true,
        message: message || "Không thể cập nhật thông tin"
      }
    }

    showModal(message || "Cập nhật thông tin thành công")
    console.log(message)
    return message
  } catch (error: any) {
    let errorMessage = "Đã xảy ra lỗi không mong muốn"

    if (axios.isAxiosError(error)) {
      const serverMessage = error.response?.data?.message
      errorMessage = serverMessage || "Đã xảy ra lỗi khi cập nhật thông tin"
      console.log("Lỗi từ server:", error.response?.data || error.message)
    } else if (error.isCustomError) {
      errorMessage = error.message
    } else {
      console.log("Lỗi không phải Axios:", error)
    }

    showModal(errorMessage)
    throw { isCustomError: true, message: errorMessage }
  }
}
