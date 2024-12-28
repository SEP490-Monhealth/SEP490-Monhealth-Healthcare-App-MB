import { z } from "zod"

import { nutritionFoodSchema, nutritionSchema } from "./nutritionSchema"
import { portionSchema } from "./portionSchema"

export const mealFoodSchema = z.object({
  mealFoodId: z.string(),
  // mealId: z.string(),
  foodId: z.string(),
  name: z
    .string()
    .nonempty({ message: "Tên món ăn không được để trống" })
    .max(100, { message: "Tên món ăn không được dài hơn 100 ký tự" })
    .regex(/^[a-zA-Z0-9\s\u00C0-\u024F\u1E00-\u1EFF]*$/, {
      message: "Tên món ăn chỉ được chứa chữ cái, số và khoảng trắng"
    }),

  quantity: z.number().min(0, { message: "Số lượng phải là một số không âm" }),

  portion: portionSchema,

  calories: z
    .number()
    .positive({ message: "Calories phải là một số dương" })
    .max(10000, { message: "Calories không được vượt quá 10,000" })
})

export const mealSchema = z.object({
  mealId: z.string(),
  // dailyMealId: z.string(),
  userId: z.string(),
  type: z
    .string()
    .refine((val) => ["Breakfast", "Lunch", "Dinner", "Snack"].includes(val), {
      message:
        "Bữa ăn phải là một trong các giá trị: Breakfast, Lunch, Dinner, Snack"
    }),

  nutrition: nutritionSchema,

  mealFoods: z.array(mealFoodSchema),

  createdAt: z.string(),
  updatedAt: z.string(),
  createdBy: z.string(),
  updatedBy: z.string()
})

export type MealType = z.infer<typeof mealSchema>
