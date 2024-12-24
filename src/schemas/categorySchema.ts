import { z } from "zod"

export const baseCategorySchema = z.object({
  categoryId: z.string(),
  categoryName: z
    .string()
    .nonempty({ message: "Tên danh mục không được để trống" })
    .max(100, { message: "Tên danh mục không được dài hơn 100 ký tự" })
    .regex(/^[a-zA-Z0-9\s\u00C0-\u024F\u1E00-\u1EFF]*$/, {
      message: "Tên danh mục chỉ được chứa chữ cái, số và khoảng trắng"
    }),
  categoryDescription: z
    .string()
    .max(500, {
      message: "Mô tả danh mục không được dài hơn 500 ký tự"
    })
    .optional(),
  categoryImage: z.string().optional(),

  createdAt: z.string(),
  updatedAt: z.string(),
  createdBy: z.string(),
  updatedBy: z.string()
})

export const categorySchema = baseCategorySchema.pick({
  categoryId: true,
  categoryName: true,
  categoryDescription: true,
  categoryImage: true
})

export type CategoryType = z.infer<typeof categorySchema>
