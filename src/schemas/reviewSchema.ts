import { z } from "zod"

import { auditSchema } from "./commonSchema"

const baseReviewSchema = z
  .object({
    reviewId: z.string(),
    bookingId: z.string(),
    consultantId: z.string(),
    userId: z.string(),

    rating: z
      .number()
      .int({ message: "Điểm đánh giá phải là số nguyên" })
      .min(1, { message: "Điểm đánh giá tối thiểu là 1" })
      .max(5, { message: "Điểm đánh giá tối đa là 5" }),
    comment: z
      .string()
      .nonempty({ message: "Nội dung đánh giá không được để trống" })
      .max(500, { message: "Nội dung đánh giá không được vượt quá 500 ký tự" })
  })
  .merge(auditSchema)

const reviewSchema = baseReviewSchema

export const createReviewSchema = reviewSchema.pick({
  bookingId: true,
  consultantId: true,
  userId: true,
  rating: true,
  comment: true
})

export type ReviewType = z.infer<typeof reviewSchema>
export type CreateReviewType = z.infer<typeof createReviewSchema>
