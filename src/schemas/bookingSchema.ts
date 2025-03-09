import { z } from "zod"

import { BookingStatusEnum } from "@/constants/enum/BookingStatus"

import { auditSchema } from "./commonSchema"

const BookingStatusSchemaEnum = z.nativeEnum(BookingStatusEnum)

const baseBookingSchema = z
  .object({
    bookingId: z.string().uuid(),
    userId: z.string().uuid(),
    consultantId: z.string().uuid(),
    scheduleId: z.string().uuid(),

    consultant: z
      .string()
      .nonempty({ message: "Tên chuyên viên không được để trống" })
      .max(50, { message: "Tên chuyên viên không được dài hơn 50 ký tự" })
      .regex(/^[^\d!@#$%^&*()_+=[\]{};':"\\|,.<>/?]*$/, {
        message: "Tên chuyên viên không được chứa ký tự đặc biệt hoặc số"
      }),
    consultantAvatar: z
      .string()
      .url({ message: "Đường dẫn không hợp lệ" })
      .optional(),

    customer: z
      .string()
      .nonempty({ message: "Tên người dùng không được để trống" })
      .max(50, { message: "Tên người dùng không được dài hơn 50 ký tự" })
      .regex(/^[^\d!@#$%^&*()_+=[\]{};':"\\|,.<>/?]*$/, {
        message: "Tên người dùng không được chứa ký tự đặc biệt hoặc số"
      }),
    customerAvatar: z
      .string()
      .url({ message: "Đường dẫn không hợp lệ" })
      .optional(),

    date: z
      .string()
      .nonempty({ message: "Ngày không được để trống" })
      .refine((val) => new Date(val) >= new Date(), {
        message: "Ngày không được là ngày trong quá khứ"
      }),
    time: z
      .string()
      .nonempty({ message: "Giờ không được để trống" })
      .refine((val) => new Date(val) >= new Date(), {
        message: "Giờ không được là ngày trong quá khứ"
      }),

    notes: z.string().optional(),

    status: BookingStatusSchemaEnum
  })
  .merge(auditSchema)

export const bookingSchema = baseBookingSchema

export const createBookingSchema = bookingSchema.pick({
  userId: true,
  consultantId: true,
  date: true,
  time: true,
  notes: true
})

export type BookingType = z.infer<typeof bookingSchema>
export type CreateBookingType = z.infer<typeof createBookingSchema>
