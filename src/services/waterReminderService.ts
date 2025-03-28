import axios from "axios"

import monAPI from "@/lib/monAPI"

import {
  CreateWaterReminderType,
  UpdateWaterReminderType,
  WaterReminderType
} from "@/schemas/waterReminderSchema"

export const getWaterRemindersByUserId = async (
  userId: string | undefined
): Promise<WaterReminderType[]> => {
  try {
    const response = await monAPI.get(`/water-reminders/user/${userId}`)

    const { success, message, data } = response.data

    if (success) {
      return data as WaterReminderType[]
    } else {
      throw {
        isCustomError: true,
        message: message || "Không thể lấy danh sách nhắc nhở"
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

export const getWaterReminderById = async (
  waterReminderId: string | undefined
): Promise<WaterReminderType> => {
  try {
    const response = await monAPI.get(`/water-reminders/${waterReminderId}`)

    const { success, message, data } = response.data

    if (success) {
      return data as WaterReminderType
    } else {
      throw {
        isCustomError: true,
        message: message || "Không thể lấy thông tin chi tiết nhắc nhở"
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

export const createWaterReminder = async (
  newData: CreateWaterReminderType,
  showModal: (message: string) => void
): Promise<string> => {
  try {
    const response = await monAPI.post(`/water-reminders`, newData)

    const { success, message } = response.data

    if (!success) {
      throw {
        isCustomError: true,
        message: message || "Không thể tạo nhắc nhở mới"
      }
    }

    showModal(message || "Tạo nhắc nhở thành công")

    console.log(message)
    return message
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      showModal("Đã xảy ra lỗi khi tạo nhắc nhở")

      console.log("Lỗi từ server:", error.response?.data || error.message)
      throw error
    } else {
      showModal("Đã xảy ra lỗi không mong muốn")

      console.log("Lỗi không phải Axios:", error)
      throw {
        isCustomError: true,
        message: "Đã xảy ra lỗi không mong muốn"
      }
    }
  }
}

export const updateWaterReminder = async (
  waterReminderId: string,
  waterReminderData: UpdateWaterReminderType,
  showModal: (message: string) => void
): Promise<string> => {
  try {
    const response = await monAPI.put(
      `/water-reminders/${waterReminderId}`,
      waterReminderData
    )

    const { success, message } = response.data

    if (!success) {
      throw {
        isCustomError: true,
        message: message || "Không thể cập nhật nhắc nhở"
      }
    }

    showModal(message || "Cập nhật nhắc nhở thành công")

    console.log(message)
    return message
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      showModal("Đã xảy ra lỗi khi cập nhật nhắc nhở")

      console.log("Lỗi từ server:", error.response?.data || error.message)
      throw error
    } else {
      showModal("Đã xảy ra lỗi không mong muốn")

      console.log("Lỗi không phải Axios:", error)
      throw {
        isCustomError: true,
        message: "Đã xảy ra lỗi không mong muốn"
      }
    }
  }
}

export const deleteWaterReminder = async (
  waterReminderId: string
): Promise<string> => {
  try {
    const response = await monAPI.delete(`/water-reminders/${waterReminderId}`)

    const { success, message } = response.data

    if (!success) {
      throw {
        isCustomError: true,
        message: message || "Không thể xóa nhắc nhở"
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

export const updateWaterReminderStatus = async (
  waterReminderId: string
): Promise<string> => {
  try {
    const response = await monAPI.patch(
      `/water-reminders/${waterReminderId}/status`
    )

    const { success, message } = response.data

    if (!success) {
      throw {
        isCustomError: true,
        message: message || "Không thể cập nhật trạng thái"
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

export const updateWaterReminderDrunk = async (
  waterReminderId: string
): Promise<string> => {
  try {
    const response = await monAPI.patch(
      `/water-reminders/${waterReminderId}/drunk`
    )

    const { success, message } = response.data

    if (!success) {
      throw {
        isCustomError: true,
        message: message || "Không thể cập nhật trạng thái đã uống"
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
