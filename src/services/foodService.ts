import axios from "axios"

import monAPI from "@/lib/monAPI"

import { CreateFoodType, FoodType } from "@/schemas/foodSchema"

interface FoodResponse {
  foods: FoodType[]
  totalPages: number
  totalItems: number
}

export const getAllFoods = async (
  page: number,
  limit?: number,
  category?: string,
  search?: string,
  isPublic?: boolean,
  popular?: boolean,
  status?: boolean
): Promise<FoodResponse> => {
  try {
    const response = await monAPI.get(`/foods`, {
      params: { page, limit, category, search, isPublic, popular, status }
    })

    const { success, message, data } = response.data

    if (!success) {
      throw {
        isCustomError: true,
        message: message || "Không thể lấy danh sách món ăn"
      }
    }

    const { totalPages, totalItems, items: foods } = data
    return { foods, totalPages, totalItems }
  } catch (error) {
    console.error("Lỗi lấy danh sách món ăn", error)
    throw new Error("Lấy danh sách món ăn thất bại")
  }
}

export const getFoodsByUserId = async (
  userId: string | undefined,
  page: number,
  limit?: number
): Promise<FoodResponse> => {
  try {
    const response = await monAPI.get(`/foods/user/${userId}`, {
      params: { page, limit }
    })

    const { success, message, data } = response.data

    if (success) {
      const { totalPages, totalItems, items: foods } = data
      return { foods, totalPages, totalItems }
    } else {
      throw {
        isCustomError: true,
        message: message || "Không thể lấy danh sách món ăn của người dùng"
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

export const getFoodById = async (
  foodId: string | undefined
): Promise<FoodType> => {
  try {
    const response = await monAPI.get(`/foods/${foodId}`)

    const { success, message, data } = response.data

    if (success) {
      return data as FoodType
    } else {
      throw {
        isCustomError: true,
        message: message || "Không thể lấy thông tin chi tiết món ăn"
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

export const createFood = async (
  newData: CreateFoodType,
  showModal: (message: string) => void
): Promise<string> => {
  try {
    const response = await monAPI.post(`/foods`, newData)

    const { success, message } = response.data

    if (!success) {
      throw {
        isCustomError: true,
        message: message || "Không thể tạo món ăn mới"
      }
    }

    showModal(message || "Tạo món ăn mới thành công")

    console.log(message)
    return message
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      showModal("Đã xảy ra lỗi khi tạo món ăn")

      console.log("Lỗi từ server:", error.response?.data || error.message)
      throw error
    } else {
      showModal("Đã xảy ra lỗi không mong muốn")

      console.log("Lỗi không phải Axios:", error)
      throw {
        isCustomError: true,
        message: "Đã xảy ra lỗi không mong muốn"
      }
    }
  }
}
