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
    throw {
      isCustomError: true,
      message: error.message || "Đã xảy ra lỗi không mong muốn"
    }
  }
}
