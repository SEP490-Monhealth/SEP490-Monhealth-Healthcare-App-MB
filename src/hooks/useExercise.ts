import { useQuery } from "@tanstack/react-query"

import { MonQueryKey } from "@/constants/query"

import { useError } from "@/contexts/ErrorContext"

import { ExerciseType } from "@/schemas/exerciseSchema"
import { WorkoutExerciseType } from "@/schemas/exerciseSchema"

import {
  getAllExercises,
  getExerciseById,
  getExercisesByWorkoutId
} from "@/services/exerciseService"

interface ExerciseResponse {
  exercises: ExerciseType[]
  totalPages: number
  totalItems: number
}

export const useGetAllExercises = (
  page: number,
  limit?: number,
  search?: string,
  status?: boolean
) => {
  const handleError = useError()

  return useQuery<ExerciseResponse, Error>({
    queryKey: [MonQueryKey.Exercise.Exercises, page, limit, search, status],
    queryFn: async () => {
      try {
        return await getAllExercises(page, limit, search, status)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    staleTime: 1000 * 60 * 5
  })
}

export const useGetExercisesByWorkoutId = (workoutId: string | undefined) => {
  const handleError = useError()

  return useQuery<WorkoutExerciseType, Error>({
    queryKey: [MonQueryKey.Exercise.WorkoutExercises, workoutId],
    queryFn: async () => {
      try {
        return await getExercisesByWorkoutId(workoutId)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    enabled: !!workoutId,
    staleTime: 1000 * 60 * 5
  })
}

export const useGetExerciseById = (exerciseId: string | undefined) => {
  const handleError = useError()

  return useQuery<ExerciseType, Error>({
    queryKey: [MonQueryKey.Exercise.Exercise, exerciseId],
    queryFn: async () => {
      try {
        return await getExerciseById(exerciseId)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    enabled: !!exerciseId,
    staleTime: 1000 * 60 * 5
  })
}
