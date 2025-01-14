import { z } from "zod"

import { nutritionSchema } from "./nutritionSchema"

const mealItemsSchema = z.object({
  mealId: z.string(),

  type: z
    .string()
    .refine((val) => ["Breakfast", "Lunch", "Dinner", "Snack"].includes(val), {
      message:
        "Loại bữa ăn không hợp lệ. Chỉ chấp nhận: Breakfast, Lunch, Dinner, Snack"
    }),

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

export const dailyMealSchema = z.object({
  dailyMealId: z.string(),
  userId: z.string(),

  nutrition: nutritionSchema,

  items: z.array(mealItemsSchema),

  createdAt: z.string(),
  updatedAt: z.string(),
  createdBy: z.string(),
  updatedBy: z.string()
})

export type MealItemsType = z.infer<typeof mealItemsSchema>
export type DailyMealType = z.infer<typeof dailyMealSchema>
