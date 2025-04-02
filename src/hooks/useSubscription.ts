import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { useError } from "@/contexts/ErrorContext"
import { useModal } from "@/contexts/ModalContext"

import {
  SubscriptionType,
  UpgradeSubscriptionType
} from "@/schemas/subscriptionSchema"

import {
  getAllSubscriptions,
  upgradeSubscription
} from "@/services/subscriptionService"

interface SubscriptionsResponse {
  totalPages: number
  totalItems: number
  subscriptions: SubscriptionType[]
}

export const useGetAllSubscriptions = (
  page: number,
  limit?: number,
  search?: string,
  sort?: boolean,
  status?: boolean
) => {
  const handleError = useError()

  return useQuery<SubscriptionsResponse, Error>({
    queryKey: ["subscriptions", page, limit, search, sort, status],
    queryFn: async () => {
      try {
        return await getAllSubscriptions(page, limit, search, sort, status)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    staleTime: 1000 * 60 * 5
  })
}

export const useUpgradeSubscription = () => {
  const queryClient = useQueryClient()
  const handleError = useError()
  const { showModal } = useModal()

  return useMutation<string, Error, UpgradeSubscriptionType>({
    mutationFn: async (upgradeData) => {
      try {
        return await upgradeSubscription(upgradeData, showModal)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscription"] })
      queryClient.invalidateQueries({ queryKey: ["dailyMeal"] })
    }
  })
}
