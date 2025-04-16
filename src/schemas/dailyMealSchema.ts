import { z } from "zod"

import { MealTypeEnum } from "@/constants/enum/Food"

import { timestampFields, uuidSchema } from "./baseSchema"
import { goalSchema } from "./goalSchema"
import { nutritionSchema } from "./nutritionSchema"

const MealTypeSchemaEnum = z.nativeEnum(MealTypeEnum)

const mealFoodSchema = z.object({
  mealFoodId: uuidSchema,
  mealId: uuidSchema,
  foodId: uuidSchema,
  portionId: uuidSchema,

  type: MealTypeSchemaEnum,

  foods: z.number(),

  calories: nutritionSchema.shape.calories,
  protein: nutritionSchema.shape.protein,
  carbs: nutritionSchema.shape.carbs,
  fat: nutritionSchema.shape.fat,

  ...timestampFields
})

export const dailyMealSchema = z.object({
  dailyMealId: uuidSchema,
  userId: uuidSchema,
  goalId: uuidSchema,

  goalType: goalSchema.shape.type,
  date: z.string().nonempty({ message: "Ngày không được để trống" }),

  nutrition: nutritionSchema,

  items: z.array(mealFoodSchema),

  ...timestampFields
})

export type MealItemsType = z.infer<typeof mealFoodSchema>

export type DailyMealType = z.infer<typeof dailyMealSchema>
