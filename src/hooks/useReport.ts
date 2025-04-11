import { useQuery } from "@tanstack/react-query"

import { MonQueryKey } from "@/constants/query"

import { useError } from "@/contexts/ErrorContext"

import { WeeklyMealType } from "@/schemas/reportSchema"

import { getWeeklyMealByUserId } from "@/services/reportService"

export const useGetWeeklyMealByUserId = (
  userId: string | undefined,
  date: string
) => {
  const handleError = useError()

  return useQuery<WeeklyMealType[], Error>({
    queryKey: [MonQueryKey.Report.WeeklyMeal, userId, date],
    queryFn: async () => {
      try {
        return await getWeeklyMealByUserId(userId, date)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5
  })
}
