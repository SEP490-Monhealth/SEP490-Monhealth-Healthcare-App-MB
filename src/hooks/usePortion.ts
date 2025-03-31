import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { useError } from "@/contexts/ErrorContext"
import { useModal } from "@/contexts/ModalContext"

import { CreatePortionType, PortionType } from "@/schemas/portionSchema"

import { createPortion, getPortionByFoodId } from "@/services/portionService"

interface PortionsResponse {
  totalPages: number
  totalItems: number
  portions: PortionType[]
}

export const useGetPortionByFoodId = (
  foodId: string | undefined,
  page: number,
  limit?: number,
  search?: string,
  sort?: boolean,
  order?: boolean
) => {
  const handleError = useError()

  return useQuery<PortionsResponse, Error>({
    queryKey: ["portions", foodId, page, limit, search, sort, order],
    queryFn: async () => {
      try {
        return await getPortionByFoodId(
          foodId,
          page,
          limit,
          search,
          sort,
          order
        )
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
    mutationFn: async (newData) => {
      try {
        return await createPortion(newData, showModal)
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
