import { z } from "zod"

import { timestampSchema } from "./commonSchema"

const certificateImageSchema = z
  .object({
    certificateImageId: z.string(),
    certificateId: z.string(),
    url: z.string().url({ message: "Đường dẫn hình ảnh không hợp lệ" })
  })
  .merge(timestampSchema)

const baseCertificateSchema = z
  .object({
    certificateId: z.string(),
    userId: z.string(),

    expertise: z
      .string()
      .nonempty({ message: "Chuyên môn không được để trống" }),
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
  userId: true,
  expertise: true,
  name: true,
  issueDate: true,
  expiryDate: true,
  images: true
})

export const createCertificateSchema = certificateSchema.pick({
  userId: true,
  expertise: true,
  name: true,
  issueDate: true,
  expiryDate: true,
  images: true
})

export type CertificateImageType = z.infer<typeof certificateImageSchema>

export type CertificateType = z.infer<typeof certificateSchema>
export type CreateCertificateType = z.infer<typeof createCertificateSchema>
