import axios from "axios"

import monAPI from "@/lib/monAPI"

import { CreateTimeSlotType } from "@/schemas/scheduleSchema"

export const createTimeSlot = async (
  newData: CreateTimeSlotType
): Promise<string> => {
  try {
    const response = await monAPI.post(`/time-slots`, newData)

    const { success, message } = response.data

    if (!success) {
      throw {
        isCustomError: true,
        message: message || "Không thể thêm khung giờ"
      }
    }

    console.log(message)
    return message
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

export const deleteTimeSlot = async (timeSlotId: string): Promise<string> => {
  try {
    const response = await monAPI.delete(`/time-slots/${timeSlotId}`)

    const { success, message } = response.data

    if (!success) {
      throw {
        isCustomError: true,
        message: message || "Không thể xóa khung giờ"
      }
    }

    console.log(message)
    return message
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
