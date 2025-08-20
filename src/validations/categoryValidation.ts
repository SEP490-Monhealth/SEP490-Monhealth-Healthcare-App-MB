import { z } from "zod"

import { auditSchema, uuidSchema } from "./commonValidation"

const categorySchema = z.object({
  id: uuidSchema,

  name: z
    .string()
    .nonempty({ error: "Tên danh mục không được để trống" })
    .min(3, { error: "Tên danh mục phải có ít nhất 3 ký tự" })
    .max(50, { error: "Tên danh mục không được vượt quá 50 ký tự" }),
  nameEn: z
    .string()
    .nonempty({ error: "Tên danh mục tiếng Anh không được để trống" })
    .min(3, { error: "Tên danh mục tiếng Anh phải có ít nhất 3 ký tự" })
    .max(50, { error: "Tên danh mục tiếng Anh không được vượt quá 50 ký tự" })
    .optional(),
  description: z.string().max(200, { error: "Mô tả không được vượt quá 200 ký tự" }).optional(),

  iconUrl: z
    .url({ error: "URL biểu tượng danh mục không hợp lệ" })
    .max(500, { error: "URL biểu tượng danh mục không được vượt quá 500 ký tự" })
    .optional(),

  sortOrder: z.number().int({ error: "Thứ tự phải là số nguyên" }).default(0),

  isActive: z.boolean().default(true),

  ...auditSchema.shape
})

export type Category = z.infer<typeof categorySchema>
