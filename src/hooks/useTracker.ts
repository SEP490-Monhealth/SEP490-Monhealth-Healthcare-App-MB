import { useQuery } from "@tanstack/react-query"

import { MonQueryKey } from "@/constants/query"

import { useError } from "@/contexts/ErrorContext"

import { BookingType } from "@/schemas/bookingSchema"
import { DailyActivityType } from "@/schemas/dailyActivitySchema"
import { DailyMealType } from "@/schemas/dailyMealSchema"
import { DailyWaterIntakeType } from "@/schemas/dailyWaterIntakeSchema"
import {
  WeeklyMealType,
  WeeklyWeightType,
  YearlyBookingType,
  YearlyTransactionType
} from "@/schemas/trackerSchema"

import {
  getDailyActivityByUserId,
  getDailyMealByUserId,
  getDailyWaterIntakeByUserId,
  getMonthlyBookingsByConsultantId,
  getWeeklyMealByUserId,
  getWeeklyWeightByUserId,
  getYearlyBookingByConsultantId,
  getYearlyTransactionByConsultantId
} from "@/services/trackerService"

interface BookingResponse {
  bookings: BookingType[]
  totalPages: number
  totalItems: number
}

export const useGetDailyMealByUserId = (
  userId: string | undefined,
  date: string
) => {
  const handleError = useError()

  return useQuery<DailyMealType, Error>({
    queryKey: [MonQueryKey.Meal.DailyMeal, userId, date],
    queryFn: async () => {
      try {
        return await getDailyMealByUserId(userId, date)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5
  })
}

export const useGetWeeklyMealByUserId = (
  userId: string | undefined,
  date: string
) => {
  const handleError = useError()

  return useQuery<WeeklyMealType[], Error>({
    queryKey: [MonQueryKey.Tracker.WeeklyMeal, userId, date],
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

export const useGetDailyWaterIntakeByUserId = (
  userId: string | undefined,
  date: string
) => {
  const handleError = useError()

  return useQuery<DailyWaterIntakeType, Error>({
    queryKey: [MonQueryKey.WaterReminder.DailyWaterIntake, userId, date],
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

export const useGetDailyActivityByUserId = (
  userId: string | undefined,
  date: string
) => {
  const handleError = useError()

  return useQuery<DailyActivityType, Error>({
    queryKey: [MonQueryKey.Activity.DailyActivity, userId, date],
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

export const useGetWeeklyWeightByUserId = (userId: string | undefined) => {
  const handleError = useError()

  return useQuery<WeeklyWeightType[], Error>({
    queryKey: [MonQueryKey.Tracker.WeeklyWeight, userId],
    queryFn: async () => {
      try {
        return await getWeeklyWeightByUserId(userId)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5
  })
}

export const useGetMonthlyBookingsByConsultantId = (
  consultantId: string | undefined,
  page: number,
  limit?: number,
  month?: string
) => {
  const handleError = useError()

  return useQuery<BookingResponse, Error>({
    queryKey: [
      MonQueryKey.Tracker.MonthlyBookings,
      consultantId,
      page,
      limit,
      month
    ],
    queryFn: async () => {
      try {
        return await getMonthlyBookingsByConsultantId(
          consultantId,
          page,
          limit,
          month
        )
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    enabled: !!consultantId,
    staleTime: 1000 * 60 * 5
  })
}

export const useGetYearlyBookingByConsultantId = (
  userId: string | undefined,
  date: string
) => {
  const handleError = useError()

  return useQuery<YearlyBookingType[], Error>({
    queryKey: [MonQueryKey.Tracker.YearlyBooking, userId, date],
    queryFn: async () => {
      try {
        return await getYearlyBookingByConsultantId(userId, date)
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
    queryKey: [MonQueryKey.Tracker.YearlyTransaction, userId, date],
    queryFn: async () => {
      try {
        return await getYearlyTransactionByConsultantId(userId, date)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5
  })
}
