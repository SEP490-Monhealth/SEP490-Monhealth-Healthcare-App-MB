import { z } from "zod"

import { auditFields, uuidSchema } from "./baseSchema"

export const allergySchema = z.object({
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

  ...auditFields
})

export const allergySetupSchema = z.object({
  allergies: z.array(allergySchema.shape.name)
})

const createUserAllergySchema = z.object({
  userId: uuidSchema,
  allergyId: z.array(z.string())
})

export const updateUserAllergySchema = z.object({
  allergies: z.array(z.string())
})

export type AllergyType = z.infer<typeof allergySchema>
export type CreateUserAllergyType = z.infer<typeof createUserAllergySchema>
export type UpdateUserAllergyType = z.infer<typeof updateUserAllergySchema>
