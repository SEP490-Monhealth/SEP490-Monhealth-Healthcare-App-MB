import monAPI from "@/lib/monAPI"

import { CreateReviewType, ReviewType } from "@/schemas/reviewSchema"

interface ReviewResponse {
  reviews: ReviewType[]
  totalPages: number
  totalItems: number
}

export const getReviewsByConsultantId = async (
  consultantId: string | undefined,
  page: number,
  limit?: number
): Promise<ReviewResponse> => {
  try {
    const response = await monAPI.get(`/reviews/consultant/${consultantId}`, {
      params: { page, limit }
    })

    const { success, message, data } = response.data

    if (!success) {
      throw { isCustomError: true, message: message }
    }

    const { totalPages, totalItems, items: reviews } = data
    return { reviews, totalPages, totalItems }
  } catch (error: any) {
    const errorMessage = error.response?.data?.message
    throw { isCustomError: true, message: errorMessage }
  }
}

export const createReview = async (
  newData: CreateReviewType,
  showModal: (message: string) => void
): Promise<string> => {
  try {
    const response = await monAPI.post(`/reviews`, newData)
    const { success, message } = response.data

    if (!success) {
      showModal(message)
      throw { isCustomError: true, message: message }
    }

    showModal(message)
    console.log(message)
    return message
  } catch (error: any) {
    const errorMessage = error.response?.data?.message
    showModal(errorMessage)
    throw { isCustomError: true, message: errorMessage }
  }
}
