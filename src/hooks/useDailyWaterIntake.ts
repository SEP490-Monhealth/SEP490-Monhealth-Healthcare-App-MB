import { useQuery } from "@tanstack/react-query"

import { useError } from "@/contexts/ErrorContext"

import { DailyWaterIntakeType } from "@/schemas/dailyWaterIntakeSchema"

import { getDailyWaterIntakeByUserId } from "@/services/dailyWaterIntakeService"

export const useGetDailyWaterIntakeByUserId = (
  userId: string | undefined,
  date: string
) => {
  const handleError = useError()

  return useQuery<DailyWaterIntakeType, Error>({
    queryKey: ["dailyWaterIntake", userId, date],
    queryFn: async () => {
      try {
        return await getDailyWaterIntakeByUserId(userId, date)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5
  })
}
