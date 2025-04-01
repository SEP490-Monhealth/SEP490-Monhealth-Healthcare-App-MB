import { z } from "zod"

import { auditFields, uuidSchema } from "./baseSchema"
import { userSchema } from "./userSchema"

const baseReviewSchema = z.object({
  reviewId: uuidSchema,
  bookingId: uuidSchema,
  consultantId: uuidSchema,
  userId: uuidSchema,

  member: z.object({
    fullName: userSchema.shape.fullName,
    email: userSchema.shape.email,
    phoneNumber: userSchema.shape.phoneNumber,
    avatarUrl: userSchema.shape.avatarUrl
  }),

  rating: z.number().min(1, { message: "Chọn số sao để đánh giá" }),
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
