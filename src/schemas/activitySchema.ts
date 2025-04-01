import { z } from "zod"

import { timestampFields, uuidSchema } from "./baseSchema"
import { workoutSchema } from "./workoutSchema"

export const activitySchema = z.object({
  activityId: uuidSchema,
  userId: uuidSchema,
  dailyActivityId: uuidSchema,
  workoutId: uuidSchema,

  caloriesBurned: workoutSchema.shape.caloriesBurned,
  durationMinutes: workoutSchema.shape.durationMinutes,

  ...timestampFields
})

export const createActivitySchema = activitySchema.pick({
  userId: true,
  workoutId: true
})

export type ActivityType = z.infer<typeof activitySchema>
export type CreateActivityType = z.infer<typeof createActivitySchema>
