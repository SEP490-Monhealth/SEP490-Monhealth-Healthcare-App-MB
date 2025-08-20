import { z } from "zod"

import { uuidSchema } from "./commonValidation"

const foodSchema = z.object({
  id: uuidSchema,
  categoryId: uuidSchema,

  name: z
    .string()
    .nonempty("Tên thực phẩm không được để trống")
    .min(2, "Tên thực phẩm phải có ít nhất 2 ký tự")
    .max(100, "Tên thực phẩm không được vượt quá 100 ký tự"),
  nameEn: z
    .string()
    .nonempty("Tên thực phẩm tiếng Anh không được để trống")
    .min(2, "Tên thực phẩm tiếng Anh phải có ít nhất 2 ký tự")
    .max(100, "Tên thực phẩm tiếng Anh không được vượt quá 100 ký tự")
    .optional(),
  brand: z.string().max(50, "Tên thương hiệu không được vượt quá 50 ký tự").optional(),
  barcode: z
    .string()
    .nonempty("Mã vạch không được để trống")
    .min(8, "Mã vạch phải có ít nhất 8 ký tự")
    .max(20, "Mã vạch không được vượt quá 20 ký tự")
    .regex(/^\d+$/, "Mã vạch chỉ được chứa số")
    .optional(),
  description: z.string().max(300, "Mô tả không được vượt quá 300 ký tự").optional(),

  imageUrl: z.url("Image URL phải là URL hợp lệ").max(500, "Image URL không được vượt quá 500 ký tự").optional(),

  referenceUrl: z
    .url("URL tham khảo thực phẩm không hợp lệ")
    .max(500, "URL tham khảo thực phẩm không được vượt quá 500 ký tự")
    .optional(),

  viewCount: z.number().int("Số lượt xem phải là số nguyên").default(0),
  usageCount: z.number().int("Số lần sử dụng phải là số nguyên").default(0),

  isVerified: z.boolean().default(false),
  isPublic: z.boolean().default(true),
  isActive: z.boolean().default(true),

  createdAt: z.date(),
  updatedAt: z.date(),
  createdBy: z.string(),
  updatedBy: z.string()
})

export type Food = z.infer<typeof foodSchema>
