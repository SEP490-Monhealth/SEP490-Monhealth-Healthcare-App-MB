import monAPI from "@/lib/monAPI"

import { NotificationType } from "@/schemas/notificationSchema"

interface NotificationResponse {
  notifications: NotificationType[]
  totalPages: number
  totalItems: number
}

export const getNotificationsByUserId = async (
  userId: string | undefined,
  page: number,
  limit?: number
): Promise<NotificationResponse> => {
  try {
    const response = await monAPI.get(`/notifications/user/${userId}`, {
      params: { page, limit }
    })

    const { success, message, data } = response.data

    if (!success) {
      throw { isCustomError: true, message: message }
    }

    const { totalPages, totalItems, items: notifications } = data
    return { notifications, totalPages, totalItems }
  } catch (error: any) {
    const errorMessage = error.response?.data?.message
    throw { isCustomError: true, message: errorMessage }
  }
}

export const updateNotificationStatus = async (
  notificationId: string | undefined
): Promise<string> => {
  try {
    const response = await monAPI.patch(`/notifications/${notificationId}/read`)

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
