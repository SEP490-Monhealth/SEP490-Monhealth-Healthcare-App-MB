import { z } from "zod"

import { nutritionFoodSchema, nutritionSchema } from "./nutritionSchema"
import { portionSchema } from "./portionSchema"

const mealFoodSchema = z.object({
  mealFoodId: z.string(),
  foodId: z.string(),
  name: z
    .string()
    .nonempty({ message: "Tên món ăn không được để trống" })
    .max(100, { message: "Tên món ăn không được dài hơn 100 ký tự" })
    .regex(/^[a-zA-Z0-9\s\u00C0-\u024F\u1E00-\u1EFF]*$/, {
      message: "Tên món ăn chỉ được chứa chữ cái, số và khoảng trắng"
    }),

  quantity: z.number().min(1, { message: "Số lượng phải lớn hơn hoặc bằng 1" }),

  portion: portionSchema,

  nutrition: nutritionFoodSchema,

  createdAt: z.string(),
  updatedAt: z.string(),
  createdBy: z.string(),
  updatedBy: z.string()
})

const createMealFoodSchema = z.object({
  foodId: z.string(),

  quantity: z.number().min(1, { message: "Số lượng phải lớn hơn hoặc bằng 1" }),

  size: z
    .string()
    .nonempty({ message: "Kích thước phần ăn không được để trống" }),
  weight: z
    .number()
    .min(1, { message: "Khối lượng phần ăn phải lớn hơn hoặc bằng 1 gram" })
    .max(10000, {
      message: "Khối lượng phần ăn không được vượt quá 10,000 gram"
    }),
  unit: z.string().nonempty({ message: "Đơn vị đo lường không được để trống" })
})

const mealSchema = z.object({
  mealId: z.string(),
  userId: z.string(),

  type: z
    .string()
    .refine((val) => ["Breakfast", "Lunch", "Dinner", "Snack"].includes(val), {
      message:
        "Bữa ăn phải là một trong các giá trị: Breakfast, Lunch, Dinner, Snack"
    }),

  nutrition: nutritionSchema,

  createdAt: z.string(),
  updatedAt: z.string(),
  createdBy: z.string(),
  updatedBy: z.string()
})

export const createMealSchema = z.object({
  userId: z.string(),

  type: z
    .string()
    .refine((val) => ["Breakfast", "Lunch", "Dinner", "Snack"].includes(val), {
      message:
        "Bữa ăn phải là một trong các giá trị: Breakfast, Lunch, Dinner, Snack"
    }),

  items: z.array(createMealFoodSchema)
})

export type MealFoodType = z.infer<typeof mealFoodSchema>
export type CreateMealFoodType = z.infer<typeof createMealFoodSchema>
export type MealType = z.infer<typeof mealSchema>
export type CreateMealType = z.infer<typeof createMealSchema>
