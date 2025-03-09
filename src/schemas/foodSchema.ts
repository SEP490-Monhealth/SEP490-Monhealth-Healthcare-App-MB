import { z } from "zod"

import {
  DishTypeSchemaEnum,
  FoodTypeSchemaEnum,
  MealTypeSchemaEnum
} from "@/constants/enum/Food"

import { allergySetupSchema } from "./allergySchema"
import { auditFields, timestampFields, uuidSchema } from "./baseSchema"
import { categorySetupSchema } from "./categorySchema"
import { nutritionSchema } from "./nutritionSchema"
import { portionSchema } from "./portionSchema"

export const foodAllergySchema = z.object({
  foodAllergyId: uuidSchema,
  foodId: uuidSchema,
  allergyId: uuidSchema,

  ...timestampFields
})

export const foodPortionSchema = z.object({
  foodPortionId: uuidSchema,
  foodId: uuidSchema,
  portionId: uuidSchema,

  ...timestampFields
})

const baseFoodSchema = z.object({
  foodId: uuidSchema,
  userId: uuidSchema,
  category: z.string(),

  foodType: z.array(FoodTypeSchemaEnum),
  mealType: z.array(MealTypeSchemaEnum),
  dishType: z.array(DishTypeSchemaEnum),

  name: z
    .string()
    .nonempty({ message: "Tên món ăn không được để trống" })
    .max(50, { message: "Tên món ăn không được dài hơn 50 ký tự" })
    .regex(/^[a-zA-Z0-9\s\u00C0-\u024F\u1E00-\u1EFF]*$/, {
      message: "Tên món ăn chỉ được chứa chữ cái, số và khoảng trắng"
    }),
  description: z
    .string()
    .nonempty({ message: "Mô tả món ăn không được để trống" })
    .max(200, { message: "Mô tả món ăn không được dài hơn 200 ký tự" }),

  portion: portionSchema,

  nutrition: nutritionSchema,

  allergies: z.array(z.string()),

  views: z.number(),

  isPublic: z.boolean(),

  status: z.boolean(),

  ...auditFields
})

export const foodSchema = baseFoodSchema

export const foodSaveSchema = baseFoodSchema.pick({
  foodId: true,
  name: true,
  portion: true,
  nutrition: true
})

export const foodUserSchema = z.object({
  categories: categorySetupSchema.shape.categories,
  allergies: allergySetupSchema.shape.allergies
})

export const createFoodSchema = baseFoodSchema.pick({
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

export const informationFoodSchema = baseFoodSchema.pick({
  // foodType: true,
  // mealType: true,
  // dishType: true,

  name: true,
  description: true,

  isPublic: true
})

export const portionFoodSchema = baseFoodSchema.pick({
  portion: true
})

export const nutritionFoodSchema = baseFoodSchema.pick({
  nutrition: true
})

export const updateFoodSchema = baseFoodSchema.pick({
  name: true,
  description: true,

  isPublic: true
})

export type FoodAllergyType = z.infer<typeof foodAllergySchema>
export type FoodPortionType = z.infer<typeof foodPortionSchema>

export type FoodType = z.infer<typeof foodSchema>
export type FoodSaveType = z.infer<typeof foodSaveSchema>
export type FoodUserType = z.infer<typeof foodUserSchema>
export type CreateFoodType = z.infer<typeof createFoodSchema>
export type UpdateFoodType = z.infer<typeof updateFoodSchema>
