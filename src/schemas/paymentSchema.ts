import { z } from "zod"

import { PaymentStatusSchemaEnum } from "@/constants/enum/Payment"

import { auditFields, uuidSchema } from "./baseSchema"

const paymentSchema = z.object({
  paymentId: uuidSchema,
  userId: uuidSchema,
  subscriptionId: uuidSchema,

  amount: z
    .number({ message: "Số tiền thanh toán phải là một số" })
    .positive({ message: "Số tiền thanh toán phải lớn hơn 0" }),

  status: PaymentStatusSchemaEnum,

  ...auditFields
})

export const createPaymentSchema = paymentSchema.pick({
  userId: true,
  subscriptionId: true,
  amount: true
})

export type PaymentType = z.infer<typeof paymentSchema>
export type CreatePaymentType = z.infer<typeof createPaymentSchema>
