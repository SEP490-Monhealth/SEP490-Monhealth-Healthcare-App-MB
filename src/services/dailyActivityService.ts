import monAPI from "@/lib/monAPI"

import { DailyActivityType } from "@/schemas/dailyActivitySchema"

export const getDailyActivityByUserId = async (
  userId: string | undefined,
  date: string
): Promise<DailyActivityType> => {
  try {
    const response = await monAPI.get(`/daily-activities/user`, {
      params: { userId, date }
    })

    const { success, message, data } = response.data

    if (!success) {
      throw { isCustomError: true, message: message }
    }

    return data as DailyActivityType
  } catch (error: any) {
    throw {
      isCustomError: true,
      message: error.message || "Đã xảy ra lỗi không mong muốn"
    }
  }
}
