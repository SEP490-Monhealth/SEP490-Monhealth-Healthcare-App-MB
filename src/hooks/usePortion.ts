import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { useDialog } from "@/contexts/DialogContext"
import { useError } from "@/contexts/ErrorContext"

import { CreatePortionType, PortionType } from "@/schemas/portionSchema"

import {
  createPortion,
  getPortionByFoodId,
  getPortionById
} from "@/services/portionService"

export const useGetPortionByFoodId = (foodId: string | undefined) => {
  const handleError = useError()

  return useQuery<PortionType[], Error>({
    queryKey: ["portions", foodId],
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
  const handleError = useError()

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
  const handleError = useError()
  const { showDialog } = useDialog()

  return useMutation<string, Error, CreatePortionType>({
    mutationFn: async (portion) => {
      try {
        return await createPortion(portion, showDialog)
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
