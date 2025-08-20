import { z } from "zod"

import { auditSchema, uuidSchema } from "./commonValidation"

const allergySchema = z.object({
  id: uuidSchema,

  name: z
    .string()
    .nonempty({ error: "Tên dị ứng không được để trống" })
    .min(3, { error: "Tên dị ứng phải có ít nhất 3 ký tự" })
    .max(50, { error: "Tên dị ứng không được vượt quá 50 ký tự" }),
  nameEn: z
    .string()
    .nonempty({ error: "Tên dị ứng tiếng Anh không được để trống" })
    .min(3, { error: "Tên dị ứng tiếng Anh phải có ít nhất 3 ký tự" })
    .max(50, { error: "Tên dị ứng tiếng Anh không được vượt quá 50 ký tự" })
    .optional(),
  description: z.string().max(200, { error: "Mô tả dị ứng không được vượt quá 200 ký tự" }).optional(),

  iconUrl: z
    .url({ error: "URL biểu tượng dị ứng không hợp lệ" })
    .max(500, { error: "URL biểu tượng dị ứng không được vượt quá 500 ký tự" })
    .optional(),

  isActive: z.boolean().default(true),

  ...auditSchema.shape
})

export type Allergy = z.infer<typeof allergySchema>
