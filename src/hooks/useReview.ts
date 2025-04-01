import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { useError } from "@/contexts/ErrorContext"
import { useModal } from "@/contexts/ModalContext"

import { CreateReviewType, ReviewType } from "@/schemas/reviewSchema"

import {
  createReview,
  getReviewsByConsultantId
} from "@/services/reviewService"

interface ReviewResponse {
  reviews: ReviewType[]
  totalPages: number
  totalItems: number
}

export const useGetReviewsByConsultantId = (
  consultantId: string | undefined,
  page: number,
  limit?: number
) => {
  const handleError = useError()

  return useQuery<ReviewResponse, Error>({
    queryKey: ["reviews", consultantId, page, limit],
    queryFn: async () => {
      try {
        return await getReviewsByConsultantId(consultantId, page, limit)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    enabled: !!consultantId,
    staleTime: 1000 * 60 * 5
  })
}

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
      queryClient.invalidateQueries({ queryKey: ["bookings-user"] })
    }
  })
}
