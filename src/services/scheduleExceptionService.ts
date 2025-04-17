import monAPI from "@/lib/monAPI"

import {
  CreateScheduleExceptionType,
  ScheduleExceptionType,
  UpdateScheduleExceptionType
} from "@/schemas/scheduleExceptionSchema"

interface ScheduleExceptionResponse {
  scheduleExceptions: ScheduleExceptionType[]
  totalPages: number
  totalItems: number
}

export const getScheduleExceptionByConsultantId = async (
  consultantId: string | undefined,
  page: number,
  limit?: number
): Promise<ScheduleExceptionResponse> => {
  try {
    const response = await monAPI.get(
      `/schedule-exceptions/consultant/${consultantId}`,
      { params: { consultantId, page, limit } }
    )

    const { success, message, data } = response.data

    if (!success) {
      throw { isCustomError: true, message: message }
    }

    const { totalPages, totalItems, items: scheduleExceptions } = data
    return { scheduleExceptions, totalPages, totalItems }
  } catch (error: any) {
    const errorMessage = error.response?.data?.message
    throw { isCustomError: true, message: errorMessage }
  }
}

export const getScheduleExceptionById = async (
  scheduleExceptionId: string | undefined
): Promise<ScheduleExceptionType> => {
  try {
    const response = await monAPI.get(
      `/schedule-exceptions/${scheduleExceptionId}`
    )

    const { success, message, data } = response.data

    if (!success) {
      throw { isCustomError: true, message: message }
    }

    return data as ScheduleExceptionType
  } catch (error: any) {
    const errorMessage = error.response?.data?.message
    throw { isCustomError: true, message: errorMessage }
  }
}

export const createScheduleException = async (
  newData: CreateScheduleExceptionType,
  showModal: (message: string) => void
): Promise<string> => {
  try {
    const response = await monAPI.post(`/schedule-exceptions`, newData)

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

export const updateScheduleException = async (
  scheduleExceptionId: string,
  scheduleExceptionData: UpdateScheduleExceptionType,
  showModal: (message: string) => void
): Promise<string> => {
  try {
    const response = await monAPI.put(
      `/schedule-exceptions/${scheduleExceptionId}`,
      scheduleExceptionData
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

export const deleteScheduleException = async (
  scheduleExceptionId: string,
  showModal: (message: string) => void
): Promise<string> => {
  try {
    const response = await monAPI.delete(
      `/schedule-exceptions/${scheduleExceptionId}`
    )

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
    throw {
      isCustomError: true,
      message: "Đã xảy ra lỗi không mong muốn"
    }
  }
}
