import { z } from "zod"

const categorySchema = z.object({
  categoryId: z.string(),
  categoryName: z
    .string()
    .nonempty({ message: "Tên danh mục không được để trống" })
    .max(100, { message: "Tên danh mục không được dài hơn 100 ký tự" })
    .regex(/^[a-zA-Z0-9\s\u00C0-\u024F\u1E00-\u1EFF]*$/, {
      message: "Tên danh mục chỉ được chứa chữ cái, số và khoảng trắng"
    }),
  createdAt: z.string(),
  updatedAt: z.string()
})

export type CategoryType = z.infer<typeof categorySchema>
