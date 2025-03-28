import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { useError } from "@/contexts/ErrorContext"
import { useModal } from "@/contexts/ModalContext"

import { CreateFoodType, FoodType } from "@/schemas/foodSchema"

import {
  createFood,
  getAllFoods,
  getFoodById,
  getFoodsByUserId
} from "@/services/foodService"

interface FoodResponse {
  foods: FoodType[]
  totalPages: number
  totalItems: number
}

export const useGetAllFoods = (
  page: number,
  limit: number,
  category?: string,
  search?: string,
  isPublic?: boolean,
  popular?: boolean,
  status?: boolean
) => {
  const handleError = useError()

  return useQuery<FoodResponse, Error>({
    queryKey: [
      "foods",
      page,
      limit,
      category,
      search,
      isPublic,
      popular,
      status
    ],
    queryFn: async () => {
      try {
        return await getAllFoods(
          page,
          limit,
          category,
          search,
          isPublic,
          popular,
          status
        )
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    staleTime: 1000 * 60 * 5
  })
}

export const useGetFoodsByUserId = (
  userId: string | undefined,
  page: number,
  limit: number
) => {
  const handleError = useError()

  return useQuery<FoodResponse, Error>({
    queryKey: ["foods", userId, page, limit],
    queryFn: async () => {
      try {
        return await getFoodsByUserId(userId, page, limit)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5
  })
}

export const useGetFoodById = (foodId: string) => {
  const handleError = useError()

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
  const queryClient = useQueryClient()
  const handleError = useError()
  const { showModal } = useModal()

  return useMutation<string, Error, CreateFoodType>({
    mutationFn: async (newData) => {
      try {
        return await createFood(newData, showModal)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["foods"] })
    }
  })
}
