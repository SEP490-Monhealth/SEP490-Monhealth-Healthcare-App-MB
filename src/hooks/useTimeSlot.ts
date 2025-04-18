import { useMutation, useQueryClient } from "@tanstack/react-query"

import { MonQueryKey } from "@/constants/query"

import { useError } from "@/contexts/ErrorContext"

import { CreateTimeSlotType } from "@/schemas/scheduleSchema"

import { createTimeSlot, deleteTimeSlot } from "@/services/timeSlotService"

export const useCreateTimeSlot = () => {
  const queryClient = useQueryClient()
  const handleError = useError()

  return useMutation<string, Error, CreateTimeSlotType>({
    mutationFn: async (newData) => {
      try {
        return await createTimeSlot(newData)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [MonQueryKey.Schedule.Schedules]
      })
    }
  })
}

export const useDeleteTimeSlot = () => {
  const queryClient = useQueryClient()
  const handleError = useError()

  return useMutation<string, Error, string>({
    mutationFn: async (timeSlotId) => {
      try {
        return await deleteTimeSlot(timeSlotId)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [MonQueryKey.Schedule.Schedules]
      })
    }
  })
}
