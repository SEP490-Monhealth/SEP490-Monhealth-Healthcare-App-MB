import { useQuery } from "@tanstack/react-query"

import { useError } from "@/contexts/ErrorContext"

import { DailyMealType } from "@/schemas/dailyMealSchema"

import { getDailyMealsByUserId } from "@/services/dailyMealService"

export const useGetDailyMealByUserId = (
  userId: string | undefined,
  date: string
) => {
  const handleError = useError()

  return useQuery<DailyMealType, Error>({
    queryKey: ["dailyMeal", userId, date],
    queryFn: async () => {
      try {
        return await getDailyMealsByUserId(userId, date)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5
  })
}
