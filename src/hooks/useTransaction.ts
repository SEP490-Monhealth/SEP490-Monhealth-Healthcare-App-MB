import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { MonQueryKey } from "@/constants/query"

import { useError } from "@/contexts/ErrorContext"
import { useModal } from "@/contexts/ModalContext"

import {
  CreateBookingTransactionType,
  CreateSubscriptionTransactionType,
  TransactionType
} from "@/schemas/transactionSchema"

import {
  completeTransaction,
  createBookingTransaction,
  createSubscriptionTransaction,
  getTransactionsByConsultantId,
  getTransactionsByUserId
} from "@/services/transactionService"

interface TransactionListResponse {
  transactions: TransactionType[]
  totalPages: number
  totalItems: number
}

interface TransactionResponse {
  transactionId: string
  userId: string
  orderCode: string
  qrCode: string
  paymentUrl: string
  description: string
  amount: number
}

export const useGetTransactionsByUserId = (
  userId: string | undefined,
  page: number,
  limit?: number
) => {
  const handleError = useError()

  return useQuery<TransactionListResponse, Error>({
    queryKey: [MonQueryKey.Transaction.UserTransactions, userId, page, limit],
    queryFn: async () => {
      try {
        return await getTransactionsByUserId(userId, page, limit)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5
  })
}

export const useGetTransactionsByConsultantId = (
  consultantId: string | undefined,
  page: number,
  limit?: number
) => {
  const handleError = useError()

  return useQuery<TransactionListResponse, Error>({
    queryKey: [
      MonQueryKey.Transaction.ConsultantTransactions,
      consultantId,
      page,
      limit
    ],
    queryFn: async () => {
      try {
        return await getTransactionsByConsultantId(consultantId, page, limit)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    enabled: !!consultantId,
    staleTime: 1000 * 60 * 5
  })
}

export const useCreateBookingTransaction = () => {
  const queryClient = useQueryClient()
  const handleError = useError()
  const { showModal } = useModal()

  return useMutation<
    { message: string; data: TransactionResponse },
    Error,
    CreateBookingTransactionType
  >({
    mutationFn: async (newData) => {
      try {
        return await createBookingTransaction(newData, showModal)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [MonQueryKey.Transaction.UserTransactions]
      })
    }
  })
}

export const useCreateSubscriptionTransaction = () => {
  const queryClient = useQueryClient()
  const handleError = useError()
  const { showModal } = useModal()

  return useMutation<
    { message: string; data: TransactionResponse },
    Error,
    CreateSubscriptionTransactionType
  >({
    mutationFn: async (newData) => {
      try {
        return await createSubscriptionTransaction(newData, showModal)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [MonQueryKey.Transaction.UserTransactions]
      })
    }
  })
}

export const useCompleteTransaction = () => {
  const queryClient = useQueryClient()
  const handleError = useError()
  const { showModal } = useModal()

  return useMutation<string, Error, { orderCode: string }>({
    mutationFn: async ({ orderCode }) => {
      try {
        return await completeTransaction(orderCode, showModal)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [MonQueryKey.Transaction.UserTransactions]
      })
      // refetch remaining booking
    }
  })
}
