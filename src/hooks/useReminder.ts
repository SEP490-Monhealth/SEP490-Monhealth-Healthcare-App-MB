import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { useDialog } from "@/contexts/DialogContext"
import { useError } from "@/contexts/ErrorContext"

import {
  CreateReminderType,
  ReminderType,
  UpdateReminderType
} from "@/schemas/reminderSchema"

import {
  createReminder,
  deleteReminder,
  getReminderById,
  getRemindersByUserId,
  updateReminder,
  updateReminderStatus
} from "@/services/reminderService"

export const useGetReminderByUserId = (userId: string | undefined) => {
  const handleError = useError()

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
  const handleError = useError()

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
  const handleError = useError()
  const { showDialog } = useDialog()

  return useMutation<string, Error, CreateReminderType>({
    mutationFn: async (reminder) => {
      try {
        return await createReminder(reminder, showDialog)
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
  const handleError = useError()
  const { showDialog } = useDialog()

  return useMutation<
    string,
    Error,
    { reminderId: string; reminder: UpdateReminderType }
  >({
    mutationFn: async ({ reminderId, reminder }) => {
      try {
        return await updateReminder(reminderId, reminder, showDialog)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    onSuccess: (_data, { reminderId }) => {
      queryClient.invalidateQueries({ queryKey: ["reminder", reminderId] })
      queryClient.invalidateQueries({ queryKey: ["reminders"] })
    }
  })
}

export const useUpdateReminderStatus = () => {
  const queryClient = useQueryClient()
  const handleError = useError()

  return useMutation<string, Error, string>({
    mutationFn: async (reminderId) => {
      try {
        return await updateReminderStatus(reminderId)
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
  const handleError = useError()

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
