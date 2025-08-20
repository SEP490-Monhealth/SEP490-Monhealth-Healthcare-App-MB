import { z } from "zod"

import { uuidSchema } from "./commonValidation"

const nutritionSchema = z
  .object({
    id: uuidSchema,
    foodId: uuidSchema,

    calories: z
      .number()
      .min(0, "Lượng calo không được âm")
      .max(900, "Lượng calo trên 100g không được vượt quá 900 kcal")
      .default(0),
    protein: z
      .number()
      .min(0, "Lượng protein không được âm")
      .max(100, "Lượng protein trên 100g không được vượt quá 100g")
      .default(0),
    carbs: z
      .number()
      .min(0, "Lượng carbs không được âm")
      .max(100, "Lượng carbs trên 100g không được vượt quá 100g")
      .default(0),
    fat: z
      .number()
      .min(0, "Lượng chất béo không được âm")
      .max(100, "Lượng chất béo trên 100g không được vượt quá 100g")
      .default(0),
    fiber: z
      .number()
      .min(0, "Lượng chất xơ không được âm")
      .max(50, "Lượng chất xơ trên 100g không được vượt quá 50g")
      .default(0),
    sugar: z
      .number()
      .min(0, "Lượng đường không được âm")
      .max(100, "Lượng đường trên 100g không được vượt quá 100g")
      .default(0),
    sodium: z
      .number()
      .min(0, "Lượng natri không được âm")
      .max(10000, "Lượng natri trên 100g không được vượt quá 10000mg")
      .default(0),

    createdAt: z.date(),
    createdBy: z.string(),
    updatedAt: z.date(),
    updatedBy: z.string()
  })
  .refine(
    (data) => {
      const total = data.protein + data.carbs + data.fat
      return total <= 100
    },
    {
      message: "Tổng protein, carbs và chất béo không được vượt quá 100g",
      path: ["fat"]
    }
  )

export type Nutrition = z.infer<typeof nutritionSchema>
