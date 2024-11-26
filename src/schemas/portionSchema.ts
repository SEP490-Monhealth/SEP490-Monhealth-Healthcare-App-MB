import { z } from "zod"

const portionSchema = z.object({
  portionId: z.string(),
  foodId: z.string(),
  portionSize: z.string().min(1, "Kích cỡ phần ăn không được để trống"),
  portionWeight: z.number().positive("Khối lượng phần ăn phải là số dương"),
  measurementUnit: z.string().min(1, "Đơn vị đo lường không được để trống"),
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
