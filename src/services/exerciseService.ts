import axios from "axios"

import monAPI from "@/lib/monAPI"

import { ExerciseType } from "@/schemas/exerciseSchema"
import { WorkoutExerciseType } from "@/schemas/workoutSchema"

export const getExercisesByWorkoutId = async (
  workoutId: string | undefined
): Promise<WorkoutExerciseType> => {
  try {
    const response = await monAPI.get(`/exercises/workout/${workoutId}`)

    if (!response || !response.data) {
      throw {
        isCustomError: true,
        message:
          "Không nhận được phản hồi từ máy chủ. Có thể máy chủ đang gặp sự cố hoặc kết nối mạng của bạn bị gián đoạn"
      }
    }

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

    if (!response || !response.data) {
      throw {
        isCustomError: true,
        message:
          "Không nhận được phản hồi từ máy chủ. Có thể máy chủ đang gặp sự cố hoặc kết nối mạng của bạn bị gián đoạn"
      }
    }

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
