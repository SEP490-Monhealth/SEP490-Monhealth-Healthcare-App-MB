import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { useError } from "@/contexts/ErrorContext"
import { useModal } from "@/contexts/ModalContext"

import {
  CreateFoodType,
  FoodType,
  FoodUserType,
  UpdateFoodType
} from "@/schemas/foodSchema"

import {
  createFood,
  createUserFood,
  getAllFoods,
  getFoodById,
  getFoodsByType,
  getFoodsByUserId,
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
  type?: string,
  category?: string,
  popular?: boolean,
  status?: boolean
) => {
  const handleError = useError()

  return useQuery<FoodResponse, Error>({
    queryKey: ["foods", page, limit, search, type, category, popular, status],
    queryFn: async () => {
      try {
        return await getAllFoods(
          page,
          limit,
          search,
          type,
          category,
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

export const useGetFoodsByType = (
  type: string,
  page: number,
  limit: number
) => {
  const handleError = useError()

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
    mutationFn: async (newFoodData) => {
      try {
        return await createFood(newFoodData, showModal)
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

export const useCreateUserFoods = (userId: string | undefined) => {
  const queryClient = useQueryClient()
  const handleError = useError()

  return useMutation<string, Error, FoodUserType>({
    mutationFn: async (newUserFoodsData) => {
      try {
        return await createUserFood(userId, newUserFoodsData)
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

export const useUpdateFood = () => {
  const queryClient = useQueryClient()
  const handleError = useError()
  const { showModal } = useModal()

  return useMutation<
    string,
    Error,
    { foodId: string; foodData: UpdateFoodType }
  >({
    mutationFn: async ({ foodId, foodData }) => {
      try {
        return await updateFood(foodId, foodData, showModal)
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
