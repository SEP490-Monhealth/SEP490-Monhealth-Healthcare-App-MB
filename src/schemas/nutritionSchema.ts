import { z } from "zod"

const baseNutritionSchema = z.object({
  nutritionId: z.string(),
  foodId: z.string(),

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
    .max(500, { message: "Chất béo không được vượt quá 500g" }),
  fiber: z
    .number()
    .min(1, { message: "Chất xơ phải lớn hơn hoặc bằng 1" })
    .max(500, { message: "Chất xơ không được vượt quá 500g" }),
  sugar: z
    .number()
    .min(1, { message: "Đường phải lớn hơn hoặc bằng 1" })
    .max(500, { message: "Đường không được vượt quá 500g" }),

  saturatedFat: z.number().optional(),
  unsaturatedFat: z.number().optional(),
  cholesterol: z.number().optional(),
  sodium: z.number().optional(),
  potassium: z.number().optional(),
  calcium: z.number().optional(),
  iron: z.number().optional(),
  vitaminA: z.number().optional(),
  vitaminB1: z.number().optional(),
  vitaminB2: z.number().optional(),
  vitaminC: z.number().optional(),
  vitaminD: z.number().optional(),
  vitaminE: z.number().optional(),

  createdAt: z.string(),
  updatedAt: z.string(),
  createdBy: z.string(),
  updatedBy: z.string()
})

export const nutritionSchema = baseNutritionSchema.omit({
  nutritionId: true,
  foodId: true,
  createdAt: true,
  updatedAt: true,
  createdBy: true,
  updatedBy: true
})

export const nutritionFoodSchema = baseNutritionSchema.pick({
  calories: true
})

export const createUpdateNutritionSchema = baseNutritionSchema.omit({
  nutritionId: true,
  foodId: true,
  createdAt: true,
  updatedAt: true,
  createdBy: true,
  updatedBy: true
})

export type NutritionType = z.infer<typeof nutritionSchema>
export type CreateUpdateNutritionType = z.infer<
  typeof createUpdateNutritionSchema
>
