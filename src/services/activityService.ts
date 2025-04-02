import axios from "axios"

import monAPI from "@/lib/monAPI"

import { ActivityType, CreateActivityType } from "@/schemas/activitySchema"

export const getActivityById = async (
  activityId: string | undefined
): Promise<ActivityType> => {
  try {
    const response = await monAPI.get(`/activities/${activityId}`)

    const { success, message, data } = response.data

    if (success) {
      return data as ActivityType
    } else {
      throw {
        isCustomError: true,
        message: message || "Không thể lấy thông tin chi tiết hoạt động"
      }
    }
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

export const createActivity = async (
  newData: CreateActivityType,
  showModal: (message: string) => void
): Promise<string> => {
  try {
    const response = await monAPI.post("/activities", newData)

    const { success, message, data } = response.data

    if (success) {
      showModal(message)
      return data as string
    } else {
      throw {
        isCustomError: true,
        message: message || "Không thể tạo hoạt động"
      }
    }
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
