import { useQuery } from "@tanstack/react-query"

import { useError } from "@/contexts/ErrorContext"

import { UserSubscriptionType } from "@/schemas/subscriptionSchema"

import {
  getRemainingBookingByUserId,
  getUserSubscriptionByUserId
} from "@/services/useSubscriptionService"

export const useGetUserSubscriptionByUserId = (userId: string | undefined) => {
  const handleError = useError()

  return useQuery<UserSubscriptionType[], Error>({
    queryKey: ["user-subscriptions", userId],
    queryFn: async () => {
      try {
        return await getUserSubscriptionByUserId(userId)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5
  })
}

export const useGetRemainingBookingByUserId = (userId: string | undefined) => {
  const handleError = useError()

  return useQuery<number, Error>({
    queryKey: ["remaining-booking", userId],
    queryFn: async () => {
      try {
        return await getRemainingBookingByUserId(userId)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5
  })
}
