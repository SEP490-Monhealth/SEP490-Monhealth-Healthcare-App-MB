import axios from "axios"

import monAPI from "@/lib/monAPI"

export const getWalletByConsultantId = async (
  consultantId: string | undefined
) => {
  try {
    const response = await monAPI.get(`/wallets/consultant/${consultantId}`)

    const { success, message, data } = response.data

    if (success) {
      return data
    } else {
      throw {
        isCustomError: true,
        message: message || "Không thể lấy thông tin ví"
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
