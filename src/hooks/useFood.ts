import { useQuery } from "@tanstack/react-query"

import { FoodType } from "@/schemas/foodSchema"

import {
  getAllFoods,
  getFoodById,
  getFoodsByCategory
} from "@/services/foodService"

interface FoodResponse {
  foods: FoodType[]
  totalPages: number
  totalItems: number
}

export const useGetAllFoods = (
  page: number,
  limit: number,
  search?: string,
  status?: boolean
) => {
  return useQuery<FoodResponse, Error>({
    queryKey: ["foods", page, limit, search, status],
    queryFn: () => getAllFoods(page, limit, search, status),
    staleTime: 1000 * 60 * 5
  })
}

export const useGetFoodsByType = (
  type: string,
  page: number,
  limit: number
) => {
  return useQuery<FoodResponse, Error>({
    queryKey: ["foods", type, page, limit],
    queryFn: () => getFoodsByCategory(type, page, limit),
    staleTime: 1000 * 60 * 5
  })
}

export const useGetFoodsByCategory = (
  category: string,
  page: number,
  limit: number
) => {
  return useQuery<FoodResponse, Error>({
    queryKey: ["foods", category, page, limit],
    queryFn: () => getFoodsByCategory(category, page, limit),
    staleTime: 1000 * 60 * 5
  })
}

export const useGetFoodById = (userId: string) => {
  return useQuery<FoodType, Error>({
    queryKey: ["user", userId],
    queryFn: () => getFoodById(userId),
    staleTime: 1000 * 60 * 5
  })
}
