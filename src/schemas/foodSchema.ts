import { z } from "zod"

import { DishTypeSchemaEnum, MealTypeSchemaEnum } from "@/constants/enum/Food"

import { auditFields, timestampFields, uuidSchema } from "./baseSchema"
import { nutritionSchema } from "./nutritionSchema"
import { portionSchema } from "./portionSchema"

export const foodPortionSchema = z.object({
  foodPortionId: uuidSchema,
  foodId: uuidSchema,
  portionId: uuidSchema,

  ...timestampFields
})

const foodSchema = z.object({
  foodId: uuidSchema,
  userId: uuidSchema,
  category: z.string(),

  mealType: z.array(MealTypeSchemaEnum),
  dishType: z.array(DishTypeSchemaEnum),

  name: z
    .string()
    .nonempty({ message: "Tên món ăn không được để trống" })
    .min(3, { message: "Tên món ăn phải có ít nhất 3 ký tự" })
    .max(255, { message: "Tên món ăn không được quá 255 ký tự" }),
  description: z
    .string()
    .nonempty({ message: "Mô tả món ăn không được để trống" })
    .min(10, { message: "Mô tả món ăn phải có ít nhất 10 ký tự" }),

  portion: portionSchema,

  nutrition: nutritionSchema,

  allergies: z.array(z.string()),

  views: z.number().default(0),

  isPublic: z.boolean(),

  status: z.boolean(),

  ...auditFields
})

export const foodSaveSchema = foodSchema.pick({
  foodId: true,
  name: true,
  portion: true,
  nutrition: true
})

export const createFoodSchema = foodSchema.pick({
  userId: true,

  // foodType: true,
  // mealType: true,
  // dishType: true,

  name: true,
  description: true,

  portion: true,

  nutrition: true,

  isPublic: true
})

export const informationFoodSchema = foodSchema.pick({
  // foodType: true,
  // mealType: true,
  // dishType: true,

  name: true,
  description: true,

  isPublic: true
})

export const portionFoodSchema = foodSchema.pick({
  portion: true
})

export const nutritionFoodSchema = foodSchema.pick({
  nutrition: true
})

export const updateFoodSchema = foodSchema.pick({
  name: true,
  description: true,

  isPublic: true
})

export type FoodPortionType = z.infer<typeof foodPortionSchema>

export type FoodType = z.infer<typeof foodSchema>
export type FoodSaveType = z.infer<typeof foodSaveSchema>
export type CreateFoodType = z.infer<typeof createFoodSchema>
export type UpdateFoodType = z.infer<typeof updateFoodSchema>
