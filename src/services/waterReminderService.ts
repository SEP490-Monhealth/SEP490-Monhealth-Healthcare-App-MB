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

    if (!success) {
      throw { isCustomError: true, message: message }
    }

    return data as WaterReminderType[]
  } catch (error: any) {
    throw {
      isCustomError: true,
      message: "Đã xảy ra lỗi không mong muốn"
    }
  }
}

export const getWaterReminderById = async (
  waterReminderId: string | undefined
): Promise<WaterReminderType> => {
  try {
    const response = await monAPI.get(`/water-reminders/${waterReminderId}`)

    const { success, message, data } = response.data

    if (!success) {
      throw { isCustomError: true, message: message }
    }

    return data as WaterReminderType
  } catch (error: any) {
    throw {
      isCustomError: true,
      message: "Đã xảy ra lỗi không mong muốn"
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
      showModal(message)
      throw { isCustomError: true, message: message }
    }

    showModal(message)
    console.log(message)
    return message
  } catch (error: any) {
    showModal(error.message)
    throw {
      isCustomError: true,
      message: "Đã xảy ra lỗi không mong muốn"
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
      showModal(message)
      throw { isCustomError: true, message: message }
    }

    showModal(message)
    console.log(message)
    return message
  } catch (error: any) {
    showModal(error.message)
    throw {
      isCustomError: true,
      message: "Đã xảy ra lỗi không mong muốn"
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
      throw { isCustomError: true, message: message }
    }

    console.log(message)
    return message
  } catch (error: any) {
    throw {
      isCustomError: true,
      message: "Đã xảy ra lỗi không mong muốn"
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
      throw { isCustomError: true, message: message }
    }

    console.log(message)
    return message
  } catch (error: any) {
    throw {
      isCustomError: true,
      message: "Đã xảy ra lỗi không mong muốn"
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
      throw { isCustomError: true, message: message }
    }

    console.log(message)
    return message
  } catch (error: any) {
    throw {
      isCustomError: true,
      message: "Đã xảy ra lỗi không mong muốn"
    }
  }
}
