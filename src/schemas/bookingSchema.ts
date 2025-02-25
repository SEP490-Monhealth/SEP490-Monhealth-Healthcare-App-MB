import { z } from "zod"

import { auditSchema } from "./commonSchema"

const baseBookingSchema = z
  .object({
    bookingId: z.string(),
    userId: z.string(),
    consultantId: z.string(),
    scheduleId: z.string(),

    consultantName: z
      .string()
      .nonempty({ message: "Tên không được để trống" })
      .max(50, { message: "Tên không được dài hơn 50 ký tự" })
      .regex(/^[^\d!@#$%^&*()_+=[\]{};':"\\|,.<>/?]*$/, {
        message: "Tên không được chứa ký tự đặc biệt hoặc số"
      }),

    customerName: z
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

    status: z
      .string()
      .refine(
        (val) =>
          ["Pending", "Confirmed", "Completed", "Cancelled"].includes(val),
        {
          message:
            "Trạng thái phải là: Pending, Confirmed, Completed, hoặc Cancelled"
        }
      )
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
