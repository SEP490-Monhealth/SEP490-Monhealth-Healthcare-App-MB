import { z } from "zod"

import { DishEnum, FoodEnum, MealEnum } from "@/constants/enums"

import { allergySetupSchema } from "./allergySchema"
import { categorySetupSchema } from "./categorySchema"
import { auditSchema, timestampSchema } from "./commonSchema"
import { nutritionSchema } from "./nutritionSchema"
import { portionSchema } from "./portionSchema"

const FoodTypeEnum = z.nativeEnum(FoodEnum)
const MealTypeEnum = z.nativeEnum(MealEnum)
const DishTypeEnum = z.nativeEnum(DishEnum)

export const foodAllergySchema = z
  .object({
    foodAllergyId: z.string(),
    foodId: z.string(),
    allergyId: z.string()
  })
  .merge(timestampSchema)

export const foodPortionSchema = z
  .object({
    foodPortionId: z.string(),
    foodId: z.string(),
    portionId: z.string()
  })
  .merge(timestampSchema)

const baseFoodSchema = z
  .object({
    foodId: z.string(),
    category: z.string(),
    userId: z.string(),

    foodType: FoodTypeEnum,
    mealType: z
      .array(MealTypeEnum)
      .min(1, { message: "Bạn cần chọn ít nhất một bữa ăn" }),
    dishType: z
      .array(DishTypeEnum)
      .min(1, { message: "Bạn cần chọn ít nhất một loại món ăn" }),

    name: z
      .string()
      .nonempty({ message: "Tên món ăn không được để trống" })
      .max(100, { message: "Tên món ăn không được dài hơn 100 ký tự" })
      .regex(/^[a-zA-Z0-9\s\u00C0-\u024F\u1E00-\u1EFF]*$/, {
        message: "Tên món ăn chỉ được chứa chữ cái, số và khoảng trắng"
      }),
    description: z
      .string()
      .nonempty({ message: "Mô tả món ăn không được để trống" })
      .max(500, { message: "Mô tả món ăn không được dài hơn 500 ký tự" }),

    portion: portionSchema,

    nutrition: nutritionSchema,

    isPublic: z.boolean(),

    status: z.boolean()
  })
  .merge(auditSchema)

export const foodSchema = baseFoodSchema
  .pick({
    foodId: true,
    userId: true,
    // foodType: true,
    mealType: true,
    dishType: true,
    category: true,
    name: true,
    description: true,
    portion: true,
    nutrition: true,
    isPublic: true,
    status: true
  })
  .merge(auditSchema)

export const foodSaveSchema = baseFoodSchema.pick({
  foodId: true,
  name: true,
  portion: true,
  nutrition: true
})

export const foodUserSchema = z.object({
  categories: categorySetupSchema.shape.categories,
  allergies: allergySetupSchema.shape.allergies
})

export const createFoodSchema = baseFoodSchema.pick({
  userId: true,
  // foodType: true,
  // mealType: true,
  // dishType: true,
  name: true,
  description: true,
  portion: true,
  nutrition: true,
  isPublic: true
})

export const informationFoodSchema = baseFoodSchema.pick({
  // foodType: true,
  // mealType: true,
  // dishType: true,
  name: true,
  description: true,
  isPublic: true
})

export const portionFoodSchema = baseFoodSchema.pick({
  portion: true
})

export const nutritionFoodSchema = baseFoodSchema.pick({
  nutrition: true
})

export const updateFoodSchema = baseFoodSchema.pick({
  name: true,
  description: true,
  isPublic: true
})

export type FoodAllergyType = z.infer<typeof foodAllergySchema>
export type FoodPortionType = z.infer<typeof foodPortionSchema>

export type FoodType = z.infer<typeof foodSchema>
export type FoodSaveType = z.infer<typeof foodSaveSchema>
export type FoodUserType = z.infer<typeof foodUserSchema>
export type CreateFoodType = z.infer<typeof createFoodSchema>
export type UpdateFoodType = z.infer<typeof updateFoodSchema>
