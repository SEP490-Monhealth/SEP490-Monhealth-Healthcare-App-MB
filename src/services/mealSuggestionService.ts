import axios from "axios"

import monAPI from "@/lib/monAPI"

interface DishType {
  food: {
    foodId: string
    foodName: string
  }
  allocation: {
    calories: number
    protein: number
    carbs: number
    fat: number
    fiber: number
    sugar: number
  }
  goalAllocation: {
    calories: number
    protein: number
    carbs: number
    fat: number
    fiber: number
    sugar: number
  }
  portion: {
    portionId: string
    portionSize: number
    portionWeight: number
    measurementUnit: string
  }
}

export interface MealSuggestionType {
  breakfast: {
    mainDish: DishType
  }
  lunch: {
    mainDish: DishType
    sideDish: DishType
    dessert: DishType
  }
  dinner: {
    mainDish: DishType
    sideDish: DishType
    dessert: DishType
  }
}

export const getMealsByUserId = async (
  userId: string | undefined
): Promise<MealSuggestionType> => {
  try {
    const response = await monAPI.get(
      `/meal-suggestions/user/${userId}/random-meal`
    )

    if (!response || !response.data) {
      throw {
        isCustomError: true,
        message:
          "Không nhận được phản hồi từ máy chủ. Có thể máy chủ đang gặp sự cố hoặc kết nối mạng của bạn bị gián đoạn"
      }
    }

    const { success, message, data } = response.data

    if (success) {
      return data as MealSuggestionType
    } else {
      throw {
        isCustomError: true,
        message: message || "Không thể lấy danh sách bữa ăn"
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
