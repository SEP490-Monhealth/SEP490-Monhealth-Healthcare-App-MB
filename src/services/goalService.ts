import axios from "axios"

import monAPI from "@/lib/monAPI"

import {
  GoalType,
  NutritionGoalType,
  WaterIntakeGoalType,
  WeightGoalType
} from "@/schemas/goalSchema"

export const getGoalByUserId = async (
  userId: string | undefined
): Promise<GoalType[]> => {
  try {
    const response = await monAPI.get(`/goals/${userId}`)

    if (!response || !response.data) {
      throw {
        isCustomError: true,
        message:
          "Không nhận được phản hồi từ máy chủ. Có thể máy chủ đang gặp sự cố hoặc kết nối mạng của bạn bị gián đoạn"
      }
    }

    const { success, message, data } = response.data

    if (success) {
      return data as GoalType[]
    } else {
      throw {
        isCustomError: true,
        message: message || "Không thể lấy thông tin mục tiêu"
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

export const getGoalById = async (
  goalId: string | undefined
): Promise<GoalType> => {
  try {
    const response = await monAPI.get(`/goals/${goalId}`)

    if (!response || !response.data) {
      throw {
        isCustomError: true,
        message:
          "Không nhận được phản hồi từ máy chủ. Có thể máy chủ đang gặp sự cố hoặc kết nối mạng của bạn bị gián đoạn"
      }
    }

    const { success, message, data } = response.data

    if (success) {
      return data as GoalType
    } else {
      throw {
        isCustomError: true,
        message: message || "Không thể lấy thông tin mục tiêu"
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

export const getWeightGoalByUserId = async (
  userId: string | undefined
): Promise<WeightGoalType> => {
  try {
    const response = await monAPI.get(`/goals/user/${userId}/weight`)

    if (!response || !response.data) {
      throw {
        isCustomError: true,
        message:
          "Không nhận được phản hồi từ máy chủ. Có thể máy chủ đang gặp sự cố hoặc kết nối mạng của bạn bị gián đoạn"
      }
    }

    const { success, message, data } = response.data

    if (success) {
      return data as WeightGoalType
    } else {
      throw {
        isCustomError: true,
        message: message || "Không thể lấy thông tin mục tiêu cân nặng"
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

export const getNutritionGoalByUserId = async (
  userId: string | undefined
): Promise<NutritionGoalType> => {
  try {
    const response = await monAPI.get(`/goals/user/${userId}/nutrition`)

    if (!response || !response.data) {
      throw {
        isCustomError: true,
        message:
          "Không nhận được phản hồi từ máy chủ. Có thể máy chủ đang gặp sự cố hoặc kết nối mạng của bạn bị gián đoạn"
      }
    }

    const { success, message, data } = response.data

    if (success) {
      return data as NutritionGoalType
    } else {
      throw {
        isCustomError: true,
        message: message || "Không thể lấy thông tin mục tiêu dinh dưỡng"
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

export const getWaterIntakeGoalByUserId = async (
  userId: string | undefined
): Promise<WaterIntakeGoalType> => {
  try {
    const response = await monAPI.get(`/goals/user/${userId}/water-intake`)

    if (!response || !response.data) {
      throw {
        isCustomError: true,
        message:
          "Không nhận được phản hồi từ máy chủ. Có thể máy chủ đang gặp sự cố hoặc kết nối mạng của bạn bị gián đoạn"
      }
    }

    const { success, message, data } = response.data

    if (success) {
      return data as WaterIntakeGoalType
    } else {
      throw {
        isCustomError: true,
        message: message || "Không thể lấy thông tin mục tiêu nước uống"
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
