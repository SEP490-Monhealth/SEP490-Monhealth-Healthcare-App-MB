import axios from "axios"

import monAPI from "@/lib/monAPI"

import { TransactionType } from "@/schemas/transactionSchema"

interface TransactionResponse {
  transactions: TransactionType[]
  totalPages: number
  totalItems: number
}

export const getTransactionsByConsultantId = async (
  consultantId: string | undefined,
  page: number,
  limit?: number
): Promise<TransactionResponse> => {
  try {
    const response = await monAPI.get(`/transactions`, {
      params: { consultantId, page, limit }
    })

    const { success, message, data } = response.data

    if (success) {
      const { totalPages, totalItems, items: transactions } = data
      return { transactions, totalPages, totalItems }
    } else {
      throw {
        isCustomError: true,
        message: message || "Không thể lấy danh sách giao dịch"
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
