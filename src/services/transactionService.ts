import monAPI from "@/lib/monAPI"

import {
  CreateBookingTransactionType,
  TransactionType
} from "@/schemas/transactionSchema"

interface TransactionListResponse {
  transactions: TransactionType[]
  totalPages: number
  totalItems: number
}

interface TransactionResponse {
  transactionId: string
  userId: string
  orderCode: string
  qrCode: string
  paymentUrl: string
  description: string
  amount: number
}

export const getTransactionsByUserId = async (
  userId: string | undefined,
  page: number,
  limit?: number
): Promise<TransactionListResponse> => {
  try {
    const response = await monAPI.get(`/transactions/user/${userId}`, {
      params: { page, limit }
    })

    const { success, message, data } = response.data

    if (!success) {
      throw { isCustomError: true, message: message }
    }

    const { totalPages, totalItems, items: transactions } = data
    return { transactions, totalPages, totalItems }
  } catch (error: any) {
    throw {
      isCustomError: true,
      message: error.message || "Đã xảy ra lỗi không mong muốn"
    }
  }
}

export const getTransactionsByConsultantId = async (
  consultantId: string | undefined,
  page: number,
  limit?: number
): Promise<TransactionListResponse> => {
  try {
    const response = await monAPI.get(
      `/transactions/consultant/${consultantId}`,
      { params: { page, limit } }
    )

    const { success, message, data } = response.data

    if (!success) {
      throw { isCustomError: true, message: message }
    }

    const { totalPages, totalItems, items: transactions } = data
    return { transactions, totalPages, totalItems }
  } catch (error: any) {
    throw {
      isCustomError: true,
      message: error.message || "Đã xảy ra lỗi không mong muốn"
    }
  }
}

export const createBookingTransaction = async (
  newData: CreateBookingTransactionType,
  showModal: (message: string) => void
): Promise<{ message: string; data: TransactionResponse }> => {
  try {
    const response = await monAPI.post(`/transactions/booking`, newData)

    const { success, message, data } = response.data

    if (!success) {
      showModal(message)
      throw { isCustomError: true, message: message }
    }

    return { message, data }
  } catch (error: any) {
    showModal(error.message)
    throw {
      isCustomError: true,
      message: error.message || "Đã xảy ra lỗi không mong muốn"
    }
  }
}

export const createSubscriptionTransaction = async (
  newData: CreateBookingTransactionType,
  showModal: (message: string) => void
): Promise<{ message: string; data: TransactionResponse }> => {
  try {
    const response = await monAPI.post(`/transactions/subscription`, newData)

    const { success, message, data } = response.data

    if (!success) {
      showModal(message)
      throw { isCustomError: true, message: message }
    }

    return { message, data }
  } catch (error: any) {
    showModal(error.message)
    throw {
      isCustomError: true,
      message: error.message || "Đã xảy ra lỗi không mong muốn"
    }
  }
}

export const completeTransaction = async (
  orderCode: string,
  showModal: (message: string) => void
): Promise<string> => {
  try {
    const response = await monAPI.patch(`/transactions/${orderCode}/completed`)

    const { success, message } = response.data

    if (!success) {
      showModal(message)
      throw { isCustomError: true, message: message }
    }

    return message
  } catch (error: any) {
    showModal(error.message)
    throw {
      isCustomError: true,
      message: error.message || "Đã xảy ra lỗi không mong muốn"
    }
  }
}
