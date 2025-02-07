import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { useError } from "@/contexts/ErrorContext"

import {
  SubscriptionType,
  SubscriptionUpgradeType
} from "@/schemas/subscriptionSchema"

import {
  getAllSubscriptions,
  upgradeSubscription
} from "@/services/subscriptionService"

export const useGetAllSubscriptions = () => {
  const handleError = useError()

  return useQuery<SubscriptionType[], Error>({
    queryKey: ["subscriptions"],
    queryFn: async () => {
      try {
        return await getAllSubscriptions()
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

  return useMutation<string, Error, SubscriptionUpgradeType>({
    mutationFn: async (upgrade) => {
      try {
        return await upgradeSubscription(upgrade)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscription"] })
    }
  })
}
