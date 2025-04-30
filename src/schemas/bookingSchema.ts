import { z } from "zod"

import { BookingStatusSchemaEnum } from "@/constants/enum/Booking"

import { auditFields, uuidSchema } from "./baseSchema"
import { reviewDetailSchema } from "./reviewSchema"
import { userDetailSchema } from "./userSchema"

const bookingSchema = z.object({
  bookingId: uuidSchema,
  userId: uuidSchema,
  consultantId: uuidSchema,

  member: userDetailSchema,
  consultant: userDetailSchema,

  review: reviewDetailSchema,

  date: z.string().nonempty({ message: "Ngày không được để trống" }),
  startTime: z
    .string()
    .nonempty({ message: "Thời gian bắt đầu không được để trống" }),
  endTime: z
    .string()
    .nonempty({ message: "Thời gian kết thúc không được để trống" }),

  meetingUrl: z
    .string()
    .refine(
      (url) => {
        try {
          const normalizedUrl = url.startsWith("http") ? url : `https://${url}`
          const domain = new URL(normalizedUrl).hostname
          return domain === "meet.google.com"
        } catch {
          return false
        }
      },
      { message: "URL phải là đường dẫn Google Meet" }
    )
    .refine(
      (url) => {
        return /^(https:\/\/)?meet\.google\.com\/([a-z0-9]{3}-[a-z0-9]{4}-[a-z0-9]{3}|[a-z0-9]{10,})$/.test(
          url
        )
      },
      { message: "Định dạng URL Google Meet không đúng" }
    ),

  notes: z
    .string()
    .nonempty({ message: "Ghi chú không được để trống" })
    .min(10, {
      message: "Ghi chú phải có ít nhất 10 ký tự"
    }),

  evidenceUrls: z
    .array(z.string().nonempty("Đường dẫn hình ảnh không hợp lệ"))
    .min(1, { message: "Cần ít nhất một hình ảnh" }),

  cancellationReason: z.string().optional(),

  isReviewed: z.boolean(),

  reviews: reviewDetailSchema.optional(),

  status: BookingStatusSchemaEnum,

  completedAt: z.string().optional(),

  ...auditFields
})

export const bookingDetailSchema = bookingSchema.pick({
  date: true,
  startTime: true,
  endTime: true,
  notes: true
})

export const createBookingSchema = bookingSchema.pick({
  userId: true,
  consultantId: true,
  date: true,
  startTime: true,
  endTime: true,
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
