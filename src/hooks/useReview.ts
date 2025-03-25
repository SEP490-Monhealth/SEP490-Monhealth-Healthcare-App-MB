import { useMutation, useQueryClient } from "@tanstack/react-query"

import { useError } from "@/contexts/ErrorContext"
import { useModal } from "@/contexts/ModalContext"

import { CreateReviewType } from "@/schemas/reviewSchema"

import { createReview } from "@/services/reviewService"

export const useCreateReview = () => {
  const queryClient = useQueryClient()
  const handleError = useError()
  const { showModal } = useModal()

  return useMutation<string, Error, CreateReviewType>({
    mutationFn: async (newData) => {
      try {
        return await createReview(newData, showModal)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] })
    }
  })
}
