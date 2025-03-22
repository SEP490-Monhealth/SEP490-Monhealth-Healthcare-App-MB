import { z } from "zod"

import { timestampFields, uuidSchema } from "./baseSchema"

const baseDailyActivitySchema = z.object({
  dailyActivityId: uuidSchema,
  userId: uuidSchema,
  goalId: uuidSchema,

  totalDuration: z
    .number()
    .min(1, { message: "Thời gian phải lớn hơn hoặc bằng 1 phút" })
    .max(1000, {
      message: "Thời gian không được vượt quá 1,000 phút"
    }),
  totalCaloriesBurned: z
    .number()
    .min(1, { message: "Kcal phải lớn hơn hoặc bằng 1" }),

  ...timestampFields
})

export const dailyActivitySchema = baseDailyActivitySchema

export type DailyActivityType = z.infer<typeof dailyActivitySchema>
