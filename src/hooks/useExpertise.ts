import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { MonQueryKey } from "@/constants/query"

import { useError } from "@/contexts/ErrorContext"
import { useModal } from "@/contexts/ModalContext"

import { ExpertiseType, ExpertiseUpdateType } from "@/schemas/expertiseSchema"

import { getAllExpertise, updateExpertise } from "@/services/expertiseService"

interface ExpertiseResponse {
  expertise: ExpertiseType[]
  totalPages: number
  totalItems: number
}

export const useGetAllExpertise = (page: number, limit?: number) => {
  const handleError = useError()

  return useQuery<ExpertiseResponse, Error>({
    queryKey: [MonQueryKey.Expertise.Expertise, page, limit],
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

export const useUpdateExpertise = () => {
  const queryClient = useQueryClient()
  const handleError = useError()
  const { showModal } = useModal()

  return useMutation<
    string,
    Error,
    {
      consultantId: string | undefined
      updatedData: ExpertiseUpdateType
    }
  >({
    mutationFn: async ({ consultantId, updatedData }) => {
      try {
        return await updateExpertise(consultantId, updatedData, showModal)
      } catch (error) {
        handleError(error)
        throw error
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [MonQueryKey.Expertise.Expertise]
      })
      queryClient.invalidateQueries({
        queryKey: [MonQueryKey.Certificate.Certificates]
      })
    }
  })
}
