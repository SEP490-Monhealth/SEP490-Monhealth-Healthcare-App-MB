import { z } from "zod"

import { timestampSchema } from "./commonSchema"

const baseWorkoutSchema = z
  .object({
    workoutId: z.string(),
    dailyActivityId: z.string(),
    userId: z.string(),

    name: z
      .string()
      .nonempty({ message: "Tên bài tập không được để trống" })
      .max(100, { message: "Tên bài tập không được dài hơn 100 ký tự" }),
    views: z.number().min(0, { message: "Luợt xem phải lớn hơn hoặc bằng 0" })
  })
  .merge(timestampSchema)

export const workoutSchema = baseWorkoutSchema

export type WorkoutType = z.infer<typeof workoutSchema>
