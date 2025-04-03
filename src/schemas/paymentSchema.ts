import { z } from "zod"

import { PaymentStatusSchemaEnum } from "@/constants/enum/Payment"

import { auditFields, uuidSchema } from "./baseSchema"

const paymentSchema = z.object({
  paymentId: uuidSchema,
  userId: uuidSchema,

  amount: z
    .number({ message: "Số tiền thanh toán phải là một số" })
    .positive({ message: "Số tiền thanh toán phải lớn hơn 0" }),

  status: PaymentStatusSchemaEnum,

  ...auditFields
})

export const paymentResponseSchema = z.object({
  paymentId: uuidSchema,
  userId: uuidSchema,

  amount: paymentSchema.shape.amount,
  status: paymentSchema.shape.status,

  paymentUrl: z.string().url({
    message: "Đường dẫn thanh toán không hợp lệ"
  }),
  qrCode: z.string()
})

export const createPaymentSchema = paymentSchema.pick({
  userId: true,
  amount: true
})

export type PaymentType = z.infer<typeof paymentSchema>
export type CreatePaymentType = z.infer<typeof createPaymentSchema>

export type PaymentResponseType = z.infer<typeof paymentResponseSchema>
