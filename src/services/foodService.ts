import monAPI from "@/lib/monAPI"

import { FoodType } from "@/schemas/foodSchema"

interface FoodResponse {
  foods: FoodType[]
  totalPages: number
  totalItems: number
}

export const getAllFoods = async (
  page: number,
  limit: number,
  search?: string,
  status?: boolean
): Promise<FoodResponse> => {
  try {
    const response = await monAPI.get(`/foods`, {
      params: { page, limit, search, status }
    })

    if (!response || !response.data) {
      throw new Error(
        "Không nhận được phản hồi từ máy chủ. Có thể máy chủ đang gặp sự cố hoặc kết nối mạng của bạn bị gián đoạn."
      )
    }

    const { success, message, data } = response.data

    if (success) {
      const { totalPages, totalItems, items: foods } = data
      return { foods, totalPages, totalItems }
    } else {
      throw new Error(message || "Không thể lấy danh sách món ăn.")
    }
  } catch (error: any) {
    const errorMessage = error.response?.data?.message
      ? `Lỗi từ máy chủ: ${error.response.data.message}`
      : error.message || "Đã xảy ra lỗi không mong muốn, vui lòng thử lại sau."
    console.error("Lỗi khi lấy danh sách món ăn:", errorMessage)
    throw new Error(errorMessage)
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
      throw new Error(
        "Không nhận được phản hồi từ máy chủ. Có thể máy chủ đang gặp sự cố hoặc kết nối mạng của bạn bị gián đoạn."
      )
    }

    const { success, message, data } = response.data

    if (success) {
      const { totalPages, totalItems, items: foods } = data
      return { foods, totalPages, totalItems }
    } else {
      throw new Error(message || "Không thể lấy danh sách món ăn theo loại.")
    }
  } catch (error: any) {
    const errorMessage = error.response?.data?.message
      ? `Lỗi từ máy chủ: ${error.response.data.message}`
      : error.message || "Đã xảy ra lỗi không mong muốn, vui lòng thử lại sau."
    console.error("Lỗi khi lấy món ăn theo loại:", errorMessage)
    throw new Error(errorMessage)
  }
}

export const getFoodsByCategory = async (
  category: string,
  page: number,
  limit: number
): Promise<FoodResponse> => {
  try {
    const response = await monAPI.get(`/foods/category/${category}`, {
      params: { page, limit }
    })

    if (!response || !response.data) {
      throw new Error(
        "Không nhận được phản hồi từ máy chủ. Có thể máy chủ đang gặp sự cố hoặc kết nối mạng của bạn bị gián đoạn."
      )
    }

    const { success, message, data } = response.data

    if (success) {
      const { totalPages, totalItems, items: foods } = data
      return { foods, totalPages, totalItems }
    } else {
      throw new Error(
        message || "Không thể lấy danh sách món ăn theo danh mục."
      )
    }
  } catch (error: any) {
    const errorMessage = error.response?.data?.message
      ? `Lỗi từ máy chủ: ${error.response.data.message}`
      : error.message || "Đã xảy ra lỗi không mong muốn, vui lòng thử lại sau."
    console.error("Lỗi khi lấy món ăn theo danh mục:", errorMessage)
    throw new Error(errorMessage)
  }
}

export const getFoodById = async (foodId: string): Promise<FoodType> => {
  try {
    const response = await monAPI.get(`/foods/${foodId}`)

    if (!response || !response.data) {
      throw new Error(
        "Không nhận được phản hồi từ máy chủ. Có thể máy chủ đang gặp sự cố hoặc kết nối mạng của bạn bị gián đoạn."
      )
    }

    const { success, message, data } = response.data

    if (success) {
      return data as FoodType
    } else {
      throw new Error(message || "Không thể lấy thông tin chi tiết món ăn.")
    }
  } catch (error: any) {
    const errorMessage = error.response?.data?.message
      ? `Lỗi từ máy chủ: ${error.response.data.message}`
      : error.message || "Đã xảy ra lỗi không mong muốn, vui lòng thử lại sau."
    console.error("Lỗi khi lấy thông tin món ăn:", errorMessage)
    throw new Error(errorMessage)
  }
}
