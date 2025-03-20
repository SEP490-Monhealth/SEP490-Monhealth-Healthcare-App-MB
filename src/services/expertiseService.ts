import axios from "axios"

import monAPI from "@/lib/monAPI"

import { ExpertiseType } from "@/schemas/expertiseSchema"

interface ExpertiseResponse {
  expertise: ExpertiseType[]
  totalPages: number
  totalItems: number
}

export const getAllExpertise = async (
  page: number,
  limit?: number
): Promise<ExpertiseResponse> => {
  try {
    const response = await monAPI.get(`/expertise`, {
      params: { page, limit }
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
      const { totalPages, totalItems, items: expertise } = data
      return { expertise, totalPages, totalItems }
    } else {
      throw {
        isCustomError: true,
        message: message || "Không thể lấy danh sách chuyên môn"
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
