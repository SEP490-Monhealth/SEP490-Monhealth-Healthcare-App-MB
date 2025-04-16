import { useQuery } from "@tanstack/react-query"

import { MonQueryKey } from "@/constants/query"

import { useError } from "@/contexts/ErrorContext"

import {
  GoalType,
  NutritionGoalType,
  WaterIntakeGoalType,
  WeightGoalType
} from "@/schemas/goalSchema"

import {
  getGoalsByUserId,
  getNutritionGoalByUserId,
  getWaterIntakeGoalByUserId,
  getWeightGoalByUserId,
  getWorkoutGoalByUserId
} from "@/services/goalService"

export const useGetGoalsByUserId = (userId: string | undefined) => {
  const handleError = useError()

  return useQuery<GoalType[], Error>({
    queryKey: [MonQueryKey.Goal.Goals, userId],
    queryFn: async () => {
      try {
        return await getGoalsByUserId(userId)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5
  })
}

export const useGetWeightGoal = (userId: string | undefined) => {
  const handleError = useError()

  return useQuery<WeightGoalType, Error>({
    queryKey: [MonQueryKey.Goal.WeightGoal, userId],
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
    queryKey: [MonQueryKey.Goal.NutritionGoal, userId],
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
    queryKey: [MonQueryKey.Goal.WaterGoal, userId],
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

export const useGetWorkoutGoal = (userId: string | undefined) => {
  const handleError = useError()

  return useQuery<GoalType, Error>({
    queryKey: [MonQueryKey.Goal.WorkoutGoal, userId],
    queryFn: async () => {
      try {
        return await getWorkoutGoalByUserId(userId)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5
  })
}
