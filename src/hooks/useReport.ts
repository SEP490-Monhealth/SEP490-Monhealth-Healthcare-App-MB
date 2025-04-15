import { useQuery } from "@tanstack/react-query"

import { MonQueryKey } from "@/constants/query"

import { useError } from "@/contexts/ErrorContext"

import {
  WeeklyMealType,
  YearlyBookingType,
  YearlyTransactionType
} from "@/schemas/reportSchema"

import {
  getYearlyBookingByUserId,
  getWeeklyMealByUserId,
  getYearlyTransactionByUserId
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

export const useGetYearlyTransactionByConsultantId = (
  userId: string | undefined,
  date: string
) => {
  const handleError = useError()

  return useQuery<YearlyTransactionType, Error>({
    queryKey: [MonQueryKey.Report.MonthlyTransaction, userId, date],
    queryFn: async () => {
      try {
        return await getYearlyTransactionByUserId(userId, date)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5
  })
}

export const useGetYearlyBookingByConsultantId = (
  userId: string | undefined,
  date: string
) => {
  const handleError = useError()

  return useQuery<YearlyBookingType[], Error>({
    queryKey: [MonQueryKey.Report.MonthlyBooking, userId, date],
    queryFn: async () => {
      try {
        return await getYearlyBookingByUserId(userId, date)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5
  })
}
