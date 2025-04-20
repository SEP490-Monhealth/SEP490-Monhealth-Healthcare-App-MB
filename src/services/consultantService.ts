import axios from "axios"

import monAPI from "@/lib/monAPI"

import {
  ConsultantType,
  CreateConsultantType,
  MeetingUrlType,
  UpdateConsultantType
} from "@/schemas/consultantSchema"

interface ConsultantResponse {
  consultants: ConsultantType[]
  totalPages: number
  totalItems: number
}

export const getAllConsultants = async (
  page: number,
  limit?: number,
  expertise?: string,
  search?: string,
  verified?: boolean,
  popular?: boolean,
  status?: boolean
): Promise<ConsultantResponse> => {
  try {
    const response = await monAPI.get(`/consultants`, {
      params: { page, limit, expertise, search, verified, popular, status }
    })

    const { success, message, data } = response.data

    if (!success) {
      throw { isCustomError: true, message: message }
    }

    const { totalPages, totalItems, items: consultants } = data
    return { consultants, totalPages, totalItems }
  } catch (error: any) {
    const errorMessage = error.response?.data?.message
    throw { isCustomError: true, message: errorMessage }
  }
}

export const getConsultantByUserId = async (
  userId: string | undefined
): Promise<ConsultantType | null> => {
  try {
    const response = await monAPI.get(`/consultants/user/${userId}`)

    const { success, message, data } = response.data

    if (!success) {
      throw { isCustomError: true, message: message }
    }

    return data as ConsultantType
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.status === 404) {
        return null
      }

      throw error
    } else {
      throw {
        isCustomError: true,
        message: error.message || "Đã xảy ra lỗi không mong muốn"
      }
    }
  }
}

export const getConsultantById = async (
  consultantId: string | undefined
): Promise<ConsultantType> => {
  try {
    const response = await monAPI.get(`/consultants/${consultantId}`)

    const { success, message, data } = response.data

    if (!success) {
      throw { isCustomError: true, message: message }
    }

    return data as ConsultantType
  } catch (error: any) {
    const errorMessage = error.response?.data?.message
    throw { isCustomError: true, message: errorMessage }
  }
}

export const getMeetingUrlByConsultantId = async (
  consultantId: string | undefined
): Promise<MeetingUrlType> => {
  try {
    const response = await monAPI.get(
      `/consultants/${consultantId}/meeting-url`
    )

    const { success, message, data } = response.data

    if (!success) {
      throw { isCustomError: true, message: message }
    }

    return data as MeetingUrlType
  } catch (error: any) {
    const errorMessage = error.response?.data?.message
    throw { isCustomError: true, message: errorMessage }
  }
}

export const createConsultant = async (
  newData: CreateConsultantType,
  showModal: (message: string) => void
): Promise<string> => {
  try {
    const response = await monAPI.post(`/consultants`, newData)

    const { success, message } = response.data

    if (!success) {
      showModal(message)
      throw { isCustomError: true, message: message }
    }

    console.log(message)
    return message
  } catch (error: any) {
    const errorMessage = error.response?.data?.message
    showModal(errorMessage)
    throw { isCustomError: true, message: errorMessage }
  }
}

export const updateConsultant = async (
  consultantId: string,
  consultantData: UpdateConsultantType,
  showModal: (message: string) => void
): Promise<string> => {
  try {
    const response = await monAPI.put(
      `/consultants/${consultantId}`,
      consultantData
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
