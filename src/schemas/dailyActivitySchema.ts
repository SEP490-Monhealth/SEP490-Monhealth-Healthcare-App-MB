import { z } from "zod"

import { activitySchema } from "./activitySchema"
import { timestampFields, uuidSchema } from "./baseSchema"
import { goalSchema } from "./goalSchema"

export const dailyActivitySchema = z.object({
  dailyActivityId: uuidSchema,
  userId: uuidSchema,
  goalId: uuidSchema,

  goalType: goalSchema.shape.type,

  totalCaloriesIntake: z
    .number()
    .min(1, { message: "Calorie phải lớn hơn hoặc bằng 1" })
    .max(10000, {
      message: "Calorie không được vượt quá 10,000"
    }),
  totalCaloriesBurned: z
    .number()
    .min(1, { message: "Kcal phải lớn hơn hoặc bằng 1" }),
  totalDurationMinutes: z
    .number()
    .min(1, { message: "Thời gian phải lớn hơn hoặc bằng 1 phút" })
    .max(1000, {
      message: "Thời gian không được vượt quá 1,000 phút"
    }),

  items: z.array(activitySchema),

  ...timestampFields
})

export type DailyActivityType = z.infer<typeof dailyActivitySchema>
