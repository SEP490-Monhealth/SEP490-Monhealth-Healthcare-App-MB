import axios from "axios"

import monAPI from "@/lib/monAPI"

import { CertificateType } from "@/schemas/certificateSchema"

export const getCertificatesByConsultantId = async (
  consultantId: string | undefined
): Promise<CertificateType[]> => {
  try {
    const response = await monAPI.get(
      `/certificates/consultant/${consultantId}`
    )

    const { success, message, data } = response.data

    if (success) {
      return data as CertificateType[]
    } else {
      throw {
        isCustomError: true,
        message: message || "Không thể lấy thông tin chứng chỉ"
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
