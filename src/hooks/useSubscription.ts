import { useQuery } from "@tanstack/react-query"

import { useError } from "@/contexts/ErrorContext"

import { SubscriptionType } from "@/schemas/subscriptionSchema"

import { getAllSubscriptions } from "@/services/subscriptionService"

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
