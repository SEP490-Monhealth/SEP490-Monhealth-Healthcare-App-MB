import monAPI from "@/lib/monAPI"

import { UserType } from "@/schemas/userSchema"

interface UserResponse {
  users: UserType[]
  totalPages: number
  totalItems: number
}

export const getAllUsers = async (
  page: number,
  limit: number,
  search?: string,
  role?: string,
  status?: boolean
): Promise<UserResponse> => {
  try {
    const response = await monAPI.get(`/users`, {
      params: { page, limit, search, role, status }
    })

    if (!response || !response.data) {
      throw new Error(
        "Không nhận được phản hồi từ máy chủ. Có thể máy chủ đang gặp sự cố hoặc kết nối mạng của bạn bị gián đoạn."
      )
    }

    const { success, message, data } = response.data

    if (success) {
      const { totalPages, totalItems, items: users } = data
      return { users, totalPages, totalItems }
    } else {
      throw new Error(message || "Không thể lấy danh sách người dùng.")
    }
  } catch (error: any) {
    const errorMessage = error.response?.data?.message
      ? `Lỗi từ máy chủ: ${error.response.data.message}`
      : error.message || "Đã xảy ra lỗi không mong muốn, vui lòng thử lại sau."
    console.error("Lỗi khi lấy danh sách người dùng:", errorMessage)
    throw new Error(errorMessage)
  }
}

export const getUserById = async (userId: string): Promise<UserType> => {
  try {
    const response = await monAPI.get(`/users/${userId}`)

    if (!response || !response.data) {
      throw new Error(
        "Không nhận được phản hồi từ máy chủ. Có thể máy chủ đang gặp sự cố hoặc kết nối mạng của bạn bị gián đoạn."
      )
    }

    const { success, message, data } = response.data

    if (success) {
      return data as UserType
    } else {
      throw new Error(message || "Không thể lấy thông tin chi tiết người dùng.")
    }
  } catch (error: any) {
    const errorMessage = error.response?.data?.message
      ? `Lỗi từ máy chủ: ${error.response.data.message}`
      : error.message || "Đã xảy ra lỗi không mong muốn, vui lòng thử lại sau."
    console.error("Lỗi khi lấy thông tin người dùng:", errorMessage)
    throw new Error(errorMessage)
  }
}
