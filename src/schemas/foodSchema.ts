import { z } from "zod"

export const foodSchema = z.object({
  foodId: z.string(),
  category: z.string(),
  foodName: z
    .string()
    .nonempty({ message: "Tên món ăn không được để trống" })
    .max(100, { message: "Tên món ăn không được dài hơn 100 ký tự" })
    .regex(/^[a-zA-Z0-9\s\u00C0-\u024F\u1E00-\u1EFF]*$/, {
      message: "Tên món ăn chỉ được chứa chữ cái, số và khoảng trắng"
    }),
  foodDescription: z.string().optional(),

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

export const createUpdateFoodSchema = foodSchema.omit({
  foodId: true,
  createdAt: true,
  updatedAt: true,
  createdBy: true,
  updatedBy: true
})

export type FoodType = z.infer<typeof foodSchema>
export type CreateUpdateFoodType = z.infer<typeof createUpdateFoodSchema>
