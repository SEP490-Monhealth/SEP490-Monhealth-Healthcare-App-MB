import { useMutation } from "@tanstack/react-query"

import { useError } from "@/contexts/ErrorContext"
import { useModal } from "@/contexts/ModalContext"

import { CreatePaymentType } from "@/schemas/paymentSchema"

import { createPayment } from "@/services/paymentService"

export const useCreatePayment = () => {
  const handleError = useError()
  const { showModal } = useModal()

  return useMutation<string, Error, CreatePaymentType>({
    mutationFn: async (newData) => {
      try {
        return await createPayment(newData, showModal)
      } catch (error) {
        handleError(error)
        throw error
      }
    }
  })
}
