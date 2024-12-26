import { useQuery } from "@tanstack/react-query"

import { useErrorHandler } from "@/contexts/ErrorContext"

import { PortionType } from "@/schemas/portionSchema"

import { getPortionByFoodId, getPortionById } from "@/services/portionService"

export const useGetPortionById = (portionId: string) => {
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
    staleTime: 1000 * 60 * 5
  })
}

export const useGetPortionByFoodId = (foodId: string) => {
  const handleError = useErrorHandler()

  return useQuery<PortionType, Error>({
    queryKey: ["portion", foodId],
    queryFn: async () => {
      try {
        return await getPortionByFoodId(foodId)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    staleTime: 1000 * 60 * 5
  })
}

export const useUpdatePortion = (portionId: string) => {
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
    staleTime: 1000 * 60 * 5
  })
}
