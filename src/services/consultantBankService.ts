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
    throw {
      isCustomError: true,
      message: error.message || "Đã xảy ra lỗi không mong muốn"
    }
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
    throw {
      isCustomError: true,
      message: error.message || "Đã xảy ra lỗi không mong muốn"
    }
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
    showModal(error.message)
    throw {
      isCustomError: true,
      message: error.message || "Đã xảy ra lỗi không mong muốn"
    }
  }
}

export const updateConsultantBank = async (
  consultantBankId: string | undefined,
  consultantBankData: UpdateConsultantBankType,
  showModal: (message: string) => void
): Promise<string> => {
  try {
    const response = await monAPI.put(
      `/consultant-banks/${consultantBankId}`,
      consultantBankData
    )

    const { success, message } = response.data

    if (!success) {
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
    throw {
      isCustomError: true,
      message: error.message || "Đã xảy ra lỗi không mong muốn"
    }
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
    throw {
      isCustomError: true,
      message: error.message || "Đã xảy ra lỗi không mong muốn"
    }
  }
}
