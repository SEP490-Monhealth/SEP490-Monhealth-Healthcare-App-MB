import axios from "axios"

import monAPI from "@/lib/monAPI"

import { CreateDeviceType } from "@/schemas/deviceSchema"

export const createDevice = async (newData: CreateDeviceType) => {
  try {
    const response = await monAPI.post(`/devices`, newData)

    const { success, message } = response.data

    if (!success) {
      throw {
        isCustomError: true,
        message: message || "Không thể tạo thiết bị mới"
      }
    }

    // console.log(message)
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
