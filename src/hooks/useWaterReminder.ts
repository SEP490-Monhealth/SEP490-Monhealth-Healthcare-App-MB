import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { useError } from "@/contexts/ErrorContext"
import { useModal } from "@/contexts/ModalContext"

import { DailyWaterIntakeType } from "@/schemas/dailyWaterIntakeSchema"
import {
  CreateWaterReminderType,
  UpdateWaterReminderType,
  WaterReminderType
} from "@/schemas/waterReminderSchema"

import {
  createWaterReminder,
  deleteWaterReminder,
  getDailyWaterIntakeByUserId,
  getWaterReminderById,
  getWaterRemindersByUserId,
  updateWaterReminder,
  updateWaterReminderDrunk,
  updateWaterReminderStatus
} from "@/services/waterReminderService"

export const useGetWaterReminderByUserId = (
  userId: string | undefined,
  status?: boolean
) => {
  const handleError = useError()

  return useQuery<WaterReminderType[], Error>({
    queryKey: ["water-reminders", userId, status],
    queryFn: async () => {
      try {
        return await getWaterRemindersByUserId(userId, status)
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
    queryKey: ["water-reminder", waterReminderId],
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
      queryClient.invalidateQueries({ queryKey: ["water-reminders"] })
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
    { waterReminderId: string; updatedData: UpdateWaterReminderType }
  >({
    mutationFn: async ({ waterReminderId, updatedData }) => {
      try {
        return await updateWaterReminder(
          waterReminderId,
          updatedData,
          showModal
        )
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["water-reminders"] })
      queryClient.invalidateQueries({ queryKey: ["water-reminder"] })
    }
  })
}

export const useDeleteWaterReminder = () => {
  const queryClient = useQueryClient()
  const handleError = useError()
  const { showModal } = useModal()

  return useMutation<string, Error, string>({
    mutationFn: async (waterReminderId) => {
      try {
        return await deleteWaterReminder(waterReminderId, showModal)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["water-reminders"] })
    }
  })
}

export const useUpdateWaterReminderStatus = () => {
  const queryClient = useQueryClient()
  const handleError = useError()
  const { showModal } = useModal()

  return useMutation<string, Error, string>({
    mutationFn: async (waterReminderId) => {
      try {
        return await updateWaterReminderStatus(waterReminderId, showModal)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["water-reminders"] })
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["water-reminders"] })
      queryClient.invalidateQueries({ queryKey: ["dailyWaterIntake"] })
    }
  })
}

export const useGetDailyWaterIntakeByUserId = (
  userId: string | undefined,
  date: string
) => {
  const handleError = useError()

  return useQuery<DailyWaterIntakeType, Error>({
    queryKey: ["dailyWaterIntake", userId, date],
    queryFn: async () => {
      try {
        return await getDailyWaterIntakeByUserId(userId, date)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5
  })
}
