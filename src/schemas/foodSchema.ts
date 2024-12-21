import { z } from "zod"

import { nutritionSchema } from "./nutritionSchema"
import { portionSchema } from "./portionSchema"

export const foodSchema = z.object({
  foodId: z.string(),
  category: z.string(),
  foodName: z
    .string()
    .nonempty({ message: "Tên món ăn không được để trống" })
    .max(100, { message: "Tên món ăn không được dài hơn 100 ký tự" })
    .regex(/^[a-zA-Z0-9\s\u00C0-\u024F\u1E00-\u1EFF]*$/, {
      message: "Tên món ăn chỉ được chứa chữ cái, số và khoảng trắng"
    }),
  foodDescription: z
    .string()
    .max(500, { message: "Mô tả món ăn không được dài hơn 500 ký tự" })
    .optional(),

  portion: z.object(portionSchema.shape),
  nutrition: z.object(nutritionSchema.shape),

  status: z.boolean(),

  createdAt: z.string(),
  updatedAt: z.string(),
  createdBy: z.string(),
  updatedBy: z.string()
})

export const createUpdateFoodSchema = foodSchema.omit({
  foodId: true,
  status: true,
  createdAt: true,
  updatedAt: true,
  createdBy: true,
  updatedBy: true
})

export type FoodType = z.infer<typeof foodSchema>
export type CreateUpdateFoodType = z.infer<typeof createUpdateFoodSchema>
