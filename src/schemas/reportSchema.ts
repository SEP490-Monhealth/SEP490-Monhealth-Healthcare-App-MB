import { z } from "zod"

import { timestampFields, uuidSchema } from "./baseSchema"
import { userInfoSchema } from "./userSchema"

export const weeklyMealSchema = z.object({
  date: z.string(),
  calories: z.number()
})

export const yearlyTransactionSchema = z.object({
  income: z.array(
    z.object({
      month: z.string(),
      amount: z.number()
    })
  ),
  expense: z.array(
    z.object({
      month: z.string(),
      amount: z.number()
    })
  )
})

export const yearlyBookingSchema = z.object({
  month: z.string(),
  bookings: z.number()
})

export type WeeklyMealType = z.infer<typeof weeklyMealSchema>
export type YearlyTransactionType = z.infer<typeof yearlyTransactionSchema>
export type YearlyBookingType = z.infer<typeof yearlyBookingSchema>

const reportSchema = z.object({
  reportId: uuidSchema,
  bookingId: uuidSchema,

  member: userInfoSchema,
  consultant: userInfoSchema,

  reason: z
    .string()
    .nonempty({ message: "Lý do không được để trống" })
    .min(10, {
      message: "Lý do phải có ít nhất 10 ký tự"
    }),

  imageUrls: z
    .array(z.string().nonempty("Đường dẫn hình ảnh không hợp lệ"))
    .min(1, { message: "Cần ít nhất một hình ảnh" }),

  ...timestampFields
})

export const createReportSchema = reportSchema.pick({
  bookingId: true,
  reason: true,
  imageUrls: true
})

export const updateReportSchema = reportSchema.pick({
  reason: true,
  imageUrls: true
})

export type ReportType = z.infer<typeof reportSchema>
export type CreateReportType = z.infer<typeof createReportSchema>
export type UpdateReportType = z.infer<typeof updateReportSchema>
