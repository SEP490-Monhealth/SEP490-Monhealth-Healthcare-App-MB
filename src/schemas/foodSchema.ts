import { z } from "zod"

import { nutritionSchema } from "./nutritionSchema"
import { portionSchema } from "./portionSchema"

export const baseFoodSchema = z.object({
  foodId: z.string(),
  userId: z.string(),

  type: z.string(),
  category: z.string(),
  name: z
    .string()
    .nonempty({ message: "Tên món ăn không được để trống" })
    .max(100, { message: "Tên món ăn không được dài hơn 100 ký tự" })
    .regex(/^[a-zA-Z0-9\s\u00C0-\u024F\u1E00-\u1EFF]*$/, {
      message: "Tên món ăn chỉ được chứa chữ cái, số và khoảng trắng"
    }),
  description: z
    .string()
    .nonempty({ message: "Mô tả món ăn không được để trống" })
    .max(500, { message: "Mô tả món ăn không được dài hơn 500 ký tự" }),

  portion: portionSchema,

  nutrition: nutritionSchema,

  status: z.boolean(),

  createdAt: z.string(),
  updatedAt: z.string(),
  createdBy: z.string(),
  updatedBy: z.string()
})

export const foodSchema = baseFoodSchema.pick({
  foodId: true,
  type: true,
  category: true,
  name: true,
  portion: true,
  nutrition: true,
  status: true,
  createdAt: true,
  updatedAt: true,
  createdBy: true,
  updatedBy: true
})

export const foodSaveSchema = baseFoodSchema.pick({
  foodId: true,
  name: true,
  portion: true,
  nutrition: true
})

export const createFoodSchema = baseFoodSchema.pick({
  userId: true,
  type: true,
  name: true,
  description: true,
  portion: true,
  nutrition: true
})

export const createFoodInformationSchema = baseFoodSchema.pick({
  userId: true,
  type: true,
  name: true,
  description: true
})

export const createFoodPortionSchema = baseFoodSchema.pick({
  portion: true
})

export const createFoodNutritionSchema = baseFoodSchema.pick({
  nutrition: true
})

export const updateFoodSchema = baseFoodSchema.pick({
  name: true,
  description: true
})

export type FoodType = z.infer<typeof foodSchema>
export type SaveFoodType = z.infer<typeof foodSaveSchema>
export type CreateFoodType = z.infer<typeof createFoodSchema>
export type CreateFoodInformationType = z.infer<
  typeof createFoodInformationSchema
>
export type CreateFoodPortionType = z.infer<typeof createFoodPortionSchema>
export type CreateFoodNutritionType = z.infer<typeof createFoodNutritionSchema>
export type UpdateFoodType = z.infer<typeof updateFoodSchema>
