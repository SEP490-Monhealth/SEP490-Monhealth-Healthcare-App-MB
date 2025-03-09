import { z } from "zod"

import { timestampFields, uuidSchema } from "./baseSchema"

const baseAllergySchema = z.object({
  allergyId: uuidSchema,

  name: z
    .string()
    .nonempty({ message: "Tên dị ứng không được để trống" })
    .max(50, { message: "Tên dị ứng không được dài hơn 50 ký tự" }),
  description: z
    .string()
    .max(200, {
      message: "Mô tả dị ứng không được dài hơn 200 ký tự"
    })
    .optional(),

  ...timestampFields
})

export const allergySchema = baseAllergySchema

export const allergySetupSchema = z.object({
  allergies: z.array(allergySchema.shape.name)
})

export type AllergyType = z.infer<typeof allergySchema>
