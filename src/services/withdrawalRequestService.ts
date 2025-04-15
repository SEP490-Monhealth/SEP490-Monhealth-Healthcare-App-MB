import monAPI from "@/lib/monAPI"

import {
  CreateWithdrawalRequestType,
  UpdateWithdrawalRequestType,
  WithdrawalRequestType
} from "@/schemas/withdrawalRequestSchema"

interface WithdrawalRequestResponse {
  withdrawalRequests: WithdrawalRequestType[]
  totalPages: number
  totalItems: number
}

export const getWithdrawalRequestsByConsultantId = async (
  consultantId: string | undefined,
  page: number,
  limit?: number
): Promise<WithdrawalRequestResponse> => {
  try {
    const response = await monAPI.get(
      `/withdrawal-requests/consultant/${consultantId}`,
      { params: { page, limit } }
    )

    const { success, message, data } = response.data

    if (!success) {
      throw { isCustomError: true, message: message }
    }

    const { totalPages, totalItems, items: withdrawalRequests } = data
    return { withdrawalRequests, totalPages, totalItems }
  } catch (error: any) {
    throw {
      isCustomError: true,
      message: error.message || "Đã xảy ra lỗi không mong muốn"
    }
  }
}

export const createWithdrawalRequest = async (
  newData: CreateWithdrawalRequestType,
  showModal: (message: string) => void
): Promise<string> => {
  try {
    const response = await monAPI.post(`/withdrawal-requests`, newData)

    const { success, message } = response.data

    if (!success) {
      showModal(message)
      throw { isCustomError: true, message: message }
    }

    showModal(message)
    console.log(message)
    return message
  } catch (error: any) {
    showModal(error.message)
    throw {
      isCustomError: true,
      message: error.message || "Đã xảy ra lỗi không mong muốn"
    }
  }
}

export const updateWithdrawalRequest = async (
  withdrawalRequestId: string | undefined,
  updatedData: UpdateWithdrawalRequestType,
  showModal: (message: string) => void
): Promise<string> => {
  try {
    const response = await monAPI.put(
      `/withdrawal-requests/${withdrawalRequestId}`,
      updatedData
    )

    const { success, message } = response.data

    if (!success) {
      showModal(message)
      throw { isCustomError: true, message: message }
    }

    showModal(message)
    console.log(message)
    return message
  } catch (error: any) {
    showModal(error.message)
    throw {
      isCustomError: true,
      message: error.message || "Đã xảy ra lỗi không mong muốn"
    }
  }
}
