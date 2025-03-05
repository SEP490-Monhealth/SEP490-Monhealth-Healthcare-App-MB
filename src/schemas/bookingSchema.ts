import { z } from "zod"

import { BookingStatusEnum } from "@/constants/enum/BookingStatus"

import { auditSchema } from "./commonSchema"

const BookingStatusSchemaEnum = z.nativeEnum(BookingStatusEnum)

const baseBookingSchema = z
  .object({
    bookingId: z.string(),
    userId: z.string(),
    consultantId: z.string(),
    scheduleId: z.string(),

    consultant: z
      .string()
      .nonempty({ message: "Tên không được để trống" })
      .max(50, { message: "Tên không được dài hơn 50 ký tự" })
      .regex(/^[^\d!@#$%^&*()_+=[\]{};':"\\|,.<>/?]*$/, {
        message: "Tên không được chứa ký tự đặc biệt hoặc số"
      }),
    customer: z
      .string()
      .nonempty({ message: "Tên không được để trống" })
      .max(50, { message: "Tên không được dài hơn 50 ký tự" })
      .regex(/^[^\d!@#$%^&*()_+=[\]{};':"\\|,.<>/?]*$/, {
        message: "Tên không được chứa ký tự đặc biệt hoặc số"
      }),

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
