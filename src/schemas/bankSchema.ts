import { z } from "zod"

import { auditFields, uuidSchema } from "./baseSchema"

export const bankSchema = z.object({
  bankId: uuidSchema,

  code: z.string().nonempty({ message: "Mã ngân hàng không được để trống" }),
  name: z
    .string()
    .nonempty({ message: "Tên ngân hàng không được để trống" })
    .min(3, { message: "Tên ngân hàng phải có ít nhất 3 ký tự" })
    .max(50, { message: "Tên ngân hàng không được quá 50 ký tự" }),
  shortName: z
    .string()
    .nonempty({ message: "Tên viết tắt ngân hàng không được để trống" })
    .min(3, { message: "Tên viết tắt ngân hàng phải có ít nhất 3 ký tự" })
    .max(20, { message: "Tên viết tắt ngân hàng không được quá 20 ký tự" }),

  logoUrl: z.string().url({
    message: "Đường dẫn logo không hợp lệ"
  }),

  status: z.boolean(),

  ...auditFields
})

export type BankType = z.infer<typeof bankSchema>
