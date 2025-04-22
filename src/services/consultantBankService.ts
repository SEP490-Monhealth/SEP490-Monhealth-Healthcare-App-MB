import monAPI from "@/lib/monAPI"

import {
  ConsultantBankType,
  CreateConsultantBankType,
  UpdateConsultantBankType
} from "@/schemas/consultantBankSchema"

export const getConsultantBanksByConsultantId = async (
  consultantId: string | undefined
): Promise<ConsultantBankType[]> => {
  try {
    const response = await monAPI.get(
      `/consultant-banks/consultant/${consultantId}`
    )

    const { success, message, data } = response.data

    if (!success) {
      throw { isCustomError: true, message: message }
    }

    return data as ConsultantBankType[]
  } catch (error: any) {
    const errorMessage = error.response?.data?.message
    throw { isCustomError: true, message: errorMessage }
  }
}

export const getConsultantBankById = async (
  consultantBankId: string | undefined
): Promise<ConsultantBankType> => {
  try {
    const response = await monAPI.get(`/consultant-banks/${consultantBankId}`)

    const { success, message, data } = response.data

    if (!success) {
      throw { isCustomError: true, message: message }
    }

    return data as ConsultantBankType
  } catch (error: any) {
    const errorMessage = error.response?.data?.message
    throw { isCustomError: true, message: errorMessage }
  }
}

export const createConsultantBank = async (
  newData: CreateConsultantBankType,
  showModal: (message: string) => void
): Promise<string> => {
  try {
    const response = await monAPI.post(`/consultant-banks`, newData)

    const { success, message } = response.data

    if (!success) {
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

export const updateConsultantBank = async (
  consultantBankId: string | undefined,
  updatedData: UpdateConsultantBankType,
  showModal: (message: string) => void
): Promise<string> => {
  try {
    const response = await monAPI.put(
      `/consultant-banks/${consultantBankId}`,
      updatedData
    )

    const { success, message } = response.data

    if (!success) {
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

export const deleteConsultantBank = async (
  consultantBankId: string
): Promise<string> => {
  try {
    const response = await monAPI.delete(
      `/consultant-banks/${consultantBankId}`
    )

    const { success, message } = response.data

    if (!success) {
      throw { isCustomError: true, message: message }
    }

    console.log(message)
    return message
  } catch (error: any) {
    const errorMessage = error.response?.data?.message
    throw { isCustomError: true, message: errorMessage }
  }
}

export const updateConsultantBankDefault = async (
  consultantBankId: string
): Promise<string> => {
  try {
    const response = await monAPI.patch(
      `/consultant-banks/${consultantBankId}/default`
    )

    const { success, message } = response.data

    if (!success) {
      throw { isCustomError: true, message: message }
    }

    console.log(message)
    return message
  } catch (error: any) {
    const errorMessage = error.response?.data?.message
    throw { isCustomError: true, message: errorMessage }
  }
}
