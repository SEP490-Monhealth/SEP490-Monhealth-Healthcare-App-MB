import { z } from "zod"

import { timestampSchema } from "./commonSchema"

export const dailyWaterIntakeSchema = z
  .object({
    dailyWaterIntakeId: z.string(),
    userId: z.string(),

    volume: z
      .number()
      .min(1, "Dung tích phải lớn hơn hoặc bằng 1 ml")
      .max(5000, "Dung tích không được vượt quá 5000 ml")
  })
  .merge(timestampSchema)

export type DailyWaterIntakeType = z.infer<typeof dailyWaterIntakeSchema>
