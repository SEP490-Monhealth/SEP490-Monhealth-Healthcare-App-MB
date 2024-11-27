import { z } from "zod"

const mealFoodSchema = z.object({
  mealFoodId: z.string(),
  mealId: z.string(),
  foodId: z.string(),
  portionSize: z
    .string()
    .min(1, { message: "Kích cỡ phần ăn không được để trống" })
    .max(50, { message: "Kích cỡ phần ăn không được dài hơn 50 ký tự" }),
  createdAt: z.string(),
  updatedAt: z.string()
})

const mealSchema = z.object({
  mealId: z.string(),
  dailyMealId: z.string(),
  userId: z.string(),
  mealType: z.enum(["Breakfast", "Lunch", "Dinner", "Snack"], {
    message: "Loại bữa ăn không hợp lệ"
  }),
  createdAt: z.string(),
  updatedAt: z.string()
})

const createUpdateMealSchema = mealSchema.omit({
  mealId: true,
  createdAt: true,
  updatedAt: true
})

export type MealType = z.infer<typeof mealSchema>
export type CreateUpdateMealType = z.infer<typeof createUpdateMealSchema>
