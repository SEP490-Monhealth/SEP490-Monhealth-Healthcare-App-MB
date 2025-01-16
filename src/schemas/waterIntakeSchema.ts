import { z } from "zod"

export const waterIntakeSchema = z.object({
  waterIntakeId: z.string(),
  dailyWaterIntakeId: z.string(),

  userId: z.string(),

  createdAt: z.string(),
  updatedAt: z.string()
})

export type WaterIntakeType = z.infer<typeof waterIntakeSchema>
