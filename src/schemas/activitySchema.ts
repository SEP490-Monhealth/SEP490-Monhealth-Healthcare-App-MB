import { z } from "zod"

import { timestampFields, uuidSchema } from "./baseSchema"
import { workoutSchema } from "./workoutSchema"

export const activitySchema = z.object({
  activityId: uuidSchema,
  userId: uuidSchema,
  dailyActivityId: uuidSchema,
  workoutId: uuidSchema,

  workouts: z.number(),

  durationMinutes: workoutSchema.shape.durationMinutes,
  caloriesBurned: workoutSchema.shape.caloriesBurned,

  ...timestampFields
})

export const createActivitySchema = activitySchema.pick({
  userId: true,
  workoutId: true
})

export type ActivityType = z.infer<typeof activitySchema>
export type CreateActivityType = z.infer<typeof createActivitySchema>
