import axios from "axios"

import { DifficultyLevelEnum } from "@/constants/enum/Workout"

import monAPI from "@/lib/monAPI"

import { WorkoutType } from "@/schemas/workoutSchema"

interface WorkoutResponse {
  workouts: WorkoutType[]
  totalPages: number
  totalItems: number
}

export const getAllWorkouts = async (
  page: number,
  limit?: number,
  category?: string,
  search?: string,
  difficulty?: DifficultyLevelEnum | undefined,
  popular?: boolean,
  status?: boolean
): Promise<WorkoutResponse> => {
  try {
    const response = await monAPI.get(`/workouts`, {
      params: {
        page,
        limit,
        category,
        search,
        difficulty,
        popular,
        status
      }
    })

    const { success, message, data } = response.data

    if (success) {
      const { totalPages, totalItems, items: workouts } = data
      return { workouts, totalPages, totalItems }
    } else {
      throw {
        isCustomError: true,
        message: message || "Không thể lấy danh sách bài tập"
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

export const getWorkoutsByUserId = async (
  userId: string | undefined,
  page: number,
  limit: number
): Promise<WorkoutResponse> => {
  try {
    const response = await monAPI.get(`/workouts/user/${userId}`, {
      params: { page, limit }
    })

    const { success, message, data } = response.data

    if (success) {
      const { totalPages, totalItems, items: workouts } = data
      return { workouts, totalPages, totalItems }
    } else {
      throw {
        isCustomError: true,
        message: message || "Không thể lấy danh sách bài tập của người dùng"
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

export const getWorkoutById = async (
  workoutId: string | undefined
): Promise<WorkoutType> => {
  try {
    const response = await monAPI.get(`/workouts/${workoutId}`)

    const { success, message, data } = response.data

    if (success) {
      return data as WorkoutType
    } else {
      throw {
        isCustomError: true,
        message: message || "Không thể lấy thông tin chi tiết bài tập"
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
