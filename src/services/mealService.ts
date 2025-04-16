import axios from "axios"

import monAPI from "@/lib/monAPI"

import { DailyMealType } from "@/schemas/dailyMealSchema"
import { CreateMealType, MealFoodType, MealType } from "@/schemas/mealSchema"

export const getMealsByUserId = async (
  userId: string | undefined,
  router: any
): Promise<MealType[] | null> => {
  try {
    const response = await monAPI.get(`/meals/user/${userId}`)

    const { success, message, data } = response.data

    if (!success) {
      throw { isCustomError: true, message: message }
    }

    return data as MealType[]
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.status === 500) {
        router.replace("/(tabs)/user/home")
        return null
      }

      throw error
    } else {
      throw {
        isCustomError: true,
        message: error.message || "Đã xảy ra lỗi không mong muốn"
      }
    }
  }
}

export const getMealById = async (
  mealId: string | undefined,
  router: any
): Promise<MealType | null> => {
  try {
    const response = await monAPI.get(`/meals/${mealId}`)

    const { success, message, data } = response.data

    if (!success) {
      throw { isCustomError: true, message: message }
    }

    return data as MealType
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.status === 500) {
        router.replace("/(tabs)/user/home")
        return null
      }

      throw error
    } else {
      throw {
        isCustomError: true,
        message: error.message || "Đã xảy ra lỗi không mong muốn"
      }
    }
  }
}

export const createMeal = async (
  newData: CreateMealType,
  showModal: (message: string) => void
): Promise<{ mealId: string; message: string }> => {
  try {
    const response = await monAPI.post("/meals", newData)

    const { success, message, data } = response.data

    if (!success) {
      showModal(message)
      throw { isCustomError: true, message: message }
    }

    showModal(message)
    const mealId = data?.mealId
    return { mealId, message }
  } catch (error: any) {
    throw {
      isCustomError: true,
      message: error.message || "Đã xảy ra lỗi không mong muốn"
    }
  }
}

export const getMealFoodsByMealId = async (
  mealId: string | undefined,
  router: any
): Promise<MealFoodType[] | null> => {
  try {
    const response = await monAPI.get(`/meal/${mealId}/foods`)

    const { success, message, data } = response.data

    if (!success) {
      throw { isCustomError: true, message: message }
    }

    return data as MealFoodType[]
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.status === 500) {
        router.replace("/(tabs)/user/home")
        return null
      }

      throw error
    } else {
      throw {
        isCustomError: true,
        message: error.message || "Đã xảy ra lỗi không mong muốn"
      }
    }
  }
}

export const updateMealFoodQuantity = async (
  mealFoodId: string | undefined,
  quantity: number
): Promise<string> => {
  try {
    const response = await monAPI.patch(
      `/meal/food/${mealFoodId}/quantity`,
      null,
      { params: { quantity } }
    )

    const { success, message } = response.data

    if (!success) {
      throw { isCustomError: true, message: message }
    }

    console.log(message)
    return message
  } catch (error: any) {
    throw {
      isCustomError: true,
      message: error.message || "Đã xảy ra lỗi không mong muốn"
    }
  }
}

export const updateMealFoodStatus = async (
  mealFoodId: string | undefined
): Promise<string> => {
  try {
    const response = await monAPI.patch(`/meal/food/${mealFoodId}/completed`)

    const { success, message } = response.data

    if (!success) {
      throw { isCustomError: true, message: message }
    }

    console.log(message)
    return message
  } catch (error: any) {
    throw {
      isCustomError: true,
      message: error.message || "Đã xảy ra lỗi không mong muốn"
    }
  }
}

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
