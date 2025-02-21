import { z } from "zod"

import { timestampSchema } from "./commonSchema"

const baseAllergySchema = z
  .object({
    allergyId: z.string(),
    name: z
      .string()
      .nonempty({ message: "Tên dị ứng không được để trống" })
      .max(100, { message: "Tên dị ứng không được dài hơn 100 ký tự" }),
    description: z.string().max(500, {
      message: "Mô tả dị ứng không được dài hơn 500 ký tự"
    })
  })
  .merge(timestampSchema)

export const allergySchema = baseAllergySchema

export const allergySetupSchema = z.object({
  allergies: z.array(allergySchema.shape.name)
})

export type AllergyType = z.infer<typeof allergySchema>
