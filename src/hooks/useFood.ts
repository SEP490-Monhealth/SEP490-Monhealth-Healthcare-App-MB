import { useQuery } from "@tanstack/react-query"

import { useErrorHandler } from "@/contexts/ErrorContext"

import { FoodType } from "@/schemas/foodSchema"

import {
  getAllFoods,
  getFoodById,
  getFoodsByCategory,
  getFoodsByType
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
  status?: boolean
) => {
  const handleError = useErrorHandler()

  return useQuery<FoodResponse, Error>({
    queryKey: ["foods", page, limit, search, status],
    queryFn: async () => {
      try {
        return await getAllFoods(page, limit, search, status)
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
