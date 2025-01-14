import { z } from "zod"

const baseAllergySchema = z.object({
  allergyId: z.string(),
  name: z
    .string()
    .nonempty({ message: "Tên dị ứng không được để trống" })
    .max(100, { message: "Tên dị ứng không được dài hơn 100 ký tự" }),
  description: z.string().max(500, {
    message: "Mô tả dị ứng không được dài hơn 500 ký tự"
  }),

  createdAt: z.string(),
  updatedAt: z.string(),
  createdBy: z.string(),
  updatedBy: z.string()
})

export const allergySchema = baseAllergySchema.pick({
  allergyId: true,
  name: true,
  description: true
})

export const allergySetupSchema = z.object({
  allergies: z.array(baseAllergySchema.shape.name).default([])
})

export type AllergyType = z.infer<typeof allergySchema>
