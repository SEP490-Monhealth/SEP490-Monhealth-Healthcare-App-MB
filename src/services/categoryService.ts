import axios from "axios"

import monAPI from "@/lib/monAPI"

import { CategoryType } from "@/schemas/categorySchema"

export const getAllCategoriesByType = async (): Promise<CategoryType[]> => {
  try {
    const response = await monAPI.get(`/categories`)

    if (!response || !response.data) {
      throw {
        isCustomError: true,
        message:
          "Không nhận được phản hồi từ máy chủ. Có thể máy chủ đang gặp sự cố hoặc kết nối mạng của bạn bị gián đoạn"
      }
    }

    const { success, message, data: categories } = response.data

    if (success) {
      return categories as CategoryType[]
    } else {
      throw {
        isCustomError: true,
        message: message || "Không thể lấy danh sách danh mục"
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
