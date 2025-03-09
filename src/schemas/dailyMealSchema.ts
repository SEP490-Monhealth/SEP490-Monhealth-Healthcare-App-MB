import { z } from "zod"

import { MealTypeEnum } from "@/constants/enum/MealType"

import { timestampFields, uuidSchema } from "./baseSchema"
import { nutritionSchema } from "./nutritionSchema"

const MealTypeSchemaEnum = z.nativeEnum(MealTypeEnum)

const mealFoodSchema = z.object({
  mealFoodId: uuidSchema,

  type: MealTypeSchemaEnum,

  foods: z.number(),

  calories: z
    .number()
    .min(1, { message: "Calories phải lớn hơn hoặc bằng 1" })
    .max(10000, { message: "Calories không được vượt quá 10,000" }),
  protein: z
    .number()
    .min(1, { message: "Protein phải lớn hơn hoặc bằng 1" })
    .max(500, { message: "Protein không được vượt quá 500g" }),
  carbs: z
    .number()
    .min(1, { message: "Carbs phải lớn hơn hoặc bằng 1" })
    .max(1000, { message: "Carbs không được vượt quá 1,000g" }),
  fat: z
    .number()
    .min(1, { message: "Chất béo phải lớn hơn hoặc bằng 1" })
    .max(500, { message: "Chất béo không được vượt quá 500g" }),

  ...timestampFields
})

export const dailyMealSchema = z.object({
  dailyMealId: uuidSchema,
  userId: uuidSchema,

  nutrition: nutritionSchema,

  items: z.array(mealFoodSchema),

  ...timestampFields
})

export type MealItemsType = z.infer<typeof mealFoodSchema>
export type DailyMealType = z.infer<typeof dailyMealSchema>
