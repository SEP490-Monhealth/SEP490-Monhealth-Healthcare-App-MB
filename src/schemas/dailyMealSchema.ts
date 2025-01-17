import { z } from "zod"

import { timestampSchema } from "./commonSchema"
import { nutritionSchema } from "./nutritionSchema"

const mealFoodSchema = z
  .object({
    mealFoodId: z.string(),

    type: z
      .string()
      .refine(
        (val) => ["Breakfast", "Lunch", "Dinner", "Snack"].includes(val),
        {
          message:
            "Loại bữa ăn không hợp lệ. Chỉ chấp nhận: Breakfast, Lunch, Dinner, Snack"
        }
      ),

    totalFoods: z.number(),

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
      .max(500, { message: "Chất béo không được vượt quá 500g" })
  })
  .merge(timestampSchema)

export const dailyMealSchema = z
  .object({
    dailyMealId: z.string(),
    userId: z.string(),

    nutrition: nutritionSchema,

    items: z.array(mealFoodSchema)
  })
  .merge(timestampSchema)

export type MealItemsType = z.infer<typeof mealFoodSchema>
export type DailyMealType = z.infer<typeof dailyMealSchema>
