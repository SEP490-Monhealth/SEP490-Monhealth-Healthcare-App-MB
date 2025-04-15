import { z } from "zod"

import { WithdrawalRequestStatusSchemaEnum } from "@/constants/enum/WithdrawalRequest"

import { auditFields, uuidSchema } from "./baseSchema"

const withdrawalRequestSchema = z.object({
  withdrawalRequestId: uuidSchema,
  consultantId: uuidSchema,
  consultantBankId: z.string().nonempty({
    message: "Ngân hàng không được để trống"
  }),

  description: z
    .string()
    .nonempty({ message: "Mô tả yêu cầu không được để trống" })
    .min(10, { message: "Mô tả yêu cầu phải có ít nhất 10 ký tự" }),
  amount: z
    .number({ message: "Số tiền yêu cầu phải là một số" })
    .positive({ message: "Số tiền yêu cầu phải lớn hơn 0" }),

  status: WithdrawalRequestStatusSchemaEnum,

  ...auditFields
})

export const createWithdrawalRequestSchema = withdrawalRequestSchema.pick({
  consultantId: true,
  consultantBankId: true,
  description: true,
  amount: true
})

export const updateWithdrawalRequestSchema = withdrawalRequestSchema.pick({
  consultantBankId: true,
  description: true,
  amount: true
})

export type WithdrawalRequestType = z.infer<typeof withdrawalRequestSchema>
export type CreateWithdrawalRequestType = z.infer<
  typeof createWithdrawalRequestSchema
>
export type UpdateWithdrawalRequestType = z.infer<
  typeof updateWithdrawalRequestSchema
>
