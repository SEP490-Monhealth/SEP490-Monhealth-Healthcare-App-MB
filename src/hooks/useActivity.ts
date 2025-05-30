import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { MonQueryKey } from "@/constants/query"

import { useError } from "@/contexts/ErrorContext"
import { useModal } from "@/contexts/ModalContext"

import { ActivityType, CreateActivityType } from "@/schemas/activitySchema"

import {
  createActivity,
  getActivityById,
  updateActivityStatus
} from "@/services/activityService"

export const useGetActivityById = (activityId: string | undefined) => {
  const handleError = useError()

  return useQuery<ActivityType, Error>({
    queryKey: [MonQueryKey.Activity.Activities, activityId],
    queryFn: async () => {
      try {
        return await getActivityById(activityId)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    enabled: !!activityId,
    staleTime: 1000 * 60 * 5
  })
}

export const useCreateActivity = () => {
  const queryClient = useQueryClient()
  const handleError = useError()
  const { showModal } = useModal()

  return useMutation<string, Error, CreateActivityType>({
    mutationFn: async (newData) => {
      try {
        return await createActivity(newData, showModal)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [MonQueryKey.Activity.Activities]
      })
      queryClient.invalidateQueries({
        queryKey: [MonQueryKey.Activity.DailyActivity]
      })
    }
  })
}

export const useUpdateActivityStatus = () => {
  const queryClient = useQueryClient()
  const handleError = useError()

  return useMutation<string, Error, string>({
    mutationFn: async (activityId) => {
      try {
        return await updateActivityStatus(activityId)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [MonQueryKey.Activity.Activities]
      })
      queryClient.invalidateQueries({
        queryKey: [MonQueryKey.Activity.DailyActivity]
      })
    }
  })
}
