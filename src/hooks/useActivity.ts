import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { useError } from "@/contexts/ErrorContext"
import { useModal } from "@/contexts/ModalContext"

import { ActivityType, CreateActivityType } from "@/schemas/activitySchema"

import { createActivity, getActivityById } from "@/services/activityService"

export const useGetActivityById = (activityId: string | undefined) => {
  const handleError = useError()

  return useQuery<ActivityType, Error>({
    queryKey: ["activity", activityId],
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
      queryClient.invalidateQueries({ queryKey: ["activities"] })
      queryClient.invalidateQueries({ queryKey: ["daily-activity"] })
    }
  })
}
