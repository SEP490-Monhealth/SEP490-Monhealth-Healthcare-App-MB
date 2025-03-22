import { z } from "zod"

import { timestampFields, uuidSchema } from "./baseSchema"

const activitySchema = z.object({
  activityId: uuidSchema,
  userId: uuidSchema,
  dailyActivityId: uuidSchema,
  workoutId: uuidSchema,

  ...timestampFields
})

export const createActivitySchema = activitySchema.pick({
  userId: true,
  workoutId: true
})

export type ActivityType = z.infer<typeof activitySchema>
export type CreateActivityType = z.infer<typeof createActivitySchema>
