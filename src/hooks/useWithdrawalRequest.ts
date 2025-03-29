import { useMutation, useQueryClient } from "@tanstack/react-query"

import { useError } from "@/contexts/ErrorContext"
import { useModal } from "@/contexts/ModalContext"

import { CreateWithdrawalRequestType } from "@/schemas/withdrawalRequestSchema"

import {
  createWithdrawalRequest,
  getWithdrawalRequestsByConsultantId
} from "@/services/withdrawalRequestService"

export const useGetWithdrawalRequestsByConsultantId = (
  consultantId: string | undefined,
  page: number,
  limit?: number
) => {
  const queryClient = useQueryClient()
  const handleError = useError()

  return useMutation({
    mutationFn: async () => {
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["withdrawalRequests"] })
    }
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
      queryClient.invalidateQueries({ queryKey: ["withdrawalRequest"] })
    }
  })
}
