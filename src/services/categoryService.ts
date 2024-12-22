import monAPI from "@/lib/monAPI"

import { CategoryType } from "@/schemas/categorySchema"

export const getAllCategories = async (): Promise<CategoryType> => {
  try {
    const response = await monAPI.get(`/categories`)

    if (!response || !response.data) {
      throw new Error(
        "Không nhận được phản hồi từ máy chủ. Có thể máy chủ đang gặp sự cố hoặc kết nối mạng của bạn bị gián đoạn."
      )
    }

    const { success, message, data } = response.data

    if (success) {
      return data as CategoryType
    } else {
      throw new Error(message || "Không thể lấy danh sách danh mục.")
    }
  } catch (error: any) {
    const errorMessage = error.response?.data?.message
      ? `Lỗi từ máy chủ: ${error.response.data.message}`
      : error.message || "Đã xảy ra lỗi không mong muốn, vui lòng thử lại sau."
    console.error("Lỗi khi lấy danh sách danh mục:", errorMessage)
    throw new Error(errorMessage)
  }
}
