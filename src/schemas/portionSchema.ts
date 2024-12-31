import { z } from "zod"

const basePortionSchema = z.object({
  portionId: z.string(),
  foodId: z.string(),

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

  createdAt: z.string(),
  updatedAt: z.string(),
  createdBy: z.string(),
  updatedBy: z.string()
})

export const portionSchema = basePortionSchema.omit({
  portionId: true,
  foodId: true,
  createdAt: true,
  updatedAt: true,
  createdBy: true,
  updatedBy: true
})

export type PortionType = z.infer<typeof portionSchema>
