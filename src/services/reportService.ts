import monAPI from "@/lib/monAPI"

import {
  WeeklyMealType,
  YearlyBookingType,
  YearlyTransactionType
} from "@/schemas/reportSchema"

export const getWeeklyMealByUserId = async (
  userId: string | undefined,
  date: string
): Promise<WeeklyMealType[]> => {
  try {
    const response = await monAPI.get(`/reports/weekly-meals/${userId}`, {
      params: { date }
    })

    const { success, message, data } = response.data

    if (!success) {
      throw { isCustomError: true, message: message }
    }

    return data as WeeklyMealType[]
  } catch (error: any) {
    throw {
      isCustomError: true,
      message: error.message || "Đã xảy ra lỗi không mong muốn"
    }
  }
}

export const getYearlyTransactionByUserId = async (
  userId: string | undefined,
  date: string
): Promise<YearlyTransactionType> => {
  try {
    const response = await monAPI.get(
      `/reports/yearly-transactions/${userId}`,
      { params: { date } }
    )

    const { success, message, data } = response.data

    if (!success) {
      throw { isCustomError: true, message: message }
    }

    return data as YearlyTransactionType
  } catch (error: any) {
    throw {
      isCustomError: true,
      message: error.message || "Đã xảy ra lỗi không mong muốn"
    }
  }
}

export const getYearlyBookingByUserId = async (
  userId: string | undefined,
  date: string
): Promise<YearlyBookingType[]> => {
  try {
    const response = await monAPI.get(`/reports/yearly-bookings/${userId}`, {
      params: { date }
    })

    const { success, message, data } = response.data

    if (!success) {
      throw { isCustomError: true, message: message }
    }

    return data as YearlyBookingType[]
  } catch (error: any) {
    throw {
      isCustomError: true,
      message: error.message || "Đã xảy ra lỗi không mong muốn"
    }
  }
}
