import axios from "axios"

import monAPI from "@/lib/monAPI"

import { NutritionType } from "@/schemas/nutritionSchema"

export const getNutritionByFoodId = async (
  foodId: string | undefined
): Promise<NutritionType> => {
  try {
    const response = await monAPI.get(`/nutrition/food/${foodId}`)

    const { success, message, data } = response.data

    if (success) {
      return data as NutritionType
    } else {
      throw {
        isCustomError: true,
        message: message || "Không thể lấy thông tin chi tiết dinh dưỡng"
      }
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
