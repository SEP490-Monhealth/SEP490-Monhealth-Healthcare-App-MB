import { useQuery } from "@tanstack/react-query"

import { useError } from "@/contexts/ErrorContext"

import { getRemainingBookingByUserId } from "@/services/useSubscriptionService"

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
