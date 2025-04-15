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

    if (!success) {
      throw { isCustomError: true, message: message }
    }

    return data as DailyMealType
  } catch (error: any) {
    throw {
      isCustomError: true,
      message: error.message || "Đã xảy ra lỗi không mong muốn"
    }
  }
}
