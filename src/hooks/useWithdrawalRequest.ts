import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { MonQueryKey } from "@/constants/query"

import { useError } from "@/contexts/ErrorContext"
import { useModal } from "@/contexts/ModalContext"

import {
  CreateWithdrawalRequestType,
  UpdateWithdrawalRequestType,
  WithdrawalRequestType
} from "@/schemas/withdrawalRequestSchema"

import {
  createWithdrawalRequest,
  deleteWithdrawalRequest,
  getWithdrawalRequestById,
  getWithdrawalRequestsByConsultantId,
  updateWithdrawalRequest
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
    queryKey: [
      MonQueryKey.WithdrawalRequest.WithdrawalRequests,
      consultantId,
      page,
      limit
    ],
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

export const useGetWithdrawalRequestById = (
  withdrawalRequestId: string | undefined
) => {
  const handleError = useError()

  return useQuery<WithdrawalRequestType, Error>({
    queryKey: [
      MonQueryKey.WithdrawalRequest.WithdrawalRequest,
      withdrawalRequestId
    ],
    queryFn: async () => {
      try {
        return await getWithdrawalRequestById(withdrawalRequestId)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    enabled: !!withdrawalRequestId,
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
      queryClient.invalidateQueries({
        queryKey: [MonQueryKey.WithdrawalRequest.WithdrawalRequests]
      })
    }
  })
}

export const useUpdateWithdrawalRequest = () => {
  const queryClient = useQueryClient()
  const handleError = useError()
  const { showModal } = useModal()

  return useMutation<
    string,
    Error,
    { withdrawalRequestId: string; updatedData: UpdateWithdrawalRequestType }
  >({
    mutationFn: async ({ withdrawalRequestId, updatedData }) => {
      try {
        return await updateWithdrawalRequest(
          withdrawalRequestId,
          updatedData,
          showModal
        )
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [MonQueryKey.WithdrawalRequest.WithdrawalRequests]
      })
      queryClient.invalidateQueries({
        queryKey: [MonQueryKey.WithdrawalRequest.WithdrawalRequest]
      })
    }
  })
}

export const useDeleteWithdrawalRequest = () => {
  const queryClient = useQueryClient()
  const handleError = useError()
  const { showModal } = useModal()

  return useMutation<string, Error, string>({
    mutationFn: async (withdrawalRequestId) => {
      try {
        return await deleteWithdrawalRequest(withdrawalRequestId, showModal)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [MonQueryKey.WithdrawalRequest.WithdrawalRequests]
      })
    }
  })
}
