import { z } from "zod"

const basePaymentSchema = z.object({
  paymentId: z.string(),
  bookingId: z.string(),
  subscriptionId: z.string(),

  amount: z.number(),

  status: z
    .string()
    .refine((val) => ["Pending", "Success", "Failed"].includes(val), {
      message: "Trạng thái thanh toán phải là Pending, Success hoặc Failed"
    }),

  createdAt: z.string(),
  updatedAt: z.string(),
  createdBy: z.string(),
  updatedBy: z.string()
})

export const paymentSchema = basePaymentSchema

export const createBookingPaymentSchema = paymentSchema.pick({
  bookingId: true,
  amount: true
})

export const createSubscriptionPaymentSchema = paymentSchema.pick({
  subscriptionId: true,
  amount: true
})

export type PaymentType = z.infer<typeof paymentSchema>
export type CreateBookingPaymentType = z.infer<
  typeof createBookingPaymentSchema
>
export type CreateSubscriptionPaymentType = z.infer<
  typeof createSubscriptionPaymentSchema
>
