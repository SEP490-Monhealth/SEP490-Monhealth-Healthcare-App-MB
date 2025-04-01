import axios from "axios"

import monAPI from "@/lib/monAPI"

import { CreatePaymentType, PaymentType } from "@/schemas/paymentSchema"

interface PaymentResponse {
  payments: PaymentType[]
  totalPages: number
  totalItems: number
}

export const getPaymentsByUserId = async (
  userId: string | undefined,
  page: number,
  limit?: number
): Promise<PaymentResponse> => {
  try {
    const response = await monAPI.get(`/payments/user/${userId}`, {
      params: { page, limit }
    })

    const { success, message, data } = response.data

    if (success) {
      const { totalPages, totalItems, items: payments } = data
      return { payments, totalPages, totalItems }
    } else {
      throw {
        isCustomError: true,
        message: message || "Không thể lấy danh sách khẩu thanh toán"
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

export const completePayment = async (
  paymentId: string,
  showModal: (message: string) => void
): Promise<string> => {
  try {
    const response = await monAPI.post(`/payments/${paymentId}/complete`)

    const { success, message } = response.data

    if (!success) {
      throw {
        isCustomError: true,
        message: message || "Không thể hoàn thành khẩu thanh toán"
      }
    }

    showModal(message || "Hoàn thành khẩu thanh toán thành công")

    console.log(message)
    return message
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      showModal("Đã xảy ra lỗi khi hoàn thành khẩu thanh toán")

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
