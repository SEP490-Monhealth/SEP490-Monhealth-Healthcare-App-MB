import monAPI from "@/lib/monAPI"

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

interface BookingResponse {
  bookings: BookingType[]
  totalPages: number
  totalItems: number
}

export const getDailyMealByUserId = async (
  userId: string | undefined,
  date: string
): Promise<DailyMealType> => {
  try {
    const response = await monAPI.get(`/trackers/user/${userId}/meals/daily`, {
      params: { date }
    })

    const { success, message, data } = response.data

    if (!success) {
      throw { isCustomError: true, message: message }
    }

    return data as DailyMealType
  } catch (error: any) {
    const errorMessage = error.response?.data?.message
    throw { isCustomError: true, message: errorMessage }
  }
}

export const getWeeklyMealByUserId = async (
  userId: string | undefined,
  date: string
): Promise<WeeklyMealType[]> => {
  try {
    const response = await monAPI.get(`/trackers/user/${userId}/meals/weekly`, {
      params: { date }
    })

    const { success, message, data } = response.data

    if (!success) {
      throw { isCustomError: true, message: message }
    }

    return data as WeeklyMealType[]
  } catch (error: any) {
    const errorMessage = error.response?.data?.message
    throw { isCustomError: true, message: errorMessage }
  }
}

export const getDailyWaterIntakeByUserId = async (
  userId: string | undefined,
  date: string
): Promise<DailyWaterIntakeType> => {
  try {
    const response = await monAPI.get(
      `/trackers/user/${userId}/water-intakes/daily`,
      { params: { date } }
    )

    const { success, message, data } = response.data

    if (!success) {
      throw { isCustomError: true, message: message }
    }

    return data as DailyWaterIntakeType
  } catch (error: any) {
    const errorMessage = error.response?.data?.message
    throw { isCustomError: true, message: errorMessage }
  }
}

export const getDailyActivityByUserId = async (
  userId: string | undefined,
  date: string
): Promise<DailyActivityType> => {
  try {
    const response = await monAPI.get(
      `/trackers/user/${userId}/activities/daily`,
      { params: { date } }
    )

    const { success, message, data } = response.data

    if (!success) {
      throw { isCustomError: true, message: message }
    }

    return data as DailyActivityType
  } catch (error: any) {
    const errorMessage = error.response?.data?.message
    throw { isCustomError: true, message: errorMessage }
  }
}

export const getWeeklyWeightByUserId = async (
  userId: string | undefined
): Promise<WeeklyWeightType[]> => {
  try {
    const response = await monAPI.get(`/trackers/user/${userId}/weight/weekly`)

    const { success, message, data } = response.data

    if (!success) {
      throw { isCustomError: true, message: message }
    }

    return data as WeeklyWeightType[]
  } catch (error: any) {
    const errorMessage = error.response?.data?.message
    throw { isCustomError: true, message: errorMessage }
  }
}

export const getMonthlyBookingsByConsultantId = async (
  consultantId: string | undefined,
  page: number,
  limit?: number,
  month?: string
): Promise<BookingResponse> => {
  try {
    const response = await monAPI.get(
      `/trackers/consultant/${consultantId}/bookings/monthly`,
      { params: { page, limit, month } }
    )

    const { success, message, data } = response.data

    if (!success) {
      throw { isCustomError: true, message: message }
    }

    const { totalPages, totalItems, items: bookings } = data
    return { bookings, totalPages, totalItems }
  } catch (error: any) {
    const errorMessage = error.response?.data?.message
    throw { isCustomError: true, message: errorMessage }
  }
}

export const getYearlyBookingByConsultantId = async (
  consultantId: string | undefined,
  date: string
): Promise<YearlyBookingType[]> => {
  try {
    const response = await monAPI.get(
      `/trackers/consultant/${consultantId}/bookings/yearly`,
      { params: { date } }
    )

    const { success, message, data } = response.data

    if (!success) {
      throw { isCustomError: true, message: message }
    }

    return data as YearlyBookingType[]
  } catch (error: any) {
    const errorMessage = error.response?.data?.message
    throw { isCustomError: true, message: errorMessage }
  }
}

export const getYearlyTransactionByConsultantId = async (
  consultantId: string | undefined,
  date: string
): Promise<YearlyTransactionType> => {
  try {
    const response = await monAPI.get(
      `/trackers/consultant/${consultantId}/transactions/yearly`,
      { params: { date } }
    )

    const { success, message, data } = response.data

    if (!success) {
      throw { isCustomError: true, message: message }
    }

    return data as YearlyTransactionType
  } catch (error: any) {
    const errorMessage = error.response?.data?.message
    throw { isCustomError: true, message: errorMessage }
  }
}
