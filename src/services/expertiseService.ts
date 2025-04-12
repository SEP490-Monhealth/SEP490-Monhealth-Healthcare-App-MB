import axios from "axios"

import monAPI from "@/lib/monAPI"

import {
  ExpertiseType,
  UpdateExpertiseConsultantType
} from "@/schemas/expertiseSchema"

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

export const updateExpertiseByConsultantId = async (
  consultantId: string | undefined,
  certificateData: UpdateExpertiseConsultantType,
  showModal: (message: string) => void
): Promise<string> => {
  try {
    const response = await monAPI.put(
      `/expertise/consultant/${consultantId}`,
      certificateData
    )

    const { success, message } = response.data

    if (!success) {
      throw {
        isCustomError: true,
        message: message || "Không thể cập nhật chứng chỉ"
      }
    }

    showModal(message || "Cập nhật chứng chỉ thành công")

    console.log(message)
    return message
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      showModal("Đã xảy ra lỗi khi cập nhật chứng chỉ")

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
