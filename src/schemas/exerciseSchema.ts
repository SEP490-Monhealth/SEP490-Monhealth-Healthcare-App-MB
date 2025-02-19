import { z } from "zod"

import { auditSchema } from "./commonSchema"

const baseExerciseSchema = z
  .object({
    exerciseId: z.string(),
    userId: z.string(),

    name: z
      .string()
      .nonempty({ message: "Tên bài tập không được để trống" })
      .max(100, { message: "Tên bài tập không được dài hơn 100 ký tự" }),
    instructions: z
      .string()
      .nonempty({ message: "Hướng dẫn không được để trống" }),

    duration: z.number(),
    reps: z.number(),

    caloriesPerMinute: z
      .number()
      .min(1, { message: "Kcal phải lớn hơn hoặc bằng 1" })
      .max(1000, {
        message: "Kcal không được vượt quá 1,000"
      }),
    // image: z.string().nonempty({ message: "Hình ảnh không được để trống" }),

    status: z.boolean()
  })
  .merge(auditSchema)

export const exerciseSchema = baseExerciseSchema.pick({
  exerciseId: true,

  name: true,
  instructions: true,

  duration: true,
  reps: true,

  caloriesPerMinute: true
})

export type ExerciseType = z.infer<typeof exerciseSchema>
