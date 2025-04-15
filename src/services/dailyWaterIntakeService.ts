import monAPI from "@/lib/monAPI"

import { DailyWaterIntakeType } from "@/schemas/dailyWaterIntakeSchema"

export const getDailyWaterIntakeByUserId = async (
  userId: string | undefined,
  date: string
): Promise<DailyWaterIntakeType> => {
  try {
    const response = await monAPI.get(`/daily-water-intakes/user`, {
      params: { userId, date }
    })

    const { success, message, data } = response.data

    if (!success) {
      throw { isCustomError: true, message: message }
    }

    return data as DailyWaterIntakeType
  } catch (error: any) {
    throw {
      isCustomError: true,
      message: error.message || "Đã xảy ra lỗi không mong muốn"
    }
  }
}
