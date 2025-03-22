import { z } from "zod"

import { auditFields, uuidSchema } from "./baseSchema"

export const baseExpertiseSchema = z.object({
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

export const expertiseSchema = baseExpertiseSchema

export const expertiseSetupSchema = z.object({
  expertise: expertiseSchema.shape.name
})

export type ExpertiseType = z.infer<typeof expertiseSchema>
