import { z } from "zod"

import { BookingStatusSchemaEnum } from "@/constants/enum/Booking"

import { auditFields, uuidSchema } from "./baseSchema"
import { userSchema } from "./userSchema"

const bookingSchema = z.object({
  bookingId: uuidSchema,
  userId: uuidSchema,
  consultantId: uuidSchema,

  member: z.object({
    fullName: userSchema.shape.fullName,
    email: userSchema.shape.email,
    phoneNumber: userSchema.shape.phoneNumber,
    avatarUrl: userSchema.shape.avatarUrl
  }),

  consultant: z.object({
    fullName: userSchema.shape.fullName,
    email: userSchema.shape.email,
    phoneNumber: userSchema.shape.phoneNumber,
    avatarUrl: userSchema.shape.avatarUrl
  }),

  date: z.string().nonempty({ message: "Ngày không được để trống" }),

  notes: z
    .string()
    .nonempty({ message: "Ghi chú không được để trống" })
    .min(10, {
      message: "Ghi chú phải có ít nhất 10 ký tự"
    }),
  cancellationReason: z.string().optional(),

  isReviewed: z.boolean(),

  status: BookingStatusSchemaEnum,

  ...auditFields
})

export const createBookingSchema = bookingSchema.pick({
  userId: true,
  consultantId: true,
  date: true,
  notes: true
})

export const cancelBookingSchema = z.object({
  cancellationReason: z
    .string()
    .nonempty({ message: "Vui lòng cung cấp lý do hủy lịch" })
    .min(10, {
      message: "Lý do hủy phải có ít nhất 10 ký tự"
    })
    .max(500, { message: "Lý do hủy không được vượt quá 500 ký tự" })
    .refine((value) => value.trim().length > 0, {
      message: "Vui lòng cung cấp lý do hủy lịch"
    })
})

export type BookingType = z.infer<typeof bookingSchema>
export type CreateBookingType = z.infer<typeof createBookingSchema>
export type CancelBookingType = z.infer<typeof cancelBookingSchema>
