import axios from "axios"

import monAPI from "@/lib/monAPI"

import { DailyMealType } from "@/schemas/dailyMealSchema"

export const getDailyMealByUserId = async (
  userId: string | undefined,
  date: string
): Promise<DailyMealType> => {
  try {
    const response = await monAPI.get(`/daily-meals/user`, {
      params: { userId, date }
    })

    const { success, message, data } = response.data

    if (success) {
      return data as DailyMealType
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
