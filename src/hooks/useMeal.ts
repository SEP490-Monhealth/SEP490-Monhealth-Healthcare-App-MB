import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { useDialog } from "@/contexts/DialogContext"
import { useError } from "@/contexts/ErrorContext"

import { CreateMealType, MealFoodType, MealType } from "@/schemas/mealSchema"

import {
  createMeal,
  getMealById,
  getMealFoodsByMealId,
  getMealsByUserId,
  updateMealFood,
  updateMealFoodStatus
} from "@/services/mealService"

export const useGetMealByUserId = (userId: string | undefined) => {
  const handleError = useError()

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
  const handleError = useError()

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
  const handleError = useError()
  const { showDialog } = useDialog()

  return useMutation<
    { mealId: string; message: string },
    Error,
    CreateMealType
  >({
    mutationFn: async (meal) => {
      try {
        return await createMeal(meal, showDialog)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    onSuccess: (response) => {
      const { mealId } = response

      queryClient.invalidateQueries({ queryKey: ["meals"] })
      // queryClient.invalidateQueries({ queryKey: ["meals", variables.userId] })
      queryClient.invalidateQueries({ queryKey: ["mealFoods", mealId] })
      queryClient.invalidateQueries({ queryKey: ["meal", mealId] })
      queryClient.invalidateQueries({ queryKey: ["dailyMeal"] })
    }
  })
}

export const useGetMealFoodsByMealId = (mealId: string | undefined) => {
  const handleError = useError()

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

export const useUpdateMealFoodQuantity = () => {
  const queryClient = useQueryClient()
  const handleError = useError()

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

export const useUpdateMealFoodStatus = () => {
  const queryClient = useQueryClient()
  const handleError = useError()

  return useMutation<
    string,
    Error,
    { mealFoodId: string; mealId: string; userId: string; date: string }
  >({
    mutationFn: async ({ mealFoodId }) => {
      try {
        return await updateMealFoodStatus(mealFoodId)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    onSuccess: (_, variables) => {
      const { mealId, userId, date } = variables

      queryClient.invalidateQueries({ queryKey: ["meal", mealId] })
      queryClient.invalidateQueries({ queryKey: ["mealFoods", mealId] })
      queryClient.invalidateQueries({ queryKey: ["meals"] })
      queryClient.invalidateQueries({ queryKey: ["dailyMeal", userId, date] })
    }
  })
}
