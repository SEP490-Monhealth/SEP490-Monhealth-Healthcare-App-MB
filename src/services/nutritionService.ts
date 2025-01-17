import axios from "axios"

import monAPI from "@/lib/monAPI"

import { NutritionType } from "@/schemas/nutritionSchema"

export const getNutritionByFoodId = async (
  foodId: string
): Promise<NutritionType> => {
  try {
    const response = await monAPI.get(`/nutrition/food/${foodId}`)

    if (!response || !response.data) {
      throw {
        isCustomError: true,
        message:
          "Không nhận được phản hồi từ máy chủ. Có thể máy chủ đang gặp sự cố hoặc kết nối mạng của bạn bị gián đoạn"
      }
    }

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
