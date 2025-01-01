import { z } from "zod"

const baseWaterSchema = z.object({
  waterIntakeId: z.string(),
  userId: z.string(),

  amount: z.number().min(1, { message: "Lượng nước phải lớn hơn hoặc bằng 1" }),
  time: z.string().nonempty({ message: "Thời gian không được để trống" }),
  status: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
  createdBy: z.string(),
  updatedBy: z.string()
})

export const waterSchema = baseWaterSchema.pick({
  waterIntakeId: true,
  amount: true,
  time: true,
  status: true
})

export const waterUpdateSchema = baseWaterSchema.pick({
  waterIntakeId: true,
  status: true
})

export type WaterType = z.infer<typeof waterSchema>
export type WaterUpdateType = z.infer<typeof waterUpdateSchema>
