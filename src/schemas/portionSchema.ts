import { z } from "zod"

import { auditSchema } from "./commonSchema"

const basePortionSchema = z
  .object({
    portionId: z.string().uuid(),
    foodId: z.string().uuid(),

    size: z
      .string()
      .nonempty({ message: "Kích thước phần ăn không được để trống" }),
    weight: z
      .number()
      .min(1, { message: "Khối lượng phần ăn phải lớn hơn hoặc bằng 1 gram" })
      .max(10000, {
        message: "Khối lượng phần ăn không được vượt quá 10,000 gram"
      }),
    unit: z
      .string()
      .nonempty({ message: "Đơn vị đo lường không được để trống" })
  })
  .merge(auditSchema)

export const portionSchema = basePortionSchema.pick({
  size: true,
  weight: true,
  unit: true
})

export const createPortionSchema = basePortionSchema.pick({
  foodId: true,
  size: true,
  weight: true,
  unit: true
})

export type PortionType = z.infer<typeof portionSchema>
export type CreatePortionType = z.infer<typeof createPortionSchema>
