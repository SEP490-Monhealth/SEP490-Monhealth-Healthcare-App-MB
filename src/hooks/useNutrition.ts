import { useQuery, useQueryClient } from "@tanstack/react-query"

import { useErrorHandler } from "@/contexts/ErrorContext"

import { NutritionType } from "@/schemas/nutritionSchema"

import {
  getNutritionByFoodId,
  getNutritionById
} from "@/services/nutritionService"

export const useGetNutritionByFoodId = (foodId: string) => {
  const handleError = useErrorHandler()

  return useQuery<NutritionType, Error>({
    queryKey: ["nutrition", foodId],
    queryFn: async () => {
      try {
        return await getNutritionByFoodId(foodId)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    staleTime: 1000 * 60 * 5
  })
}

export const useGetNutritionById = (nutritionId: string) => {
  const handleError = useErrorHandler()

  return useQuery<NutritionType, Error>({
    queryKey: ["nutrition", nutritionId],
    queryFn: async () => {
      try {
        return await getNutritionById(nutritionId)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    staleTime: 1000 * 60 * 5
  })
}

export const useUpdateNutrition = (nutritionId: string) => {
  const queryClient = useQueryClient()
  const handleError = useErrorHandler()

  return useQuery<NutritionType, Error>({
    queryKey: ["nutrition", nutritionId],
    queryFn: async () => {
      try {
        return await getNutritionById(nutritionId)
      } catch (error) {
        handleError(error)
        throw error
      }
    }
  })
}
