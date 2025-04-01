import axios from "axios"

import monAPI from "@/lib/monAPI"

export const getConsultantBanksByConsultantId = async (
  consultantId: string | undefined
): Promise<any[]> => {
  try {
    const response = await monAPI.get(
      `/consultant-banks/consultant/${consultantId}`
    )

    const { success, message, data } = response.data

    if (success) {
      return data as any[]
    } else {
      throw {
        isCustomError: true,
        message: message || "Không thể lấy danh sách ngân hàng của chuyên viên"
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
