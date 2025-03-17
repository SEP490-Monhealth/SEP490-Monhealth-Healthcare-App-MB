import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { DifficultyLevelEnum } from "@/constants/enum/Workout"

import { useError } from "@/contexts/ErrorContext"
import { useModal } from "@/contexts/ModalContext"

import { CreateWorkoutType, WorkoutType } from "@/schemas/workoutSchema"

import {
  createWorkout,
  getAllWorkouts,
  getWorkoutById,
  getWorkoutsByUserId
} from "@/services/workoutService"

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

export const useGetWorkoutsByUserId = (
  userId: string | undefined,
  page: number,
  limit: number
) => {
  const handleError = useError()

  return useQuery<WorkoutResponse, Error>({
    queryKey: ["workouts", userId, page, limit],
    queryFn: async () => {
      try {
        return await getWorkoutsByUserId(userId, page, limit)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5
  })
}

export const useCreateUserWorkout = () => {
  const queryClient = useQueryClient()
  const handleError = useError()
  const { showModal } = useModal()

  return useMutation<string, Error, CreateWorkoutType>({
    mutationFn: async (newWorkoutData) => {
      try {
        return await createWorkout(newWorkoutData, showModal)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workouts"] })
    }
  })
}
