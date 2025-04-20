import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { MonQueryKey } from "@/constants/query"

import { useError } from "@/contexts/ErrorContext"

import { NotificationType } from "@/schemas/notificationSchema"

import {
  getNotificationsByUserId,
  updateNotificationStatus
} from "@/services/notificationService"

interface NotificationResponse {
  notifications: NotificationType[]
  totalPages: number
  totalItems: number
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

export const useUpdateNotificationStatus = () => {
  const queryClient = useQueryClient()
  const handleError = useError()

  return useMutation<string, Error, { notificationId: string | undefined }>({
    mutationFn: async ({ notificationId }) => {
      try {
        return await updateNotificationStatus(notificationId)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [MonQueryKey.Notification.UserNotifications]
      })
    }
  })
}
