import { z } from "zod"

const basePortionSchema = z.object({
  portionId: z.string(),
  foodId: z.string(),
  portionSize: z.string().optional(),
  portionWeight: z
    .number()
    .positive({ message: "Khối lượng phần ăn phải là số dương" })
    .max(10000, {
      message: "Khối lượng phần ăn không được vượt quá 10,000 gram"
    }),
  measurementUnit: z
    .string()
    .min(1, { message: "Đơn vị đo lường không được để trống" })
    .max(20, { message: "Đơn vị đo lường không được dài hơn 20 ký tự" }),

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
export type CreatePortionType = z.infer<typeof portionSchema>
