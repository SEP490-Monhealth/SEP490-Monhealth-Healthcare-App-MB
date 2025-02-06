import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { useError } from "@/contexts/ErrorContext"

import {
  SubscriptionType,
  UpgradeSubscriptionType,
  UserSubscriptionType
} from "@/schemas/subscriptionSchema"

import {
  getAllSubscriptions,
  getSubscriptionByUserId,
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

export const useGetSubscriptionByUserId = (userId: string | undefined) => {
  const handleError = useError()

  return useQuery<UserSubscriptionType, Error>({
    queryKey: ["subscription", userId],
    queryFn: async () => {
      try {
        return await getSubscriptionByUserId(userId)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5
  })
}

export const useUpgradeSubscription = () => {
  const queryClient = useQueryClient()
  const handleError = useError()

  return useMutation<string, Error, UpgradeSubscriptionType>({
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
