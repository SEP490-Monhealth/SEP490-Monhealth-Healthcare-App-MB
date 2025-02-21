import { z } from "zod"

import { TypeCategoryEnum } from "@/constants/enums"

import { timestampSchema } from "./commonSchema"

const CategoryTypeEnum = z.nativeEnum(TypeCategoryEnum)

const baseCategorySchema = z
  .object({
    categoryId: z.string(),

    type: CategoryTypeEnum,

    name: z
      .string()
      .nonempty({ message: "Tên danh mục không được để trống" })
      .max(100, { message: "Tên danh mục không được dài hơn 100 ký tự" })
      .regex(/^[a-zA-Z0-9\s\u00C0-\u024F\u1E00-\u1EFF]*$/, {
        message: "Tên danh mục chỉ được chứa chữ cái, số và khoảng trắng"
      }),
    description: z
      .string()
      .max(500, {
        message: "Mô tả danh mục không được dài hơn 500 ký tự"
      })
      .optional(),

    image: z.string().optional()
  })
  .merge(timestampSchema)

export const categorySchema = baseCategorySchema

export const categorySetupSchema = z.object({
  categories: z
    .array(categorySchema.shape.name)
    .min(5, { message: "Bạn phải chọn ít nhất 5 danh mục" })
})

export type CategoryType = z.infer<typeof categorySchema>
