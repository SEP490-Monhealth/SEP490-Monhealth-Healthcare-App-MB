import { z } from "zod"

import { uuidSchema } from "./commonValidation"

const allergySchema = z.object({
  id: uuidSchema,

  name: z
    .string()
    .nonempty("Tên dị ứng không được để trống")
    .min(2, "Tên dị ứng phải có ít nhất 2 ký tự")
    .max(50, "Tên dị ứng không được vượt quá 50 ký tự"),
  nameEn: z
    .string()
    .nonempty("Tên dị ứng tiếng Anh không được để trống")
    .min(2, "Tên dị ứng tiếng Anh phải có ít nhất 2 ký tự")
    .max(50, "Tên dị ứng tiếng Anh không được vượt quá 50 ký tự")
    .optional(),
  description: z.string().max(200, "Mô tả dị ứng không được vượt quá 200 ký tự").optional(),

  iconUrl: z
    .url("URL biểu tượng dị ứng không hợp lệ")
    .max(500, "URL biểu tượng dị ứng không được vượt quá 500 ký tự")
    .optional(),

  isActive: z.boolean().default(true),

  createdAt: z.date(),
  updatedAt: z.date(),
  createdBy: z.string(),
  updatedBy: z.string()
})

export type Allergy = z.infer<typeof allergySchema>
