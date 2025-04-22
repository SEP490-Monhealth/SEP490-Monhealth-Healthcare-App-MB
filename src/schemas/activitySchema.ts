import { z } from "zod"

import { timestampFields, uuidSchema } from "./baseSchema"
import { workoutSchema } from "./workoutSchema"

export const activitySchema = z.object({
  activityId: uuidSchema,
  userId: uuidSchema,
  workoutId: uuidSchema,

  name: workoutSchema.shape.name,

  caloriesBurned: workoutSchema.shape.caloriesBurned,
  durationMinutes: workoutSchema.shape.durationMinutes,

  isCompleted: z.boolean(),

  ...timestampFields
})

export const createActivitySchema = activitySchema.pick({
  userId: true,
  workoutId: true
})

export type ActivityType = z.infer<typeof activitySchema>
export type CreateActivityType = z.infer<typeof createActivitySchema>
