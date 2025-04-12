import { z } from "zod"

import {
  TransactionStatusSchemaEnum,
  TransactionTypeSchemaEnum
} from "@/constants/enum/Transaction"

import { auditFields, uuidSchema } from "./baseSchema"

export const transactionSchema = z.object({
  transactionId: uuidSchema,
  consultantId: uuidSchema,
  walletId: uuidSchema,
  bookingId: uuidSchema,

  type: TransactionTypeSchemaEnum,

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

export type TransactionType = z.infer<typeof transactionSchema>
