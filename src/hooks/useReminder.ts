import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { useErrorHandler } from "@/contexts/ErrorContext"

import {
  CreateUpdateReminderType,
  ReminderType
} from "@/schemas/reminderSchema"

import {
  changeReminderStatus,
  createReminder,
  deleteReminder,
  getReminderById,
  getRemindersByUserId,
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
    enabled: !!userId,
    staleTime: 1000 * 60 * 5
  })
}

export const useGetReminderById = (reminderId: string | undefined) => {
  const handleError = useErrorHandler()

  return useQuery<ReminderType, Error>({
    queryKey: ["reminder", reminderId],
    queryFn: async () => {
      try {
        return await getReminderById(reminderId)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    enabled: !!reminderId,
    staleTime: 1000 * 60 * 5
  })
}

export const useCreateReminder = () => {
  const queryClient = useQueryClient()
  const handleError = useErrorHandler()

  return useMutation<string, Error, CreateUpdateReminderType>({
    mutationFn: async (reminder) => {
      try {
        return await createReminder(reminder)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reminders"] })
    }
  })
}

export const useUpdateReminder = () => {
  const queryClient = useQueryClient()
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
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reminders"] })
    }
  })
}

export const useChangeReminderStatus = () => {
  const queryClient = useQueryClient()
  const handleError = useErrorHandler()

  return useMutation<string, Error, string>({
    mutationFn: async (reminderId) => {
      try {
        return await changeReminderStatus(reminderId)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reminders"] })
    }
  })
}

export const useDeleteReminder = () => {
  const queryClient = useQueryClient()
  const handleError = useErrorHandler()

  return useMutation<string, Error, string>({
    mutationFn: async (reminderId) => {
      try {
        return await deleteReminder(reminderId)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reminders"] })
    }
  })
}
