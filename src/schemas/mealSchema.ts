import { z } from "zod"

import { MealTypeSchemaEnum } from "@/constants/enum/Food"

import { timestampFields, uuidSchema } from "./baseSchema"
import { nutritionFoodSchema, nutritionSchema } from "./nutritionSchema"
import { portionSchema } from "./portionSchema"

export const mealFoodSchema = z.object({
  mealFoodId: uuidSchema,
  foodId: uuidSchema,

  name: z
    .string()
    .nonempty({ message: "Tên thức ăn không được để trống" })
    .max(50, { message: "Tên thức ăn không được dài hơn 50 ký tự" })
    .regex(/^[a-zA-Z0-9\s\u00C0-\u024F\u1E00-\u1EFF]*$/, {
      message: "Tên thức ăn chỉ được chứa chữ cái, số và khoảng trắng"
    }),

  quantity: z.number().min(1, { message: "Số lượng phải lớn hơn hoặc bằng 1" }),

  portion: portionSchema,

  nutrition: nutritionFoodSchema,

  isRecommended: z.boolean(),
  isCompleted: z.boolean(),

  ...timestampFields
})

const createMealFoodSchema = z.object({
  foodId: uuidSchema,

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

export const mealSchema = z.object({
  mealId: uuidSchema,
  userId: uuidSchema,

  type: MealTypeSchemaEnum,
  date: z.string().nonempty({ message: "Ngày không được để trống" }),

  nutrition: nutritionSchema,

  ...timestampFields
})

export const createMealSchema = z.object({
  userId: uuidSchema,

  type: MealTypeSchemaEnum,
  date: z.string().nonempty({ message: "Ngày không được để trống" }),

  items: z.array(createMealFoodSchema)
})

export type MealFoodType = z.infer<typeof mealFoodSchema>
export type CreateMealFoodType = z.infer<typeof createMealFoodSchema>

export type MealType = z.infer<typeof mealSchema>
export type CreateMealType = z.infer<typeof createMealSchema>
