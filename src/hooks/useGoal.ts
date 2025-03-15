import { useQuery } from "@tanstack/react-query"

import { useError } from "@/contexts/ErrorContext"

import {
  GoalType,
  NutritionGoalType,
  WaterIntakeGoalType,
  WeightGoalType
} from "@/schemas/goalSchema"

import {
  getGoalById,
  getGoalByUserId,
  getNutritionGoalByUserId,
  getWaterIntakeGoalByUserId,
  getWeightGoalByUserId
} from "@/services/goalService"

export const useGetGoalByUserId = (userId: string | undefined) => {
  const handleError = useError()

  return useQuery<GoalType[], Error>({
    queryKey: ["goals", userId],
    queryFn: async () => {
      try {
        return await getGoalByUserId(userId)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5
  })
}

export const useGetGoalById = (goalId: string | undefined) => {
  const handleError = useError()

  return useQuery<GoalType, Error>({
    queryKey: ["goal", goalId],
    queryFn: async () => {
      try {
        return await getGoalById(goalId)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    enabled: !!goalId,
    staleTime: 1000 * 60 * 5
  })
}

export const useGetWeightGoal = (userId: string | undefined) => {
  const handleError = useError()

  return useQuery<WeightGoalType, Error>({
    queryKey: ["weight-goal", userId],
    queryFn: async () => {
      try {
        return await getWeightGoalByUserId(userId)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5
  })
}

export const useGetNutritionGoal = (userId: string | undefined) => {
  const handleError = useError()

  return useQuery<NutritionGoalType, Error>({
    queryKey: ["nutrition-goal", userId],
    queryFn: async () => {
      try {
        return await getNutritionGoalByUserId(userId)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5
  })
}

export const useGetWaterIntakeGoal = (userId: string | undefined) => {
  const handleError = useError()

  return useQuery<WaterIntakeGoalType, Error>({
    queryKey: ["water-goal", userId],
    queryFn: async () => {
      try {
        return await getWaterIntakeGoalByUserId(userId)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5
  })
}
