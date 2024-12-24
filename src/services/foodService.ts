import axios from "axios"

import monAPI from "@/lib/monAPI"

import { FoodType } from "@/schemas/foodSchema"

interface FoodResponse {
  foods: FoodType[]
  totalPages: number
  totalItems: number
}

export const getAllFoods = async (
  page: number,
  limit?: number,
  search?: string,
  status?: boolean
): Promise<FoodResponse> => {
  try {
    const response = await monAPI.get(`/foods`, {
      params: { page, limit, search, status }
    })

    if (!response || !response.data) {
      throw {
        isCustomError: true,
        message:
          "Không nhận được phản hồi từ máy chủ. Có thể máy chủ đang gặp sự cố hoặc kết nối mạng của bạn bị gián đoạn."
      }
    }

    const { success, message, data } = response.data

    if (success) {
      const { totalPages, totalItems, items: foods } = data
      return { foods, totalPages, totalItems }
    } else {
      throw {
        isCustomError: true,
        message: message || "Không thể lấy danh sách món ăn."
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
        message: "Đã xảy ra lỗi không mong muốn."
      }
    }
  }
}

export const getFoodsByType = async (
  type: string,
  page: number,
  limit: number
): Promise<FoodResponse> => {
  try {
    const response = await monAPI.get(`/foods/type/${type}`, {
      params: { page, limit }
    })

    if (!response || !response.data) {
      throw {
        isCustomError: true,
        message:
          "Không nhận được phản hồi từ máy chủ. Có thể máy chủ đang gặp sự cố hoặc kết nối mạng của bạn bị gián đoạn."
      }
    }

    const { success, message, data } = response.data

    if (success) {
      const { totalPages, totalItems, items: foods } = data
      return { foods, totalPages, totalItems }
    } else {
      throw {
        isCustomError: true,
        message: message || "Không thể lấy danh sách món ăn theo loại."
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
        message: "Đã xảy ra lỗi không mong muốn."
      }
    }
  }
}

export const getFoodById = async (foodId: string): Promise<FoodType> => {
  try {
    const response = await monAPI.get(`/foods/${foodId}`)

    if (!response || !response.data) {
      throw {
        isCustomError: true,
        message:
          "Không nhận được phản hồi từ máy chủ. Có thể máy chủ đang gặp sự cố hoặc kết nối mạng của bạn bị gián đoạn."
      }
    }

    const { success, message, data } = response.data

    if (success) {
      return data as FoodType
    } else {
      throw {
        isCustomError: true,
        message: message || "Không thể lấy thông tin chi tiết món ăn."
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
        message: "Đã xảy ra lỗi không mong muốn."
      }
    }
  }
}
