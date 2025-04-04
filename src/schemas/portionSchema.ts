import { z } from "zod"

import { auditFields, uuidSchema } from "./baseSchema"

export const portionSchema = z.object({
  portionId: uuidSchema,
  foodId: uuidSchema,

  size: z
    .string()
    .nonempty({ message: "Kích thước phần ăn không được để trống" }),
  weight: z
    .number()
    .min(1, { message: "Khối lượng phần ăn phải lớn hơn hoặc bằng 1 gram" })
    .max(10000, {
      message: "Khối lượng phần ăn không được vượt quá 10,000 gram"
    }),
  unit: z.string().nonempty({ message: "Đơn vị đo lường không được để trống" }),

  ...auditFields
})

export const createPortionSchema = portionSchema.pick({
  foodId: true,
  size: true,
  weight: true,
  unit: true
})

export type PortionType = z.infer<typeof portionSchema>
export type CreatePortionType = z.infer<typeof createPortionSchema>
