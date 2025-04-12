import { useQuery } from "@tanstack/react-query"

import { MonQueryKey } from "@/constants/query"

import { useError } from "@/contexts/ErrorContext"

import {
  MonthlyBookingType,
  MonthlyTransactionType,
  WeeklyMealType
} from "@/schemas/reportSchema"

import {
  getMonthlyBookingByUserId,
  getMonthlyTransactionByUserId,
  getWeeklyMealByUserId
} from "@/services/reportService"

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

export const useGetMonthlyTransactionByConsultantId = (
  userId: string | undefined,
  date: string
) => {
  const handleError = useError()

  return useQuery<MonthlyTransactionType, Error>({
    queryKey: [MonQueryKey.Report.MonthlyTransaction, userId, date],
    queryFn: async () => {
      try {
        return await getMonthlyTransactionByUserId(userId, date)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5
  })
}

export const useGetMonthlyBookingByConsultantId = (
  userId: string | undefined,
  date: string
) => {
  const handleError = useError()

  return useQuery<MonthlyBookingType[], Error>({
    queryKey: [MonQueryKey.Report.MonthlyBooking, userId, date],
    queryFn: async () => {
      try {
        return await getMonthlyBookingByUserId(userId, date)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5
  })
}
