import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { useError } from "@/contexts/ErrorContext"
import { useModal } from "@/contexts/ModalContext"

import {
  CreateWaterReminderType,
  UpdateWaterReminderType,
  WaterReminderType
} from "@/schemas/waterReminderSchema"

import {
  createWaterReminder,
  deleteWaterReminder,
  getWaterReminderById,
  getWaterRemindersByUserId,
  updateWaterReminder,
  updateWaterReminderDrunk,
  updateWaterReminderStatus
} from "@/services/waterReminderService"

export const useGetWaterReminderByUserId = (userId: string | undefined) => {
  const handleError = useError()

  return useQuery<WaterReminderType[], Error>({
    queryKey: ["waterReminders", userId],
    queryFn: async () => {
      try {
        return await getWaterRemindersByUserId(userId)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5
  })
}

export const useGetWaterReminderById = (
  waterReminderId: string | undefined
) => {
  const handleError = useError()

  return useQuery<WaterReminderType, Error>({
    queryKey: ["waterReminder", waterReminderId],
    queryFn: async () => {
      try {
        return await getWaterReminderById(waterReminderId)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    enabled: !!waterReminderId,
    staleTime: 1000 * 60 * 5
  })
}

export const useCreateWaterReminder = () => {
  const queryClient = useQueryClient()
  const handleError = useError()
  const { showModal } = useModal()

  return useMutation<string, Error, CreateWaterReminderType>({
    mutationFn: async (newData) => {
      try {
        return await createWaterReminder(newData, showModal)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["waterReminders"] })
    }
  })
}

export const useUpdateWaterReminder = () => {
  const queryClient = useQueryClient()
  const handleError = useError()
  const { showModal } = useModal()

  return useMutation<
    string,
    Error,
    { waterReminderId: string; waterReminderData: UpdateWaterReminderType }
  >({
    mutationFn: async ({ waterReminderId, waterReminderData }) => {
      try {
        return await updateWaterReminder(
          waterReminderId,
          waterReminderData,
          showModal
        )
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    onSuccess: (_data, { waterReminderId }) => {
      queryClient.invalidateQueries({
        queryKey: ["waterReminder", waterReminderId]
      })
      queryClient.invalidateQueries({ queryKey: ["waterReminders"] })
    }
  })
}

export const useDeleteWaterReminder = () => {
  const queryClient = useQueryClient()
  const handleError = useError()

  return useMutation<string, Error, string>({
    mutationFn: async (waterReminderId) => {
      try {
        return await deleteWaterReminder(waterReminderId)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["waterReminders"] })
    }
  })
}

export const useUpdateWaterReminderStatus = () => {
  const queryClient = useQueryClient()
  const handleError = useError()

  return useMutation<string, Error, string>({
    mutationFn: async (waterReminderId) => {
      try {
        return await updateWaterReminderStatus(waterReminderId)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["waterReminders"] })
    }
  })
}

export const useUpdateWaterReminderDrunk = () => {
  const queryClient = useQueryClient()
  const handleError = useError()

  return useMutation<
    string,
    Error,
    { waterReminderId: string; userId: string; today: string }
  >({
    mutationFn: async ({ waterReminderId }) => {
      try {
        return await updateWaterReminderDrunk(waterReminderId)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    onSuccess: (_, variables) => {
      const { userId, today } = variables

      queryClient.invalidateQueries({ queryKey: ["waterReminders"] })
      queryClient.invalidateQueries({
        queryKey: ["dailyWaterIntake", userId, today]
      })
    }
  })
}
