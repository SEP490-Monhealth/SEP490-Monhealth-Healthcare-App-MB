import { z } from "zod"

import { auditSchema } from "./commonSchema"

const basePaymentSchema = z
  .object({
    paymentId: z.string(),
    bookingId: z.string(),
    subscriptionId: z.string(),

    amount: z.number(),

    status: z
      .string()
      .refine((val) => ["Pending", "Success", "Failed"].includes(val), {
        message:
          "Trạng thái không hợp lệ. Chỉ chấp nhận: Pending, Success, Failed"
      })
  })
  .merge(auditSchema)

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
