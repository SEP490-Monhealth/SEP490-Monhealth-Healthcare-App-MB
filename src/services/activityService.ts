import monAPI from "@/lib/monAPI"

import { ActivityType, CreateActivityType } from "@/schemas/activitySchema"

export const getActivityById = async (
  activityId: string | undefined
): Promise<ActivityType> => {
  try {
    const response = await monAPI.get(`/activities/${activityId}`)

    const { success, message, data } = response.data

    if (!success) {
      throw { isCustomError: true, message: message }
    }

    return data as ActivityType
  } catch (error: any) {
    throw {
      isCustomError: true,
      message: error.message || "Đã xảy ra lỗi không mong muốn"
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

    if (!success) {
      throw { isCustomError: true, message: message }
    }

    showModal(message)
    console.log(message)
    return data
  } catch (error: any) {
    throw {
      isCustomError: true,
      message: error.message || "Đã xảy ra lỗi không mong muốn"
    }
  }
}
