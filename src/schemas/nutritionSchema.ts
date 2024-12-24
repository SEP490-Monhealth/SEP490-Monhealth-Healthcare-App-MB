import { z } from "zod"

const baseNutritionSchema = z.object({
  nutritionId: z.string(),
  foodId: z.string(),

  calories: z
    .number()
    .positive({ message: "Calories phải là một số dương" })
    .max(10000, { message: "Calories không được vượt quá 10,000" }),
  protein: z
    .number()
    .positive({ message: "Protein phải là một số dương" })
    .max(500, { message: "Protein không được vượt quá 500g" }),
  carbs: z
    .number()
    .positive({ message: "Carbs phải là một số dương" })
    .max(1000, { message: "Carbs không được vượt quá 1,000g" }),
  fiber: z
    .number()
    .positive({ message: "Fiber phải là một số dương" })
    .max(500, { message: "Fiber không được vượt quá 500g" }),
  sugar: z
    .number()
    .positive({ message: "Sugar phải là một số dương" })
    .max(500, { message: "Sugar không được vượt quá 500g" }),
  fat: z
    .number()
    .positive({ message: "Fat phải là một số dương" })
    .max(500, { message: "Fat không được vượt quá 500g" }),
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
