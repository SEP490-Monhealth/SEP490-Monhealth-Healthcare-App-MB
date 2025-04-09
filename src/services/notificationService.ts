import axios from "axios"

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
      {
        params: { page, limit }
      }
    )

    const { success, message, data } = response.data

    if (success) {
      const { totalPages, totalItems, items: notifications } = data
      return { notifications, totalPages, totalItems }
    } else {
      throw {
        isCustomError: true,
        message: message || "Không thể lấy danh sách thông báo"
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

    if (success) {
      const { totalPages, totalItems, items: notifications } = data
      return { notifications, totalPages, totalItems }
    } else {
      throw {
        isCustomError: true,
        message: message || "Không thể lấy danh sách thông báo"
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
