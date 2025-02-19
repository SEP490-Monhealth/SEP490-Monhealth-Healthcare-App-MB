import { z } from "zod"

import { timestampSchema } from "./commonSchema"

export const baseExpertiseSchema = z
  .object({
    expertiseId: z.string(),

    name: z
      .string()
      .nonempty({ message: "Tên chuyên môn không được để trống" })
      .max(100, { message: "Tên chuyên môn không được dài hơn 100 ký tự" })
  })
  .merge(timestampSchema)

export const expertiseSchema = baseExpertiseSchema.pick({
  expertiseId: true,
  name: true
})

export const createExpertiseSchema = z.object({
  expertise: expertiseSchema.shape.name
})

export type ExpertiseType = z.infer<typeof expertiseSchema>
export type CreateExpertiseType = z.infer<typeof createExpertiseSchema>
