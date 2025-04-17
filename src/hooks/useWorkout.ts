import { useQuery } from "@tanstack/react-query"

import { DifficultyLevelEnum } from "@/constants/enum/Workout"

import { useError } from "@/contexts/ErrorContext"

import { WorkoutType } from "@/schemas/workoutSchema"

import { getAllWorkouts, getWorkoutById } from "@/services/workoutService"

interface WorkoutResponse {
  workouts: WorkoutType[]
  totalPages: number
  totalItems: number
}

export const useGetAllWorkouts = (
  page: number,
  limit?: number,
  category?: string,
  search?: string,
  difficulty?: DifficultyLevelEnum | undefined,
  popular?: boolean,
  status?: boolean
) => {
  const handleError = useError()

  return useQuery<WorkoutResponse, Error>({
    queryKey: [
      "workouts",
      page,
      limit,
      category,
      search,
      difficulty,
      popular,
      status
    ],
    queryFn: async () => {
      try {
        return await getAllWorkouts(
          page,
          limit,
          category,
          search,
          difficulty,
          popular,
          status
        )
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    staleTime: 1000 * 60 * 5
  })
}

export const useGetWorkoutById = (workoutId: string | undefined) => {
  const handleError = useError()

  return useQuery<WorkoutType, Error>({
    queryKey: ["workout", workoutId],
    queryFn: async () => {
      try {
        return await getWorkoutById(workoutId)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    enabled: !!workoutId,
    staleTime: 1000 * 60 * 5
  })
}
