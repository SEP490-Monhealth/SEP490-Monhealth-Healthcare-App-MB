import axios from "axios"

import monAPI from "@/lib/monAPI"

import { CreateMealType, MealFoodType, MealType } from "@/schemas/mealSchema"

export const getMealsByUserId = async (
  userId: string | undefined
): Promise<MealType[]> => {
  try {
    const response = await monAPI.get(`/meals/user/${userId}`)

    const { success, message, data } = response.data

    if (success) {
      return data as MealType[]
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

export const getMealById = async (
  mealId: string | undefined
): Promise<MealType> => {
  try {
    const response = await monAPI.get(`/meals/${mealId}`)

    const { success, message, data } = response.data

    if (success) {
      return data as MealType
    } else {
      throw {
        isCustomError: true,
        message: message || "Không thể lấy thông tin chi tiết bữa ăn"
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

export const createMeal = async (
  newData: CreateMealType,
  showModal: (message: string) => void
): Promise<{ mealId: string; message: string }> => {
  try {
    const response = await monAPI.post("/meals", newData)

    const { success, message, data } = response.data

    if (!success) {
      throw {
        isCustomError: true,
        message: message || "Không thể tạo bữa ăn mới"
      }
    }

    showModal(message || "Tạo bữa ăn thành công")

    const mealId = data?.mealId
    return { mealId, message }
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.log("Lỗi từ server:", error.response?.data || error.message)
      throw error
    } else {
      showModal("Đã xảy ra lỗi khi tạo bữa ăn")

      console.log("Lỗi không phải Axios:", error)
      throw {
        isCustomError: true,
        message: "Đã xảy ra lỗi không mong muốn"
      }
    }
  }
}

export const getMealFoodsByMealId = async (
  mealId: string | undefined
): Promise<MealFoodType[]> => {
  try {
    const response = await monAPI.get(`/meal/${mealId}/foods`)

    const { success, message, data } = response.data

    if (success) {
      return data as MealFoodType[]
    } else {
      throw {
        isCustomError: true,
        message: message || "Không thể lấy danh sách khẩu phần ăn"
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

export const updateMealFoodQuantity = async (
  mealFoodId: string | undefined,
  quantity: number
): Promise<string> => {
  try {
    const response = await monAPI.patch(
      `/meal/food/${mealFoodId}/quantity`,
      null,
      {
        params: { quantity }
      }
    )

    const { success, message } = response.data

    if (!success) {
      throw {
        isCustomError: true,
        message: message || "Không thể cập nhật số lượng khẩu phần ăn"
      }
    }

    console.log(message)
    return message
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

export const updateMealFoodStatus = async (
  mealFoodId: string | undefined
): Promise<string> => {
  try {
    const response = await monAPI.patch(`/meal/food/${mealFoodId}/completed`)

    const { success, message } = response.data

    if (!success) {
      throw {
        isCustomError: true,
        message: message || "Không thể cập nhật trạng thái bữa ăn"
      }
    }

    console.log(message)
    return message
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
