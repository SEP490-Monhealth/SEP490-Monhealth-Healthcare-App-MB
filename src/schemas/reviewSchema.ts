import { z } from "zod"

import { auditFields, uuidSchema } from "./baseSchema"

const baseReviewSchema = z.object({
  reviewId: uuidSchema,
  bookingId: uuidSchema,
  consultantId: uuidSchema,
  userId: uuidSchema,

  name: z.string(),
  avatarUrl: z.string(),

  rating: z
    .number()
    .int({ message: "Điểm đánh giá phải là số nguyên" })
    .min(1, { message: "Điểm đánh giá tối thiểu là 1" })
    .max(5, { message: "Điểm đánh giá tối đa là 5" }),
  comment: z
    .string()
    .nonempty({ message: "Nội dung đánh giá không được để trống" })
    .max(200, { message: "Nội dung đánh giá không được vượt quá 200 ký tự" }),

  ...auditFields
})

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
