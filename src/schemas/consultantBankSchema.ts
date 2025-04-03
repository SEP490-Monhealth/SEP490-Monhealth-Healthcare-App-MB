import { zip } from "lodash"
import { z } from "zod"

import { bankSchema } from "./bankSchema"
import { timestampFields, uuidSchema } from "./baseSchema"

const consultantBankSchema = z.object({
  consultantBankId: uuidSchema,
  consultantId: uuidSchema,
  bankId: uuidSchema,

  bank: z.object({
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
    .max(50, { message: "Tên tài khoản không được quá 50 ký tự" }),

  isDefault: z.boolean(),
  status: z.boolean(),

  ...timestampFields
})

export const bankSelectionSchema = z.object({
  bank: bankSchema.shape.code
})

export const bankInformationSchema = consultantBankSchema.pick({
  name: true,
  number: true,
  isDefault: true
})

export const createConsultantBankSchema = z.object({
  consultantId: consultantBankSchema.shape.consultantId,
  bank: bankSchema.shape.code,
  number: consultantBankSchema.shape.number,
  name: consultantBankSchema.shape.name,
  isDefault: consultantBankSchema.shape.isDefault
})

export const updateConsultantBankSchema = z.object({
  number: consultantBankSchema.shape.number,
  name: consultantBankSchema.shape.name
})

export type ConsultantBankType = z.infer<typeof consultantBankSchema>
export type CreateConsultantBankType = z.infer<
  typeof createConsultantBankSchema
>
export type UpdateConsultantBankType = z.infer<
  typeof updateConsultantBankSchema
>
