import { useMutation, useQuery } from "@tanstack/react-query"

import { useErrorHandler } from "@/contexts/ErrorContext"

import { CreateFoodType, FoodType, UpdateFoodType } from "@/schemas/foodSchema"

import {
  createFood,
  getAllFoods,
  getFoodById,
  getFoodsByCategory,
  getFoodsByType,
  updateFood
} from "@/services/foodService"

interface FoodResponse {
  foods: FoodType[]
  totalPages: number
  totalItems: number
}

export const useGetAllFoods = (
  page: number,
  limit?: number,
  search?: string,
  category?: string,
  popular?: boolean,
  status?: boolean
) => {
  const handleError = useErrorHandler()

  return useQuery<FoodResponse, Error>({
    queryKey: ["foods", page, limit, search, category, popular, status],
    queryFn: async () => {
      try {
        return await getAllFoods(page, limit, search, category, popular, status)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    staleTime: 1000 * 60 * 5
  })
}

export const useGetFoodsByType = (
  type: string,
  page: number,
  limit: number
) => {
  const handleError = useErrorHandler()

  return useQuery<FoodResponse, Error>({
    queryKey: ["foods", type, page, limit],
    queryFn: async () => {
      try {
        return await getFoodsByType(type, page, limit)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    staleTime: 1000 * 60 * 5
  })
}

export const useGetFoodsByCategory = (
  category: string,
  page: number,
  limit: number
) => {
  const handleError = useErrorHandler()

  return useQuery<FoodResponse, Error>({
    queryKey: ["foods", category, page, limit],
    queryFn: async () => {
      try {
        return await getFoodsByCategory(category, page, limit)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    staleTime: 1000 * 60 * 5
  })
}

export const useGetFoodById = (foodId: string) => {
  const handleError = useErrorHandler()

  return useQuery<FoodType, Error>({
    queryKey: ["food", foodId],
    queryFn: async () => {
      try {
        return await getFoodById(foodId)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    staleTime: 1000 * 60 * 5
  })
}

export const useCreateFood = () => {
  const handleError = useErrorHandler()

  return useMutation<string, Error, CreateFoodType>({
    mutationFn: async (data) => {
      try {
        return await createFood(data)
      } catch (error) {
        handleError(error)
        throw error
      }
    }
  })
}

export const useUpdateFood = () => {
  const handleError = useErrorHandler()

  return useMutation<string, Error, { foodId: string; food: UpdateFoodType }>({
    mutationFn: async ({ foodId, food }) => {
      try {
        return await updateFood(foodId, food)
      } catch (error) {
        handleError(error)
        throw error
      }
    }
  })
}
