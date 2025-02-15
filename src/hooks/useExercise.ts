import { useQuery } from "@tanstack/react-query"

import { useError } from "@/contexts/ErrorContext"

import { ExerciseType } from "@/schemas/exerciseSchema"
import { WorkoutExerciseType } from "@/schemas/workoutSchema"

import {
  getExerciseById,
  getExercisesByWorkoutId
} from "@/services/exerciseService"

export const useGetExercisesByWorkoutId = (workoutId: string | undefined) => {
  const handleError = useError()

  return useQuery<WorkoutExerciseType, Error>({
    queryKey: ["exercises", workoutId],
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
    queryKey: ["exercise", exerciseId],
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
