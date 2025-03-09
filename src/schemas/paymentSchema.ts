import { z } from "zod"

import { auditFields, uuidSchema } from "./baseSchema"

const basePaymentSchema = z.object({
  paymentId: uuidSchema,
  subscriptionId: uuidSchema,

  amount: z.number(),

  status: z
    .string()
    .refine((val) => ["Pending", "Success", "Failed"].includes(val), {
      message:
        "Trạng thái không hợp lệ. Chỉ chấp nhận: Pending, Success, Failed"
    }),

  ...auditFields
})

export const paymentSchema = basePaymentSchema

export const createPaymentSchema = paymentSchema.pick({
  subscriptionId: true,
  amount: true
})

export type PaymentType = z.infer<typeof paymentSchema>
export type CreatePaymentType = z.infer<typeof createPaymentSchema>
