import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { TransactionStatusEnum } from "@/constants/enum/Transaction"
import { MonQueryKey } from "@/constants/query"

import { useError } from "@/contexts/ErrorContext"
import { useModal } from "@/contexts/ModalContext"

import {
  CreateBookingTransactionType,
  CreateSubscriptionTransactionType,
  TransactionType
} from "@/schemas/transactionSchema"

import {
  createBookingTransaction,
  createSubscriptionTransaction,
  getTransactionById,
  getTransactionStatusById,
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

export const useGetTransactionById = (transactionId: string | undefined) => {
  const handleError = useError()

  return useQuery<TransactionType, Error>({
    queryKey: [MonQueryKey.Transaction.Transaction, transactionId],
    queryFn: async () => {
      try {
        return await getTransactionById(transactionId)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    enabled: !!transactionId,
    staleTime: 1000 * 60 * 5
  })
}

export const useGetTransactionStatusById = (
  transactionId: string | undefined
) => {
  const handleError = useError()

  return useQuery<{ status: TransactionStatusEnum }, Error>({
    queryKey: [MonQueryKey.Transaction.TransactionStatus, transactionId],
    queryFn: async () => {
      try {
        return await getTransactionStatusById(transactionId)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    enabled: !!transactionId,
    refetchInterval: 2000,
    refetchIntervalInBackground: true,
    staleTime: 0
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
