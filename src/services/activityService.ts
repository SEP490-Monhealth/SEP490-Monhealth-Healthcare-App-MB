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
    const errorMessage = error.response?.data?.message
    throw { isCustomError: true, message: errorMessage }
  }
}

export const createActivity = async (
  newData: CreateActivityType,
  showModal: (message: string) => void
): Promise<string> => {
  try {
    const response = await monAPI.post("/activities", newData)
    const { success, message } = response.data

    if (!success) {
      throw { isCustomError: true, message: message }
    }

    showModal(message)
    console.log(message)
    return message
  } catch (error: any) {
    const errorMessage = error.response?.data?.message
    throw { isCustomError: true, message: errorMessage }
  }
}

export const updateActivityStatus = async (
  activityId: string
): Promise<string> => {
  try {
    const response = await monAPI.patch(`/activities/${activityId}/completed`)
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
