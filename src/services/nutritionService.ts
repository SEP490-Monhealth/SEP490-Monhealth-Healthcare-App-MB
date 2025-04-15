import monAPI from "@/lib/monAPI"

import { NutritionType } from "@/schemas/nutritionSchema"

export const getNutritionByFoodId = async (
  foodId: string | undefined
): Promise<NutritionType> => {
  try {
    const response = await monAPI.get(`/nutrition/food/${foodId}`)

    const { success, message, data } = response.data

    if (!success) {
      throw { isCustomError: true, message: message }
    }

    return data as NutritionType
  } catch (error: any) {
    throw {
      isCustomError: true,
      message: error.message || "Đã xảy ra lỗi không mong muốn"
    }
  }
}
