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
  fat: z
    .number()
    .positive({ message: "Fat phải là một số dương" })
    .max(500, { message: "Fat không được vượt quá 500g" }),
  fiber: z
    .number()
    .positive({ message: "Fiber phải là một số dương" })
    .max(100, { message: "Fiber không được vượt quá 100g" }),
  sugar: z
    .number()
    .positive({ message: "Sugar phải là một số dương" })
    .max(500, { message: "Sugar không được vượt quá 500g" }),

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
