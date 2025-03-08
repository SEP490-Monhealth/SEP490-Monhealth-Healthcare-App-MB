import { z } from "zod"

import { timestampSchema } from "./commonSchema"

const baseCertificateSchema = z
  .object({
    certificateId: z.string().uuid(),
    consultantId: z.string().uuid(),
    expertiseId: z.string().uuid(),

    name: z
      .string()
      .nonempty({ message: "Tên chứng chỉ không được để trống" })
      .max(100, { message: "Tên chứng chỉ không được dài hơn 100 ký tự" }),
    issueDate: z.string().nonempty({ message: "Ngày cấp không được để trống" }),
    expiryDate: z.string().optional(),
    imageUrls: z
      .array(z.string().nonempty("Đường dẫn hình ảnh không hợp lệ"))
      .min(1, { message: "Cần ít nhất một hình ảnh" }),

    status: z.boolean()
  })
  .merge(timestampSchema)

export const certificateSchema = baseCertificateSchema.pick({
  certificateId: true,
  consultantId: true,
  expertiseId: true,

  name: true,
  issueDate: true,
  expiryDate: true,
  imageUrls: true
})

export const certificateSetupSchema = z.object({
  certificate: certificateSchema.shape.name,
  issueDate: certificateSchema.shape.issueDate,
  expiryDate: certificateSchema.shape.expiryDate,
  imageUrls: certificateSchema.shape.imageUrls
})

export type CertificateType = z.infer<typeof certificateSchema>
