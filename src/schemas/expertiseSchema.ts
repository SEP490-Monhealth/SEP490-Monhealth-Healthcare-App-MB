import { z } from "zod"

import { auditFields, uuidSchema } from "./baseSchema"
import { certificateSchema } from "./certificateSchema"

export const expertiseSchema = z.object({
  expertiseId: uuidSchema,

  name: z
    .string()
    .nonempty({ message: "Tên chuyên môn không được để trống" })
    .max(50, { message: "Tên chuyên môn không được dài hơn 50 ký tự" }),
  description: z
    .string()
    .max(200, {
      message: "Mô tả chuyên môn không được dài hơn 200 ký tự"
    })
    .optional(),

  ...auditFields
})

export const expertiseSetupSchema = z.object({
  expertise: expertiseSchema.shape.name
})

export const expertiseUpdateSchema = z.object({
  expertise: expertiseSchema.shape.name,
  number: certificateSchema.shape.number,
  certificate: certificateSchema.shape.name,
  issueDate: certificateSchema.shape.issueDate,
  expiryDate: certificateSchema.shape.expiryDate,
  issuedBy: certificateSchema.shape.issuedBy,
  imageUrls: certificateSchema.shape.imageUrls
})

export type ExpertiseType = z.infer<typeof expertiseSchema>
export type ExpertiseUpdateType = z.infer<typeof expertiseUpdateSchema>
