import { z } from "zod"

import { MealType as MealTypeEnum } from "@/constants/enums/MealType"

import { timestampSchema, uuidSchema } from "./commonValidation"

const mealSchema = z.object({
  id: uuidSchema,
  userId: uuidSchema,

  type: z.enum(MealTypeEnum, { error: "Loại bữa ăn không hợp lệ" }),

  date: z.date({ error: "Ngày không hợp lệ" }),
  name: z
    .string()
    .nonempty({ error: "Tên bữa ăn không được để trống" })
    .min(3, { error: "Tên bữa ăn phải có ít nhất 3 ký tự" })
    .max(50, { error: "Tên bữa ăn không được vượt quá 50 ký tự" })
    .optional(),
  notes: z.string().max(200, { error: "Ghi chú bữa ăn không được vượt quá 200 ký tự" }).optional(),

  totalCalories: z.number().nonnegative({ error: "Tổng calo không được âm" }).default(0),
  totalProtein: z.number().nonnegative({ error: "Tổng protein không được âm" }).default(0),
  totalCarbs: z.number().nonnegative({ error: "Tổng carbs không được âm" }).default(0),
  totalFat: z.number().nonnegative({ error: "Tổng chất béo không được âm" }).default(0),
  totalFiber: z.number().nonnegative({ error: "Tổng chất xơ không được âm" }).default(0),
  totalSugar: z.number().nonnegative({ error: "Tổng đường không được âm" }).default(0),
  totalSodium: z.number().nonnegative({ error: "Tổng natri không được âm" }).default(0),

  isCompleted: z.boolean().default(false),
  completedAt: z.date().optional(),

  ...timestampSchema.shape
})

export const createMealSchema = mealSchema.pick({
  type: true,
  date: true,
  name: true,
  notes: true
})

export const updateMealNameSchema = mealSchema.pick({
  name: true
})

export const updateMealNoteSchema = mealSchema.pick({
  notes: true
})

export type Meal = z.infer<typeof mealSchema>
export type CreateMeal = z.infer<typeof createMealSchema>
export type UpdateMealName = z.infer<typeof updateMealNameSchema>
export type UpdateMealNote = z.infer<typeof updateMealNoteSchema>
