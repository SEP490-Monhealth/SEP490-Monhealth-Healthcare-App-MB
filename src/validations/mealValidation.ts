import { z } from "zod"

import { MealType as MealTypeEnum } from "@/constants/enums/MealType"

import { uuidSchema } from "./commonValidation"

const mealSchema = z.object({
  id: uuidSchema,
  userId: uuidSchema,

  type: z.enum(Object.values(MealTypeEnum) as [string, ...string[]]),

  date: z.string().nonempty("Ngày không được để trống").date("Ngày không hợp lệ"),
  name: z
    .string()
    .nonempty("Tên bữa ăn không được để trống")
    .min(2, "Tên bữa ăn phải có ít nhất 2 ký tự")
    .max(60, "Tên bữa ăn không được vượt quá 60 ký tự")
    .optional(),
  notes: z.string().max(300, "Ghi chú bữa ăn không được vượt quá 300 ký tự").optional(),

  totalCalories: z.number().default(0),
  totalProtein: z.number().default(0),
  totalCarbs: z.number().default(0),
  totalFat: z.number().default(0),
  totalFiber: z.number().default(0),
  totalSugar: z.number().default(0),
  totalSodium: z.number().default(0),

  isCompleted: z.boolean().default(false),
  completedAt: z.date().optional(),

  createdAt: z.date(),
  updatedAt: z.date()
})

export type Meal = z.infer<typeof mealSchema>
