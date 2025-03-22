import { z } from "zod"

import { timestampFields, uuidSchema } from "./baseSchema"

const baseCertificateSchema = z.object({
  certificateId: uuidSchema,
  consultantId: uuidSchema,
  expertiseId: uuidSchema,

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

  status: z.boolean(),

  ...timestampFields
})

export const certificateSchema = baseCertificateSchema.pick({
  certificateId: true,
  consultantId: true,
  expertiseId: true,

  number: true,
  name: true,

  issueDate: true,
  expiryDate: true,
  issuedBy: true,

  imageUrls: true
})

export const certificateSetupSchema = z.object({
  number: certificateSchema.shape.number,
  certificate: certificateSchema.shape.name,

  issueDate: certificateSchema.shape.issueDate,
  expiryDate: certificateSchema.shape.expiryDate,
  issuedBy: certificateSchema.shape.issuedBy
})

export const certificateNumberSchema = z.object({
  number: certificateSchema.shape.number,
  certificate: certificateSchema.shape.name
})

export const certificateIssueSchema = z.object({
  issueDate: certificateSchema.shape.issueDate,
  expiryDate: certificateSchema.shape.expiryDate,
  issuedBy: certificateSchema.shape.issuedBy
})

export const certificateImageSetupSchema = z.object({
  imageUrls: certificateSchema.shape.imageUrls
})

export type CertificateType = z.infer<typeof certificateSchema>
