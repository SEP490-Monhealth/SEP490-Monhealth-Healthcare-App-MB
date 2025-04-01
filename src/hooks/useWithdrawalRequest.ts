import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { useError } from "@/contexts/ErrorContext"
import { useModal } from "@/contexts/ModalContext"

import {
  CreateWithdrawalRequestType,
  WithdrawalRequestType
} from "@/schemas/withdrawalRequestSchema"

import {
  createWithdrawalRequest,
  getWithdrawalRequestsByConsultantId
} from "@/services/withdrawalRequestService"

interface WithdrawalRequestResponse {
  withdrawalRequests: WithdrawalRequestType[]
  totalPages: number
  totalItems: number
}

export const useGetWithdrawalRequestsByConsultantId = (
  consultantId: string | undefined,
  page: number,
  limit?: number
) => {
  const handleError = useError()

  return useQuery<WithdrawalRequestResponse, Error>({
    queryKey: ["withdrawal-requests", consultantId, page, limit],
    queryFn: async () => {
      try {
        return await getWithdrawalRequestsByConsultantId(
          consultantId,
          page,
          limit
        )
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    enabled: !!consultantId,
    staleTime: 1000 * 60 * 5
  })
}

export const useCreateWithdrawalRequest = () => {
  const queryClient = useQueryClient()
  const handleError = useError()
  const { showModal } = useModal()

  return useMutation<string, Error, CreateWithdrawalRequestType>({
    mutationFn: async (newData) => {
      try {
        return await createWithdrawalRequest(newData, showModal)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["withdrawal-requests"] })
    }
  })
}
