import axios from "axios"

import monAPI from "@/lib/monAPI"

import { CreatePaymentType } from "@/schemas/paymentSchema"

export const createPayment = async (
  newData: CreatePaymentType,
  showModal: (message: string) => void
): Promise<string> => {
  try {
    const response = await monAPI.post(`/payments`, newData)

    const { success, message } = response.data

    if (!success) {
      throw {
        isCustomError: true,
        message: message || "Không thể tạo khẩu thanh toán mới"
      }
    }

    showModal(message || "Tạo khẩu thanh toán thành công")

    console.log(message)
    return message
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      showModal("Đã xảy ra lỗi khi tạo khẩu thanh toán")

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
