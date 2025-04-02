import { z } from "zod"

import { timestampFields, uuidSchema } from "./baseSchema"
import { goalSchema } from "./goalSchema"

export const dailyWaterIntakeSchema = z.object({
  dailyWaterIntakeId: uuidSchema,
  userId: uuidSchema,
  goalId: uuidSchema,

  goalType: goalSchema.shape.type,

  totalVolume: z
    .number()
    .min(1, "Dung tích phải lớn hơn hoặc bằng 1 ml")
    .max(5000, "Dung tích không được vượt quá 5000 ml"),

  ...timestampFields
})

export type DailyWaterIntakeType = z.infer<typeof dailyWaterIntakeSchema>
