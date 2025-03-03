import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { useError } from "@/contexts/ErrorContext"
import { useModal } from "@/contexts/ModalContext"

import {
  CreateExerciseType,
  ExerciseType,
  UpdateExerciseType
} from "@/schemas/exerciseSchema"
import { WorkoutExerciseType } from "@/schemas/workoutSchema"

import {
  createExercise,
  deleteExercise,
  getAllExercises,
  getExerciseById,
  getExercisesByUserId,
  getExercisesByWorkoutId,
  updateExercise
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
    queryKey: ["exercisesAll", page, limit, search, status],
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

export const useGetExercisesByUserId = (
  userId: string | undefined,
  page: number,
  limit: number
) => {
  const handleError = useError()

  return useQuery<ExerciseResponse, Error>({
    queryKey: ["exerciseUser", userId, page, limit],
    queryFn: async () => {
      try {
        return await getExercisesByUserId(userId, page, limit)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5
  })
}

export const useCreateExercise = () => {
  const queryClient = useQueryClient()
  const handleError = useError()
  const { showModal } = useModal()

  return useMutation<string, Error, CreateExerciseType>({
    mutationFn: async (newExercise) => {
      try {
        return await createExercise(newExercise, showModal)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exercisesAll"] })
      queryClient.invalidateQueries({ queryKey: ["exerciseUser"] })
    }
  })
}

export const useUpdateExercise = () => {
  const queryClient = useQueryClient()
  const handleError = useError()
  const { showModal } = useModal()

  return useMutation<
    string,
    Error,
    { exerciseId: string; exerciseData: UpdateExerciseType }
  >({
    mutationFn: async ({ exerciseId, exerciseData }) => {
      try {
        return await updateExercise(exerciseId, exerciseData, showModal)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    onSuccess: (_data, { exerciseId }) => {
      queryClient.invalidateQueries({
        queryKey: ["exercise", exerciseId]
      })
      queryClient.invalidateQueries({ queryKey: ["exercisesAll"] })
      queryClient.invalidateQueries({ queryKey: ["exerciseUser"] })
    }
  })
}

export const useDeleteExercise = () => {
  const queryClient = useQueryClient()
  const handleError = useError()

  return useMutation<string, Error, string>({
    mutationFn: async (exerciseId) => {
      try {
        return await deleteExercise(exerciseId)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exercisesAll"] })
      queryClient.invalidateQueries({ queryKey: ["exerciseUser"] })
    }
  })
}
