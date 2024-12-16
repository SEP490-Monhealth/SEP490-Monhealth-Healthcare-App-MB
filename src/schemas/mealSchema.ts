import { z } from "zod"

export const mealFoodSchema = z.object({
  mealFoodId: z.string(),
  // mealId: z.string(),
  foodId: z.string(),
  foodName: z
    .string()
    .nonempty({ message: "Tên món ăn không được để trống" })
    .max(100, { message: "Tên món ăn không được dài hơn 100 ký tự" })
    .regex(/^[a-zA-Z0-9\s\u00C0-\u024F\u1E00-\u1EFF]*$/, {
      message: "Tên món ăn chỉ được chứa chữ cái, số và khoảng trắng"
    }),

  portionSize: z.string().optional(),
  portionWeight: z
    .number()
    .positive({ message: "Khối lượng phần ăn phải là số dương" })
    .max(10000, {
      message: "Khối lượng phần ăn không được vượt quá 10,000 gram"
    }),
  measurementUnit: z
    .string()
    .min(1, { message: "Đơn vị đo lường không được để trống" })
    .max(20, { message: "Đơn vị đo lường không được dài hơn 20 ký tự" }),

  calories: z
    .number()
    .positive({ message: "Calories phải là một số dương" })
    .max(10000, { message: "Calories không được vượt quá 10,000" })
})

export const mealSchema = z.object({
  mealId: z.string(),
  // dailyMealId: z.string(),
  // userId: z.string(),
  mealType: z.enum(["Breakfast", "Lunch", "Dinner", "Snack"], {
    message: "Loại bữa ăn không hợp lệ"
  }),

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

  mealFoods: z.array(mealFoodSchema),

  createdAt: z.string(),
  updatedAt: z.string()
})

export const createUpdateMealSchema = mealSchema.omit({
  mealId: true,
  
  calories: true,
  protein: true,
  carbs: true,
  fat: true,
  fiber: true,
  sugar: true,

  createdAt: true,
  updatedAt: true
})

export type MealType = z.infer<typeof mealSchema>
export type CreateUpdateMealType = z.infer<typeof createUpdateMealSchema>
