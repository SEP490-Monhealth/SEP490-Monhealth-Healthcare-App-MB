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

    console.log(message)
    return message
  } catch (error: any) {
    const errorMessage = error.response?.data?.message
    throw { isCustomError: true, message: errorMessage }
  }
}
