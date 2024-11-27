import { z } from "zod"

const portionSchema = z.object({
  portionId: z.string(),
  foodId: z.string(),
  portionSize: z
    .string()
    .min(1, { message: "Kích cỡ phần ăn không được để trống" })
    .max(50, { message: "Kích cỡ phần ăn không được dài hơn 50 ký tự" }),
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
  updatedAt: z.string()
})

const createUpdatePortionSchema = portionSchema.omit({
  portionId: true,
  createdAt: true,
  updatedAt: true
})

export type PortionType = z.infer<typeof portionSchema>
export type CreateUpdatePortionType = z.infer<typeof createUpdatePortionSchema>
