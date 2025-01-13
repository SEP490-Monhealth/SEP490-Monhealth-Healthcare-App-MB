import { z } from "zod"

const baseCertificateSchema = z.object({
  certificateId: z.string(),
  userId: z.string(),

  name: z
    .string()
    .nonempty({ message: "Tên chứng chỉ không được để trống" })
    .max(100, { message: "Tên chứng chỉ không được dài hơn 100 ký tự" }),
  issueDate: z.string().nonempty({ message: "Ngày cấp không được để trống" }),
  expiryDate: z
    .string()
    .nonempty({ message: "Ngày hết hạn không được để trống" }),
  images: z.string().url({ message: "Link ảnh không hợp lệ" }),

  status: z.boolean(),

  createdAt: z.string(),
  updatedAt: z.string(),
  createdBy: z.string(),
  updatedBy: z.string()
})

const certificateSchema = baseCertificateSchema

export const createCertificateSchema = certificateSchema.pick({
  userId: true,
  name: true,
  issueDate: true,
  expiryDate: true,
  images: true
})

export type CertificateType = z.infer<typeof certificateSchema>
export type CreateCertificateType = z.infer<typeof createCertificateSchema>
