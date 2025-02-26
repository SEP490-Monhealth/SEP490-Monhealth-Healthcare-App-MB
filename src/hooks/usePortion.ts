import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { useError } from "@/contexts/ErrorContext"
import { useModal } from "@/contexts/ModalContext"

import { CreatePortionType, PortionType } from "@/schemas/portionSchema"

import { createPortion, getPortionByFoodId } from "@/services/portionService"

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

export const useCreatePortion = () => {
  const queryClient = useQueryClient()
  const handleError = useError()
  const { showModal } = useModal()

  return useMutation<string, Error, CreatePortionType>({
    mutationFn: async (newPortionData) => {
      try {
        return await createPortion(newPortionData, showModal)
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
