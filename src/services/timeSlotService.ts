import monAPI from "@/lib/monAPI"

import { CreateTimeSlotType } from "@/schemas/scheduleSchema"

export const createTimeSlot = async (
  newData: CreateTimeSlotType
): Promise<string> => {
  try {
    const response = await monAPI.post(`/time-slots`, newData)

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

export const deleteTimeSlot = async (timeSlotId: string): Promise<string> => {
  try {
    const response = await monAPI.delete(`/time-slots/${timeSlotId}`)

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
