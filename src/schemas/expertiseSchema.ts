import { z } from "zod"

import { timestampFields, uuidSchema } from "./baseSchema"

export const baseExpertiseSchema = z.object({
  expertiseId: uuidSchema,

  name: z
    .string()
    .nonempty({ message: "Tên chuyên môn không được để trống" })
    .max(100, { message: "Tên chuyên môn không được dài hơn 100 ký tự" }),

  ...timestampFields
})

export const expertiseSchema = baseExpertiseSchema

export const expertiseSetupSchema = z.object({
  expertise: expertiseSchema.shape.name
})

export type ExpertiseType = z.infer<typeof expertiseSchema>
