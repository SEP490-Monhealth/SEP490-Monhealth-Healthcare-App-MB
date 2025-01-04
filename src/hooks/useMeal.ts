import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { useErrorHandler } from "@/contexts/ErrorContext"

import { CreateMealType, MealFoodType, MealType } from "@/schemas/mealSchema"

import {
  createMeal,
  getMealById,
  getMealFoodsByMealId,
  getMealsByUserId,
  updateMealFood
} from "@/services/mealService"

export const useGetMealByUserId = (userId: string | undefined) => {
  const handleError = useErrorHandler()

  return useQuery<MealType[], Error>({
    queryKey: ["meals", userId],
    queryFn: async () => {
      try {
        return await getMealsByUserId(userId)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    staleTime: 1000 * 60 * 5
  })
}

export const useGetMealById = (mealId: string | undefined) => {
  const handleError = useErrorHandler()

  return useQuery<MealType, Error>({
    queryKey: ["meal", mealId],
    queryFn: async () => {
      try {
        return await getMealById(mealId)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    enabled: !!mealId,
    staleTime: 1000 * 60 * 5
  })
}

export const useCreateMeal = () => {
  const queryClient = useQueryClient()
  const handleError = useErrorHandler()

  return useMutation<string, Error, CreateMealType>({
    mutationFn: async (meal) => {
      try {
        return await createMeal(meal)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["meals", variables.userId] })
      queryClient.invalidateQueries({ queryKey: ["dailyMeal"] })
    }
  })
}

export const useGetMealFoodsByMealId = (mealId: string | undefined) => {
  const handleError = useErrorHandler()

  return useQuery<MealFoodType[], Error>({
    queryKey: ["mealFoods", mealId],
    queryFn: async () => {
      try {
        return await getMealFoodsByMealId(mealId)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    enabled: !!mealId,
    staleTime: 1000 * 60 * 5
  })
}

export const useUpdateMealFood = () => {
  const queryClient = useQueryClient()
  const handleError = useErrorHandler()

  return useMutation<string, Error, { mealFoodId: string; quantity: number }>({
    mutationFn: async ({ mealFoodId, quantity }) => {
      try {
        return await updateMealFood(mealFoodId, quantity)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["meals", variables.mealFoodId]
      })
    }
  })
}
