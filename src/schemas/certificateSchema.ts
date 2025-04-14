import { z } from "zod"

import { timestampFields, uuidSchema } from "./baseSchema"

export const certificateSchema = z.object({
  certificateId: uuidSchema,
  consultantId: uuidSchema,
  expertiseId: uuidSchema,

  expertiseName: z
    .string()
    .nonempty({ message: "Tên chuyên môn không được để trống" }),
  expertiseDescription: z
    .string()
    .nonempty({ message: "Mô tả chuyên môn không được để trống" }),

  number: z.string().nonempty({ message: "Số chứng chỉ không được để trống" }),
  name: z
    .string()
    .nonempty({ message: "Tên chứng chỉ không được để trống" })
    .max(50, { message: "Tên chứng chỉ không được dài hơn 50 ký tự" }),

  issueDate: z.string().nonempty({ message: "Ngày cấp không được để trống" }),
  expiryDate: z.string().optional(),
  issuedBy: z.string().nonempty({ message: "Nơi cấp không được để trống" }),

  imageUrls: z
    .array(z.string().nonempty("Đường dẫn hình ảnh không hợp lệ"))
    .min(1, { message: "Cần ít nhất một hình ảnh" }),

  isVerified: z.boolean(),

  ...timestampFields
})

export type CertificateType = z.infer<typeof certificateSchema>
