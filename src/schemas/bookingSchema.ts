import { z } from "zod"

const baseBookingSchema = z.object({
  bookingId: z.string(),
  serviceId: z.string(),
  userId: z.string(),
  consultantId: z.string(),

  date: z
    .string()
    .nonempty({ message: "Ngày không được để trống" })
    .refine((val) => new Date(val) >= new Date(), {
      message: "Ngày không được là ngày trong quá khứ"
    }),

  notes: z.string().optional(),

  status: z
    .string()
    .refine(
      (val) => ["Pending", "Confirmed", "Completed", "Cancelled"].includes(val),
      {
        message:
          "Trạng thái phải là: Pending, Confirmed, Completed, hoặc Cancelled"
      }
    ),

  createdAt: z.string(),
  updatedAt: z.string(),
  createdBy: z.string(),
  updatedBy: z.string()
})

const bookingSchema = baseBookingSchema

export const createBookingSchema = bookingSchema.pick({
  userId: true,
  consultantId: true,
  date: true,
  notes: true
})

export type BookingType = z.infer<typeof bookingSchema>
export type CreateBookingType = z.infer<typeof createBookingSchema>
