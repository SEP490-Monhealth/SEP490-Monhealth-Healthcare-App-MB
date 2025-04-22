import monAPI from "@/lib/monAPI"

import {
  CreateWaterReminderType,
  UpdateWaterReminderType,
  WaterReminderType
} from "@/schemas/waterReminderSchema"

export const getWaterRemindersByUserId = async (
  userId: string | undefined,
  status?: boolean
): Promise<WaterReminderType[]> => {
  try {
    const response = await monAPI.get(`/water-reminders/user/${userId}`, {
      params: { status }
    })

    const { success, message, data } = response.data

    if (!success) {
      throw { isCustomError: true, message: message }
    }

    return data as WaterReminderType[]
  } catch (error: any) {
    const errorMessage = error.response?.data?.message
    throw { isCustomError: true, message: errorMessage }
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
    const errorMessage = error.response?.data?.message
    throw { isCustomError: true, message: errorMessage }
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
    const errorMessage = error.response?.data?.message
    showModal(errorMessage)
    throw { isCustomError: true, message: errorMessage }
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
    const errorMessage = error.response?.data?.message
    showModal(errorMessage)
    throw { isCustomError: true, message: errorMessage }
  }
}

export const deleteWaterReminder = async (
  waterReminderId: string,
  showModal: (message: string) => void
): Promise<string> => {
  try {
    const response = await monAPI.delete(`/water-reminders/${waterReminderId}`)
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

export const updateWaterReminderStatus = async (
  waterReminderId: string,
  showModal: (message: string) => void
): Promise<string> => {
  try {
    const response = await monAPI.patch(
      `/water-reminders/${waterReminderId}/status`
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
    const errorMessage = error.response?.data?.message
    throw { isCustomError: true, message: errorMessage }
  }
}
