import { z } from "zod"

const categorySchema = z.object({
  categoryId: z.string(),
  categoryName: z
    .string()
    .nonempty({ message: "Tên danh mục không được để trống" })
    .max(100, { message: "Tên danh mục không được dài hơn 100 ký tự" }),
  createdAt: z.string(),
  updatedAt: z.string()
})

export type CategoryType = z.infer<typeof categorySchema>
