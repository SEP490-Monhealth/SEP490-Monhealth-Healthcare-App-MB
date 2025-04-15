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

    if (!success) {
      throw { isCustomError: true, message: message }
    }

    const { totalPages, totalItems, items: workouts } = data
    return { workouts, totalPages, totalItems }
  } catch (error: any) {
    throw {
      isCustomError: true,
      message: error.message || "Đã xảy ra lỗi không mong muốn"
    }
  }
}

export const getWorkoutsByUserId = async (
  userId: string | undefined,
  page: number,
  limit?: number
): Promise<WorkoutResponse> => {
  try {
    const response = await monAPI.get(`/workouts/user/${userId}`, {
      params: { page, limit }
    })

    const { success, message, data } = response.data

    if (!success) {
      throw { isCustomError: true, message: message }
    }

    const { totalPages, totalItems, items: workouts } = data
    return { workouts, totalPages, totalItems }
  } catch (error: any) {
    throw {
      isCustomError: true,
      message: error.message || "Đã xảy ra lỗi không mong muốn"
    }
  }
}

export const getWorkoutById = async (
  workoutId: string | undefined
): Promise<WorkoutType> => {
  try {
    const response = await monAPI.get(`/workouts/${workoutId}`)

    const { success, message, data } = response.data

    if (!success) {
      throw { isCustomError: true, message: message }
    }

    return data as WorkoutType
  } catch (error: any) {
    throw {
      isCustomError: true,
      message: error.message || "Đã xảy ra lỗi không mong muốn"
    }
  }
}
