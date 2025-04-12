import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { useError } from "@/contexts/ErrorContext"
import { useModal } from "@/contexts/ModalContext"

import {
  ExpertiseType,
  UpdateExpertiseConsultantType
} from "@/schemas/expertiseSchema"

import {
  getAllExpertise,
  updateExpertiseByConsultantId
} from "@/services/expertiseService"

interface ExpertiseResponse {
  expertise: ExpertiseType[]
  totalPages: number
  totalItems: number
}

export const useGetAllExpertise = (page: number, limit?: number) => {
  const handleError = useError()

  return useQuery<ExpertiseResponse, Error>({
    queryKey: ["expertise", page, limit],
    queryFn: async () => {
      try {
        return await getAllExpertise(page, limit)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    staleTime: 1000 * 60 * 5
  })
}

export const useUpdateConsultantBank = () => {
  const queryClient = useQueryClient()
  const handleError = useError()
  const { showModal } = useModal()

  return useMutation<
    string,
    Error,
    {
      consultantId: string | undefined
      updatedData: UpdateExpertiseConsultantType
    }
  >({
    mutationFn: async ({ consultantId, updatedData }) => {
      try {
        return await updateExpertiseByConsultantId(
          consultantId,
          updatedData,
          showModal
        )
      } catch (error) {
        handleError(error)
        throw error
      }
    },

    onSuccess: (_, { consultantId }) => {
      if (consultantId) {
        queryClient.invalidateQueries({ queryKey: ["expertise"] })
      }
    }
  })
}
