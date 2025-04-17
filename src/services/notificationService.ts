import monAPI from "@/lib/monAPI"

import { NotificationType } from "@/schemas/notificationSchema"

interface NotificationResponse {
  notifications: NotificationType[]
  totalPages: number
  totalItems: number
}

export const getNotificationsByConsultantId = async (
  consultantId: string | undefined,
  page: number,
  limit?: number
): Promise<NotificationResponse> => {
  try {
    const response = await monAPI.get(
      `/notifications/consultant/${consultantId}`,
      { params: { page, limit } }
    )

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
