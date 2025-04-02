import { useQuery } from "@tanstack/react-query"

import { useError } from "@/contexts/ErrorContext"

import { DailyActivityType } from "@/schemas/dailyActivitySchema"

import { getDailyActivityByUserId } from "@/services/dailyActivityService"

export const useGetDailyActivityByUserId = (
  userId: string | undefined,
  date: string
) => {
  const handleError = useError()

  return useQuery<DailyActivityType, Error>({
    queryKey: ["daily-activity", userId, date],
    queryFn: async () => {
      try {
        return await getDailyActivityByUserId(userId, date)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5
  })
}
