import { z } from "zod"

import { bankSchema } from "./bankSchema"
import { timestampFields, uuidSchema } from "./baseSchema"

export const consultantBankSchema = z.object({
  consultantBankId: uuidSchema,
  consultantId: uuidSchema,
  bankId: uuidSchema,

  bank: z.object({
    name: bankSchema.shape.name,
    shortName: bankSchema.shape.shortName,
    logoUrl: bankSchema.shape.logoUrl
  }),

  number: z
    .string()
    .nonempty({ message: "Số tài khoản không được để trống" })
    .regex(/^\S+$/, { message: "Số tài khoản không được chứa khoảng trắng" }),
  name: z
    .string()
    .nonempty({ message: "Tên tài khoản không được để trống" })
    .min(3, { message: "Tên tài khoản phải có ít nhất 3 ký tự" })
    .max(50, { message: "Tên tài khoản không được quá 50 ký tự" })
    .regex(/^[A-Z0-9\s]+$/, {
      message: "Tên tài khoản chỉ được chứa chữ hoa và số"
    }),

  isDefault: z.boolean(),
  status: z.boolean(),

  ...timestampFields
})

export const bankInformationSchema = consultantBankSchema.pick({
  name: true,
  number: true,
  isDefault: true
})

export const createConsultantBankSchema = consultantBankSchema.pick({
  consultantId: true,
  bankId: true,
  number: true,
  name: true,
  isDefault: true
})

export const updateConsultantBankSchema = consultantBankSchema.pick({
  number: true,
  name: true
})

export type ConsultantBankType = z.infer<typeof consultantBankSchema>
export type CreateConsultantBankType = z.infer<
  typeof createConsultantBankSchema
>
export type UpdateConsultantBankType = z.infer<
  typeof updateConsultantBankSchema
>
