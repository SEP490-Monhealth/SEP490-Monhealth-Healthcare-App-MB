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
    const errorMessage = error.response?.data?.message
    throw { isCustomError: true, message: errorMessage }
  }
}

export const getWithdrawalRequestById = async (
  withdrawalRequestId: string | undefined
): Promise<WithdrawalRequestType> => {
  try {
    const response = await monAPI.get(
      `/withdrawal-requests/${withdrawalRequestId}`
    )

    const { success, message, data } = response.data

    if (!success) {
      throw { isCustomError: true, message: message }
    }

    return data as WithdrawalRequestType
  } catch (error: any) {
    const errorMessage = error.response?.data?.message
    throw { isCustomError: true, message: errorMessage }
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
    const errorMessage = error.response?.data?.message
    showModal(errorMessage)
    throw { isCustomError: true, message: errorMessage }
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
    const errorMessage = error.response?.data?.message
    showModal(errorMessage)
    throw { isCustomError: true, message: errorMessage }
  }
}

export const deleteWithdrawalRequest = async (
  withdrawalRequestId: string,
  showModal: (message: string) => void
): Promise<string> => {
  try {
    const response = await monAPI.delete(
      `/withdrawal-requests/${withdrawalRequestId}`
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
    const errorMessage = error.response?.data?.message
    showModal(errorMessage)
    throw { isCustomError: true, message: errorMessage }
  }
}
