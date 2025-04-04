import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { useError } from "@/contexts/ErrorContext"
import { useModal } from "@/contexts/ModalContext"

import {
  CreatePaymentType,
  PaymentResponseType,
  PaymentType
} from "@/schemas/paymentSchema"

import { createPayment, getPaymentsByUserId } from "@/services/paymentService"

interface PaymentResponse {
  payments: PaymentType[]
  totalPages: number
  totalItems: number
}

export const useGetPaymentsByUserId = (
  userId: string | undefined,
  page: number,
  limit?: number
) => {
  const handleError = useError()

  return useQuery<PaymentResponse, Error>({
    queryKey: ["payments", userId, page, limit],
    queryFn: async () => {
      try {
        return await getPaymentsByUserId(userId, page, limit)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5
  })
}

export const useCreatePayment = () => {
  const queryClient = useQueryClient()
  const handleError = useError()
  const { showModal } = useModal()

  return useMutation<
    { message: string; data: PaymentResponseType },
    Error,
    CreatePaymentType
  >({
    mutationFn: async (newData) => {
      try {
        return await createPayment(newData, showModal)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payments"] })
    }
  })
}
