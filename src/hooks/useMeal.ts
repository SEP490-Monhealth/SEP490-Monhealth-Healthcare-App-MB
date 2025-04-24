import { useRouter } from "expo-router"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { MonQueryKey } from "@/constants/query"

import { useError } from "@/contexts/ErrorContext"
import { useModal } from "@/contexts/ModalContext"

import { CreateMealType, MealFoodType, MealType } from "@/schemas/mealSchema"

import {
  createMeal,
  getMealById,
  getMealFoodsByMealId,
  getMealsByUserId,
  updateMealFoodQuantity,
  updateMealFoodStatus
} from "@/services/mealService"

export const useGetMealsByUserId = (userId: string | undefined) => {
  const router = useRouter()
  const handleError = useError()

  return useQuery<MealType[] | null, Error>({
    queryKey: [MonQueryKey.Meal.Meals, userId],
    queryFn: async () => {
      try {
        return await getMealsByUserId(userId, router)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5
  })
}

export const useGetMealById = (mealId: string | undefined) => {
  const router = useRouter()
  const handleError = useError()

  return useQuery<MealType | null, Error>({
    queryKey: [MonQueryKey.Meal.Meal, mealId],
    queryFn: async () => {
      try {
        return await getMealById(mealId, router)
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
  const { showModal } = useModal()

  return useMutation<
    { mealId: string; message: string },
    Error,
    CreateMealType
  >({
    mutationFn: async (newData) => {
      try {
        return await createMeal(newData, showModal)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [MonQueryKey.Meal.Meals] })
      queryClient.invalidateQueries({ queryKey: [MonQueryKey.Meal.MealFoods] })
      queryClient.invalidateQueries({ queryKey: [MonQueryKey.Meal.Meal] })
      queryClient.invalidateQueries({ queryKey: [MonQueryKey.Meal.DailyMeal] })
      queryClient.invalidateQueries({
        queryKey: [MonQueryKey.Tracker.WeeklyMeal]
      })
    }
  })
}

export const useGetMealFoodsByMealId = (mealId: string | undefined) => {
  const router = useRouter()
  const handleError = useError()

  return useQuery<MealFoodType[] | null, Error>({
    queryKey: [MonQueryKey.Meal.MealFoods, mealId],
    queryFn: async () => {
      try {
        return await getMealFoodsByMealId(mealId, router)
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

  return useMutation<
    string,
    Error,
    {
      mealFoodId: string
      quantity: number
      mealId: string
      userId: string
      today: string
    }
  >({
    mutationFn: async ({ mealFoodId, quantity }) => {
      try {
        return await updateMealFoodQuantity(mealFoodId, quantity)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [MonQueryKey.Meal.Meals] })
      queryClient.invalidateQueries({ queryKey: [MonQueryKey.Meal.Meal] })
      queryClient.invalidateQueries({ queryKey: [MonQueryKey.Meal.MealFoods] })
      queryClient.invalidateQueries({ queryKey: [MonQueryKey.Meal.DailyMeal] })
      queryClient.invalidateQueries({
        queryKey: [MonQueryKey.Tracker.WeeklyMeal]
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
    { mealFoodId: string; mealId: string; userId: string; today: string }
  >({
    mutationFn: async ({ mealFoodId }) => {
      try {
        return await updateMealFoodStatus(mealFoodId)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [MonQueryKey.Meal.Meals] })
      queryClient.invalidateQueries({ queryKey: [MonQueryKey.Meal.Meal] })
      queryClient.invalidateQueries({ queryKey: [MonQueryKey.Meal.MealFoods] })
      queryClient.invalidateQueries({ queryKey: [MonQueryKey.Meal.DailyMeal] })
      queryClient.invalidateQueries({
        queryKey: [MonQueryKey.Tracker.WeeklyMeal]
      })
      queryClient.invalidateQueries({
        queryKey: [MonQueryKey.Activity.DailyActivity]
      })
    }
  })
}
