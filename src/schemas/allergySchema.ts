import { z } from "zod"

const baseAllergySchema = z.object({
  allergyId: z.string(),
  name: z
    .string()
    .nonempty({ message: "Tên dị ứng không được để trống" })
    .max(100, { message: "Tên dị ứng không được dài hơn 100 ký tự" })
    .regex(/^[a-zA-Z0-9\s\u00C0-\u024F\u1E00-\u1EFF]*$/, {
      message: "Tên dị ứng chỉ được chứa chữ cái, số và khoảng trắng"
    }),
  description: z.string().max(500, {
    message: "Mô tả dị ứng không được dài hơn 500 ký tự"
  }),

  createdAt: z.string(),
  updatedAt: z.string(),
  createdBy: z.string(),
  updatedBy: z.string()
})

const allergySchema = baseAllergySchema.pick({
  allergyId: true,
  name: true,
  description: true
})

export const allergySetupSchema = z.object({
  allergies: z.array(baseAllergySchema.shape.allergyId).default([])
})

export type AllergyType = z.infer<typeof allergySchema>
