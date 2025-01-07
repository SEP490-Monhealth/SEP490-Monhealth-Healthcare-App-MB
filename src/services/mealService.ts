import axios from "axios"

import monAPI from "@/lib/monAPI"

import { CreateMealType, MealFoodType, MealType } from "@/schemas/mealSchema"

export const getMealsByUserId = async (
  userId: string | undefined
): Promise<MealType[]> => {
  try {
    const response = await monAPI.get(`/meals/user/${userId}`)

    if (!response || !response.data) {
      throw {
        isCustomError: true,
        message:
          "Không nhận được phản hồi từ máy chủ. Có thể máy chủ đang gặp sự cố hoặc kết nối mạng của bạn bị gián đoạn"
      }
    }

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

    if (!response || !response.data) {
      throw {
        isCustomError: true,
        message:
          "Không nhận được phản hồi từ máy chủ. Có thể máy chủ đang gặp sự cố hoặc kết nối mạng của bạn bị gián đoạn"
      }
    }

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
  newMealData: CreateMealType,
  showDialog: (message: string) => void
): Promise<{ mealId: string; message: string }> => {
  try {
    const response = await monAPI.post("/meals", newMealData)

    if (!response || !response.data) {
      throw {
        isCustomError: true,
        message:
          "Không nhận được phản hồi từ máy chủ. Có thể máy chủ đang gặp sự cố hoặc kết nối mạng của bạn bị gián đoạn"
      }
    }

    const { success, message, data } = response.data

    if (!success) {
      throw {
        isCustomError: true,
        message: message || "Không thể tạo bữa ăn mới"
      }
    }

    showDialog(message || "Tạo bữa ăn thành công")

    const mealId = data?.mealId
    return { mealId, message }
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.log("Lỗi từ server:", error.response?.data || error.message)
      throw error
    } else {
      showDialog("Đã xảy ra lỗi khi tạo bữa ăn")

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

    if (!response || !response.data) {
      throw {
        isCustomError: true,
        message:
          "Không nhận được phản hồi từ máy chủ. Có thể máy chủ đang gặp sự cố hoặc kết nối mạng của bạn bị gián đoạn"
      }
    }

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

export const updateMealFood = async (
  mealFoodId: string | undefined,
  quantity: number,
  showDialog: (message: string) => void
): Promise<string> => {
  try {
    const response = await monAPI.put(`/meal/foods/${mealFoodId}/quantity`, {
      quantity
    })

    if (!response || !response.data) {
      throw {
        isCustomError: true,
        message:
          "Không nhận được phản hồi từ máy chủ. Có thể máy chủ đang gặp sự cố hoặc kết nối mạng của bạn bị gián đoạn"
      }
    }

    const { success, message } = response.data

    if (!success) {
      throw {
        isCustomError: true,
        message: message || "Không thể cập nhật số lượng khẩu phần ăn"
      }
    }

    showDialog(message || "Cập nhật số lượng thành công")

    console.log(message)
    return message
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      showDialog("Đã xảy ra lỗi khi cập nhật số lượng")

      console.log("Lỗi từ server:", error.response?.data || error.message)
      throw error
    } else {
      showDialog("Đã xảy ra lỗi không mong muốn")

      console.log("Lỗi không phải Axios:", error)
      throw {
        isCustomError: true,
        message: "Đã xảy ra lỗi không mong muốn"
      }
    }
  }
}

export const updateMealFoodStatus = async (
  mealFoodId: string | undefined,
  showDialog: (message: string) => void
): Promise<string> => {
  try {
    const response = await monAPI.patch(`/meal/${mealFoodId}/status`)

    if (!response || !response.data) {
      throw {
        isCustomError: true,
        message:
          "Không nhận được phản hồi từ máy chủ. Có thể máy chủ đang gặp sự cố hoặc kết nối mạng của bạn bị gián đoạn"
      }
    }

    const { success, message } = response.data

    if (!success) {
      throw {
        isCustomError: true,
        message: message || "Không thể cập nhật trạng thái bữa ăn"
      }
    }

    showDialog(message || "Cập nhật trạng thái thành công")

    console.log(message)
    return message
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      showDialog("Đã xảy ra lỗi khi cập nhật trạng thái")

      console.log("Lỗi từ server:", error.response?.data || error.message)
      throw error
    } else {
      showDialog("Đã xảy ra lỗi không mong muốn")

      console.log("Lỗi không phải Axios:", error)
      throw {
        isCustomError: true,
        message: "Đã xảy ra lỗi không mong muốn"
      }
    }
  }
}
