import { useQuery } from "@tanstack/react-query"

import { MonQueryKey } from "@/constants/query"

import { useError } from "@/contexts/ErrorContext"

import {
  RemainingBookingsType,
  UserSubscriptionType
} from "@/schemas/subscriptionSchema"

import {
  getRemainingBookingsByUserId,
  getUserSubscriptionByUserId
} from "@/services/useSubscriptionService"

export const useGetUserSubscriptionByUserId = (userId: string | undefined) => {
  const handleError = useError()

  return useQuery<UserSubscriptionType[], Error>({
    queryKey: [MonQueryKey.Subscription.UserSubscriptions, userId],
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

export const useGetRemainingBookings = (userId: string | undefined) => {
  const handleError = useError()

  return useQuery<RemainingBookingsType, Error>({
    queryKey: [MonQueryKey.Subscription.RemainingBookings, userId],
    queryFn: async () => {
      try {
        return await getRemainingBookingsByUserId(userId)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5
  })
}
