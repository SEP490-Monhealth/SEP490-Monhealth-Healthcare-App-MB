import { useMutation, useQuery } from "@tanstack/react-query"

import { useErrorHandler } from "@/contexts/ErrorContext"

import {
  CreateUpdateReminderType,
  ReminderType
} from "@/schemas/reminderSchema"

import {
  createReminder,
  deleteReminder,
  getRemindersByUserId,
  patchReminderStatus,
  updateReminder
} from "@/services/reminderService"

export const useGetReminderByUserId = (userId: string | undefined) => {
  const handleError = useErrorHandler()

  return useQuery<ReminderType[], Error>({
    queryKey: ["reminders", userId],
    queryFn: async () => {
      try {
        return await getRemindersByUserId(userId)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    staleTime: 1000 * 60 * 5
  })
}

export const useCreateReminder = () => {
  const handleError = useErrorHandler()

  return useMutation<string, Error, CreateUpdateReminderType>({
    mutationFn: async (reminder) => {
      try {
        return await createReminder(reminder)
      } catch (error) {
        handleError(error)
        throw error
      }
    }
  })
}

export const useUpdateReminder = () => {
  const handleError = useErrorHandler()

  return useMutation<
    string,
    Error,
    { reminderId: string; reminder: CreateUpdateReminderType }
  >({
    mutationFn: async ({ reminderId, reminder }) => {
      try {
        return await updateReminder(reminderId, reminder)
      } catch (error) {
        handleError(error)
        throw error
      }
    }
  })
}

export const usePatchReminderStatus = () => {
  const handleError = useErrorHandler()

  return useMutation<string, Error, string>({
    mutationFn: async (reminderId) => {
      try {
        return await patchReminderStatus(reminderId)
      } catch (error) {
        handleError(error)
        throw error
      }
    }
  })
}

export const useDeleteReminder = () => {
  const handleError = useErrorHandler()

  return useMutation<string, Error, string>({
    mutationFn: async (reminderId) => {
      try {
        return await deleteReminder(reminderId)
      } catch (error) {
        handleError(error)
        throw error
      }
    }
  })
}
