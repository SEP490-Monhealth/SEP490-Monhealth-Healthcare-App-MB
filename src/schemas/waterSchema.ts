import { z } from "zod"

const baseWaterSchema = z.object({
  waterIntakeId: z.string(),
  userId: z.string(),

  name: z
    .string()
    .max(100, { message: "Tên gợi nhớ không được dài hơn 100 ký tự" })
    .regex(/^[a-zA-Z0-9\s\u00C0-\u024F\u1E00-\u1EFF]*$/, {
      message: "Tên gợi nhớ chỉ được chứa chữ cái, số và khoảng trắng"
    }),
  totalVolume: z.number(),
  volume: z.number().min(0, { message: "Lượng nước phải lớn hơn hoặc bằng 0" }),
  intakeTime: z.string().nonempty({ message: "Thời gian không được để trống" }),
  status: z.boolean(),

  createdAt: z.string(),
  updatedAt: z.string(),
  createdBy: z.string(),
  updatedBy: z.string()
})

export const waterUpdateSchema = baseWaterSchema.pick({
  waterIntakeId: true,
  status: true
})

export const waterCreateSchema = baseWaterSchema.pick({
  name: true,
  volume: true,
  intakeTime: true,
  status: true
})

export type WaterUpdateType = z.infer<typeof waterUpdateSchema>
export type WaterCreateType = z.infer<typeof waterCreateSchema>
