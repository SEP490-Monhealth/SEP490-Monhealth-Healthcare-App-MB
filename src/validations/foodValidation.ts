import { z } from "zod"

import { auditSchema, uuidSchema } from "./commonValidation"

const foodSchema = z.object({
  id: uuidSchema,
  categoryId: uuidSchema,

  name: z
    .string()
    .nonempty({ error: "Tên thực phẩm không được để trống" })
    .min(3, { error: "Tên thực phẩm phải có ít nhất 3 ký tự" })
    .max(50, { error: "Tên thực phẩm không được vượt quá 50 ký tự" }),
  nameEn: z
    .string()
    .nonempty({ error: "Tên thực phẩm tiếng Anh không được để trống" })
    .min(3, { error: "Tên thực phẩm tiếng Anh phải có ít nhất 3 ký tự" })
    .max(50, { error: "Tên thực phẩm tiếng Anh không được vượt quá 50 ký tự" })
    .optional(),
  brand: z.string().max(50, { error: "Tên thương hiệu không được vượt quá 50 ký tự" }).optional(),
  barcode: z
    .string()
    .nonempty({ error: "Mã vạch không được để trống" })
    .min(8, { error: "Mã vạch phải có ít nhất 8 ký tự" })
    .max(20, { error: "Mã vạch không được vượt quá 20 ký tự" })
    .regex(/^\d+$/, { error: "Mã vạch chỉ được chứa số" })
    .optional(),
  description: z.string().max(200, { error: "Mô tả không được vượt quá 200 ký tự" }).optional(),

  imageUrl: z
    .url({ error: "Image URL phải là URL hợp lệ" })
    .max(500, { error: "Image URL không được vượt quá 500 ký tự" })
    .optional(),

  referenceUrl: z
    .url({ error: "URL tham khảo thực phẩm không hợp lệ" })
    .max(500, { error: "URL tham khảo thực phẩm không được vượt quá 500 ký tự" })
    .optional(),

  viewCount: z.number().int().nonnegative({ error: "Số lượt xem không được âm" }).default(0),
  usageCount: z.number().int().nonnegative({ error: "Số lần sử dụng không được âm" }).default(0),

  isVerified: z.boolean().default(false),
  isPublic: z.boolean().default(true),
  isActive: z.boolean().default(true),

  ...auditSchema.shape
})

export type Food = z.infer<typeof foodSchema>
