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

    if (!success) {
      throw { isCustomError: true, message: message }
    }

    const { totalPages, totalItems, items: exercises } = data
    return { exercises, totalPages, totalItems }
  } catch (error: any) {
    const errorMessage = error.response?.data?.message
    throw { isCustomError: true, message: errorMessage }
  }
}

export const getExercisesByWorkoutId = async (
  workoutId: string | undefined
): Promise<WorkoutExerciseType> => {
  try {
    const response = await monAPI.get(`/exercises/workout/${workoutId}`)

    const { success, message, data } = response.data

    if (!success) {
      throw { isCustomError: true, message: message }
    }

    return data as WorkoutExerciseType
  } catch (error: any) {
    const errorMessage = error.response?.data?.message
    throw { isCustomError: true, message: errorMessage }
  }
}

export const getExerciseById = async (
  exerciseId: string | undefined
): Promise<ExerciseType> => {
  try {
    const response = await monAPI.get(`/exercises/${exerciseId}`)

    const { success, message, data } = response.data

    if (!success) {
      throw { isCustomError: true, message: message }
    }

    return data as ExerciseType
  } catch (error: any) {
    const errorMessage = error.response?.data?.message
    throw { isCustomError: true, message: errorMessage }
  }
}
