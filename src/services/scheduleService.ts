import { TimeSlot } from "@/components/local/schedules/TimeSlotSelector"

import { ScheduleTypeEnum } from "@/constants/enum/Schedule"

import monAPI from "@/lib/monAPI"

import { CreateScheduleType, ScheduleType } from "@/schemas/scheduleSchema"

export const getAllScheduleTimeSlots = async (): Promise<TimeSlot[]> => {
  try {
    const response = await monAPI.get("/schedules/time-slots")

    const { success, message, data } = response.data

    if (!success) {
      throw { isCustomError: true, message: message }
    }

    return data as TimeSlot[]
  } catch (error: any) {
    const errorMessage = error.response?.data?.message
    throw { isCustomError: true, message: errorMessage }
  }
}

export const getSchedulesByConsultantId = async (
  consultantId: string | undefined,
  type?: ScheduleTypeEnum,
  date?: string
): Promise<ScheduleType[]> => {
  try {
    const response = await monAPI.get(`/schedules/consultant/${consultantId}`, {
      params: { type, date }
    })

    const { success, message, data } = response.data

    if (!success) {
      throw { isCustomError: true, message: message }
    }

    return data as ScheduleType[]
  } catch (error: any) {
    const errorMessage = error.response?.data?.message
    throw { isCustomError: true, message: errorMessage }
  }
}

export const createSchedule = async (
  newData: CreateScheduleType,
  showModal: (message: string) => void
) => {
  try {
    const response = await monAPI.post(`/schedules`, newData)

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

export const updateSchedule = async (
  scheduleId: string | undefined,
  newScheduleData: CreateScheduleType,
  showModal: (message: string) => void
): Promise<string> => {
  try {
    const response = await monAPI.put(
      `/schedules/${scheduleId}`,
      newScheduleData
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

export const deleteSchedule = async (
  scheduleId: string | undefined,
  showModal: (message: string) => void
): Promise<string> => {
  try {
    const response = await monAPI.delete(`/schedules/${scheduleId}`)

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

export const updateScheduleStatus = async (
  scheduleId: string | undefined,
  showModal: (message: string) => void
): Promise<string> => {
  try {
    const response = await monAPI.put(`/schedules/${scheduleId}/status`)

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
