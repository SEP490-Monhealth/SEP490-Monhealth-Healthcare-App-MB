import { z } from "zod"

import { timestampSchema } from "./commonSchema"

const baseCertificateSchema = z
  .object({
    certificateId: z.string(),
    expertiseId: z.string(),

    name: z
      .string()
      .nonempty({ message: "Tên chứng chỉ không được để trống" })
      .max(100, { message: "Tên chứng chỉ không được dài hơn 100 ký tự" }),
    issueDate: z.string().nonempty({ message: "Ngày cấp không được để trống" }),
    expiryDate: z
      .string()
      .nonempty({ message: "Ngày hết hạn không được để trống" }),
    images: z
      .array(z.string().nonempty("Đường dẫn hình ảnh không hợp lệ"))
      .min(1, { message: "Cần ít nhất một hình ảnh" }),

    status: z.boolean()
  })
  .merge(timestampSchema)

export const certificateSchema = baseCertificateSchema.pick({
  certificateId: true,
  name: true,
  issueDate: true,
  expiryDate: true,
  images: true
})

export const certificateSetupSchema = z.object({
  certificate: certificateSchema.shape.name,
  issueDate: certificateSchema.shape.issueDate,
  expiryDate: certificateSchema.shape.expiryDate,
  images: certificateSchema.shape.images
})

export type CertificateType = z.infer<typeof certificateSchema>
