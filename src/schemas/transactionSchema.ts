import { z } from "zod"

import {
  TransactionStatusSchemaEnum,
  TransactionTypeSchemaEnum
} from "@/constants/enum/Transaction"

import { auditFields, uuidSchema } from "./baseSchema"

export const transactionSchema = z.object({
  transactionId: uuidSchema,
  userId: uuidSchema,
  consultantId: uuidSchema,
  walletId: uuidSchema,
  bookingId: uuidSchema,
  withdrawalRequestId: uuidSchema,
  userSubscriptionId: uuidSchema,
  subscriptionId: uuidSchema,

  type: TransactionTypeSchemaEnum,
  orderCode: z.string().optional(),

  description: z
    .string()
    .nonempty({ message: "Mô tả giao dịch không được để trống" })
    .min(10, { message: "Mô tả giao dịch phải có ít nhất 10 ký tự" }),
  amount: z
    .number({ message: "Số tiền giao dịch phải là một số" })
    .positive({ message: "Số tiền giao dịch phải lớn hơn 0" }),

  status: TransactionStatusSchemaEnum,

  ...auditFields
})
export const createBookingTransactionSchema = transactionSchema.pick({
  userId: true,
  description: true,
  amount: true
})

export const createSubscriptionTransactionSchema = transactionSchema.pick({
  userId: true,
  subscriptionId: true,
  description: true,
  amount: true
})

export type TransactionType = z.infer<typeof transactionSchema>
export type CreateBookingTransactionType = z.infer<
  typeof createBookingTransactionSchema
>
export type CreateSubscriptionTransactionType = z.infer<
  typeof createSubscriptionTransactionSchema
>
