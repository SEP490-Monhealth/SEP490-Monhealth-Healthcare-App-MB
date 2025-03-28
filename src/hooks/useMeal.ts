import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

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
    onSuccess: (_, variables) => {
      //   queryClient.invalidateQueries({
      //     queryKey: ["mealFoods", variables.mealFoodId]
      //   })
      //   queryClient.invalidateQueries({ queryKey: ["meals"] })
      // }

      const { mealId, userId, today } = variables

      queryClient.invalidateQueries({ queryKey: ["meals"] })
      queryClient.invalidateQueries({ queryKey: ["meal", mealId] })
      queryClient.invalidateQueries({ queryKey: ["mealFoods", mealId] })
      queryClient.invalidateQueries({ queryKey: ["dailyMeal", userId, today] })
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
    onSuccess: (_, variables) => {
      const { mealId, userId, today } = variables

      queryClient.invalidateQueries({ queryKey: ["meals"] })
      queryClient.invalidateQueries({ queryKey: ["meal", mealId] })
      queryClient.invalidateQueries({ queryKey: ["mealFoods", mealId] })
      queryClient.invalidateQueries({ queryKey: ["dailyMeal", userId, today] })
    }
  })
}
