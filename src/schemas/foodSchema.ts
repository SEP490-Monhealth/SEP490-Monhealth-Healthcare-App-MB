import { z } from "zod"

import { DishTypeSchemaEnum, MealTypeSchemaEnum } from "@/constants/enum/Food"

import { allergySchema } from "./allergySchema"
import { auditFields, timestampFields, uuidSchema } from "./baseSchema"
import { categorySchema } from "./categorySchema"
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
  categoryId: uuidSchema,

  category: categorySchema.shape.name,

  mealType: z.array(MealTypeSchemaEnum),
  dishType: z.array(DishTypeSchemaEnum),

  name: z
    .string()
    .nonempty({ message: "Tên thức ăn không được để trống" })
    .min(3, { message: "Tên thức ăn phải có ít nhất 3 ký tự" })
    .max(255, { message: "Tên thức ăn không được quá 255 ký tự" }),
  description: z
    .string()
    .nonempty({ message: "Mô tả thức ăn không được để trống" })
    .min(10, { message: "Mô tả thức ăn phải có ít nhất 10 ký tự" }),

  portion: portionSchema,

  nutrition: nutritionSchema,

  allergies: z.array(allergySchema.shape.name),

  referenceUrl: z.string().optional(),

  views: z.number(),

  isPublic: z.boolean(),
  status: z.boolean(),

  ...auditFields
})

export const saveFoodSchema = foodSchema.pick({
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
export type FoodSaveType = z.infer<typeof saveFoodSchema>
export type CreateFoodType = z.infer<typeof createFoodSchema>
export type UpdateFoodType = z.infer<typeof updateFoodSchema>
