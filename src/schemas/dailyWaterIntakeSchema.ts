import { z } from "zod"

export const dailyWaterIntakeSchema = z.object({
  dailyWaterIntakeId: z.string(),

  goalId: z.string(),

  userId: z.string(),

  totalVolume: z
    .number()
    .min(1, { message: "Lượng nước phải lớn hơn hoặc bằng 1" })
    .max(3000, { message: "Lượng nước không được vượt quá 3,000" }),

  createdAt: z.string(),
  updatedAt: z.string()
})

export type DailyWaterIntakeType = z.infer<typeof dailyWaterIntakeSchema>
