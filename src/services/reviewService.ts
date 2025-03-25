import axios from "axios"

import monAPI from "@/lib/monAPI"

import { CreateReviewType } from "@/schemas/reviewSchema"

export const createReview = async (
  newData: CreateReviewType,
  showModal: (message: string) => void
): Promise<string> => {
  try {
    const response = await monAPI.post(`/reviews`, newData)

    const { success, message } = response.data

    if (!success) {
      throw {
        isCustomError: true,
        message: message || "Không thể tạo đánh giá mới"
      }
    }

    showModal(message || "Tạo đánh giá mới thành công")

    console.log(message)
    return message
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      showModal("Đã xảy ra lỗi khi tạo đánh giá")

      console.log("Lỗi từ server:", error.response?.data || error.message)
      throw error
    } else {
      showModal("Đã xảy ra lỗi không mong muốn")

      console.log("Lỗi không phải Axios:", error)
      throw {
        isCustomError: true,
        message: "Đã xảy ra lỗi không mong muốn"
      }
    }
  }
}
