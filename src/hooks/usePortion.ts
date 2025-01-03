import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { useErrorHandler } from "@/contexts/ErrorContext"

import { PortionType } from "@/schemas/portionSchema"

import {
  createPortion,
  getPortionByFoodId,
  getPortionById
} from "@/services/portionService"

export const useGetPortionByFoodId = (foodId: string | undefined) => {
  const handleError = useErrorHandler()

  return useQuery<PortionType[], Error>({
    queryKey: ["portion", foodId],
    queryFn: async () => {
      try {
        return await getPortionByFoodId(foodId)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    enabled: !!foodId,
    staleTime: 1000 * 60 * 5
  })
}

export const useGetPortionById = (portionId: string | undefined) => {
  const handleError = useErrorHandler()

  return useQuery<PortionType, Error>({
    queryKey: ["portion", portionId],
    queryFn: async () => {
      try {
        return await getPortionById(portionId)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    enabled: !!portionId,
    staleTime: 1000 * 60 * 5
  })
}

export const useCreatePortion = () => {
  const queryClient = useQueryClient()
  const handleError = useErrorHandler()

  return useMutation<string, Error, PortionType>({
    mutationFn: async (portion) => {
      try {
        return await createPortion(portion)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portions"] })
    }
  })
}

export const useUpdatePortion = (portionId: string | undefined) => {
  const handleError = useErrorHandler()

  return useQuery<PortionType, Error>({
    queryKey: ["portion", portionId],
    queryFn: async () => {
      try {
        return await getPortionById(portionId)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    enabled: !!portionId,
    staleTime: 1000 * 60 * 5
  })
}
