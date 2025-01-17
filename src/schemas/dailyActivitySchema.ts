import { z } from "zod"

import { timestampSchema } from "./commonSchema"

const baseDailyActivitySchema = z
  .object({
    dailyActivityId: z.string(),
    userId: z.string(),

    totalDuration: z
      .number()
      .min(1, { message: "Thời gian phải lớn hơn hoặc bằng 1 phút" })
      .max(1000, {
        message: "Thời gian không được vượt quá 1,000 phút"
      }),
    totalCaloriesBurned: z
      .number()
      .min(1, { message: "Kcal phải lớn hơn hoặc bằng 1" })
  })
  .merge(timestampSchema)

export const dailyActivitySchema = baseDailyActivitySchema

export type DailyActivityType = z.infer<typeof dailyActivitySchema>
