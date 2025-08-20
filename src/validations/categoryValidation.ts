import { z } from "zod"

import { uuidSchema } from "./commonValidation"

const categorySchema = z.object({
  id: uuidSchema,

  name: z
    .string()
    .nonempty("Tên danh mục không được để trống")
    .min(2, "Tên danh mục phải có ít nhất 2 ký tự")
    .max(50, "Tên danh mục không được vượt quá 50 ký tự"),
  nameEn: z
    .string()
    .nonempty("Tên danh mục tiếng Anh không được để trống")
    .min(2, "Tên danh mục tiếng Anh phải có ít nhất 2 ký tự")
    .max(50, "Tên danh mục tiếng Anh không được vượt quá 50 ký tự")
    .optional(),
  description: z.string().max(200, "Mô tả không được vượt quá 200 ký tự").optional(),

  iconUrl: z
    .string()
    .url("URL biểu tượng danh mục không hợp lệ")
    .max(500, "URL biểu tượng danh mục không được vượt quá 500 ký tự")
    .optional(),

  sortOrder: z.number().int("Thứ tự phải là số nguyên").default(0),

  isActive: z.boolean().default(true),

  createdAt: z.date(),
  updatedAt: z.date(),
  createdBy: z.string(),
  updatedBy: z.string()
})

export type Category = z.infer<typeof categorySchema>
