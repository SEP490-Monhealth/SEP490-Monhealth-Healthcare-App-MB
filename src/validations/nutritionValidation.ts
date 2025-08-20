import { z } from "zod"

import { auditSchema, uuidSchema } from "./commonValidation"

const nutritionSchema = z
  .object({
    id: uuidSchema,
    foodId: uuidSchema,

    calories: z
      .number()
      .nonnegative({ error: "Lượng calo không được âm" })
      .max(900, { error: "Lượng calo trên 100g không được vượt quá 900 kcal" })
      .default(0),
    protein: z
      .number()
      .nonnegative({ error: "Lượng protein không được âm" })
      .max(100, { error: "Lượng protein trên 100g không được vượt quá 100g" })
      .default(0),
    carbs: z
      .number()
      .nonnegative({ error: "Lượng carbs không được âm" })
      .max(100, { error: "Lượng carbs trên 100g không được vượt quá 100g" })
      .default(0),
    fat: z
      .number()
      .nonnegative({ error: "Lượng chất béo không được âm" })
      .max(100, { error: "Lượng chất béo trên 100g không được vượt quá 100g" })
      .default(0),
    fiber: z
      .number()
      .nonnegative({ error: "Lượng chất xơ không được âm" })
      .max(50, { error: "Lượng chất xơ trên 100g không được vượt quá 50g" })
      .default(0),
    sugar: z
      .number()
      .nonnegative({ error: "Lượng đường không được âm" })
      .max(100, { error: "Lượng đường trên 100g không được vượt quá 100g" })
      .default(0),
    sodium: z
      .number()
      .nonnegative({ error: "Lượng natri không được âm" })
      .max(10000, { error: "Lượng natri trên 100g không được vượt quá 10000mg" })
      .default(0),

    ...auditSchema.shape
  })
  .refine(
    (data) => {
      const total = data.protein + data.carbs + data.fat
      return total <= 100
    },
    {
      error: "Tổng protein, carbs và chất béo không được vượt quá 100g",
      path: ["fat"]
    }
  )

export type Nutrition = z.infer<typeof nutritionSchema>
