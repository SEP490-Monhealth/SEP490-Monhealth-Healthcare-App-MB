import { z } from "zod"

const foodSchema = z.object({
  foodId: z.string(),
  categoryId: z.string(),
  foodName: z
    .string()
    .nonempty({ message: "Tên món ăn không được để trống" })
    .max(100, { message: "Tên món ăn không được dài hơn 100 ký tự" }),
  createdAt: z.string(),
  updatedAt: z.string(),
  createdBy: z.string(),
  updatedBy: z.string()
})

const createUpdateFoodSchema = foodSchema.omit({
  foodId: true,
  createdAt: true,
  updatedAt: true,
  createdBy: true,
  updatedBy: true
})

export type FoodType = z.infer<typeof foodSchema>
export type CreateUpdateFoodType = z.infer<typeof createUpdateFoodSchema>
