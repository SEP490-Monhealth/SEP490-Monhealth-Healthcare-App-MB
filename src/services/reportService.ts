import axios from "axios"

import monAPI from "@/lib/monAPI"

import {
  MonthlyBookingType,
  MonthlyTransactionType,
  WeeklyMealType
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

    if (success) {
      return data as WeeklyMealType[]
    } else {
      throw { isCustomError: true, message: message }
    }
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.log("Lỗi từ server:", error.response?.data || error.message)
      throw error
    } else {
      console.log("Lỗi không phải Axios:", error)
      throw {
        isCustomError: true,
        message: "Đã xảy ra lỗi không mong muốn"
      }
    }
  }
}

export const getMonthlyTransactionByUserId = async (
  userId: string | undefined,
  date: string
): Promise<MonthlyTransactionType> => {
  try {
    const response = await monAPI.get(
      `/reports/monthly-transactions/${userId}`,
      { params: { date } }
    )

    const { success, message, data } = response.data

    if (success) {
      return data as MonthlyTransactionType
    } else {
      throw { isCustomError: true, message: message }
    }
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.log("Lỗi từ server:", error.response?.data || error.message)
      throw error
    } else {
      console.log("Lỗi không phải Axios:", error)
      throw {
        isCustomError: true,
        message: "Đã xảy ra lỗi không mong muốn"
      }
    }
  }
}

export const getMonthlyBookingByUserId = async (
  userId: string | undefined,
  date: string
): Promise<MonthlyBookingType[]> => {
  try {
    const response = await monAPI.get(`/reports/monthly-bookings/${userId}`, {
      params: { date }
    })

    const { success, message, data } = response.data

    if (success) {
      return data as MonthlyBookingType[]
    } else {
      throw { isCustomError: true, message: message }
    }
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.log("Lỗi từ server:", error.response?.data || error.message)
      throw error
    } else {
      console.log("Lỗi không phải Axios:", error)
      throw {
        isCustomError: true,
        message: "Đã xảy ra lỗi không mong muốn"
      }
    }
  }
}
