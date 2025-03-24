import axios from "axios"

import monAPI from "@/lib/monAPI"

import { ExerciseType } from "@/schemas/exerciseSchema"
import { WorkoutExerciseType } from "@/schemas/exerciseSchema"

interface ExerciseResponse {
  exercises: ExerciseType[]
  totalPages: number
  totalItems: number
}

export const getAllExercises = async (
  page: number,
  limit?: number,
  search?: string,
  status?: boolean
): Promise<ExerciseResponse> => {
  try {
    const response = await monAPI.get(`/exercises`, {
      params: { page, limit, search, status }
    })

    const { success, message, data } = response.data

    if (success) {
      const { totalPages, totalItems, items: exercises } = data
      return { exercises, totalPages, totalItems }
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

export const getExercisesByWorkoutId = async (
  workoutId: string | undefined
): Promise<WorkoutExerciseType> => {
  try {
    const response = await monAPI.get(`/exercises/workout/${workoutId}`)

    const { success, message, data } = response.data

    if (success) {
      return data as WorkoutExerciseType
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

export const getExerciseById = async (
  exerciseId: string | undefined
): Promise<ExerciseType> => {
  try {
    const response = await monAPI.get(`/exercises/${exerciseId}`)

    const { success, message, data } = response.data

    if (success) {
      return data as ExerciseType
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

export const getExercisesByUserId = async (
  userId: string | undefined,
  page: number,
  limit: number
): Promise<ExerciseResponse> => {
  try {
    const response = await monAPI.get(`/exercises/user/${userId}`, {
      params: { page, limit }
    })

    const { success, message, data } = response.data

    if (success) {
      const { totalPages, totalItems, items: exercises } = data
      return { exercises, totalPages, totalItems }
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
