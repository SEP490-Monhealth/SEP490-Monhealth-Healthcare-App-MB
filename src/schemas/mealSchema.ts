import { z } from "zod"

import { timestampSchema } from "./commonSchema"
import { nutritionFoodSchema, nutritionSchema } from "./nutritionSchema"
import { portionSchema } from "./portionSchema"

const meals = ["Breakfast", "Lunch", "Dinner", "Snack"]

const mealFoodSchema = z
  .object({
    mealFoodId: z.string(),
    foodId: z.string(),

    name: z
      .string()
      .nonempty({ message: "Tên món ăn không được để trống" })
      .max(100, { message: "Tên món ăn không được dài hơn 100 ký tự" })
      .regex(/^[a-zA-Z0-9\s\u00C0-\u024F\u1E00-\u1EFF]*$/, {
        message: "Tên món ăn chỉ được chứa chữ cái, số và khoảng trắng"
      }),

    quantity: z
      .number()
      .min(1, { message: "Số lượng phải lớn hơn hoặc bằng 1" }),

    portion: portionSchema,

    nutrition: nutritionFoodSchema,

    status: z.boolean()
  })
  .merge(timestampSchema)

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

export const mealSchema = z
  .object({
    mealId: z.string(),
    userId: z.string(),

    type: z.string().refine((val) => meals.includes(val), {
      message:
        "Loại bữa ăn không hợp lệ. Chỉ chấp nhận: Breakfast, Lunch, Dinner, Snack"
    }),

    nutrition: nutritionSchema
  })
  .merge(timestampSchema)

export const createMealSchema = z.object({
  userId: z.string(),

  type: z.string().refine((val) => meals.includes(val), {
    message:
      "Bữa ăn phải là một trong các giá trị: Breakfast, Lunch, Dinner, Snack"
  }),

  items: z.array(createMealFoodSchema)
})

export type MealFoodType = z.infer<typeof mealFoodSchema>
export type CreateMealFoodType = z.infer<typeof createMealFoodSchema>

export type MealType = z.infer<typeof mealSchema>
export type CreateMealType = z.infer<typeof createMealSchema>
