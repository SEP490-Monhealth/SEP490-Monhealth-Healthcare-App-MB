import { useQuery } from "@tanstack/react-query"

import { MonQueryKey } from "@/constants/query"

import { useError } from "@/contexts/ErrorContext"

import { NotificationType } from "@/schemas/notificationSchema"

import {
  getNotificationsByConsultantId,
  getNotificationsByUserId
} from "@/services/notificationService"

interface NotificationResponse {
  notifications: NotificationType[]
  totalPages: number
  totalItems: number
}

export const useGetNotificationsByConsultantId = (
  consultantId: string | undefined,
  page: number,
  limit?: number
) => {
  const handleError = useError()

  return useQuery<NotificationResponse, Error>({
    queryKey: [
      MonQueryKey.Notification.ConsultantNotifications,
      consultantId,
      page,
      limit
    ],
    queryFn: async () => {
      try {
        return await getNotificationsByConsultantId(consultantId, page, limit)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    enabled: !!consultantId,
    staleTime: 1000 * 60 * 5
  })
}

export const useGetNotificationsByUserId = (
  userId: string | undefined,
  page: number,
  limit?: number
) => {
  const handleError = useError()

  return useQuery<NotificationResponse, Error>({
    queryKey: [MonQueryKey.Notification.UserNotifications, userId, page, limit],
    queryFn: async () => {
      try {
        return await getNotificationsByUserId(userId, page, limit)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5
  })
}
