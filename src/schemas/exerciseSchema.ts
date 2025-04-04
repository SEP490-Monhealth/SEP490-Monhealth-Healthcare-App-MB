import { z } from "zod"

import { ExerciseTypeSchemaEnum } from "@/constants/enum/Workout"

import { auditFields, uuidSchema } from "./baseSchema"

const exerciseSchema = z.object({
  exerciseId: uuidSchema,
  userId: uuidSchema,

  type: ExerciseTypeSchemaEnum,

  name: z
    .string()
    .nonempty({ message: "Tên bài tập không được để trống" })
    .max(50, { message: "Tên bài tập không được dài hơn 50 ký tự" }),
  instructions: z
    .string()
    .nonempty({ message: "Hướng dẫn không được để trống" }),

  duration: z.number().optional(),
  reps: z.number().optional(),

  caloriesPerMinute: z
    .number()
    .min(1, { message: "Kcal phải lớn hơn hoặc bằng 1" })
    .max(1000, {
      message: "Kcal không được vượt quá 1,000"
    }),

  status: z.boolean(),

  ...auditFields
})

export const workoutExerciseSchema = z.object({
  warmupDuration: z.number(),
  workoutDuration: z.number(),

  warmup: z.array(exerciseSchema),
  workout: z.array(exerciseSchema)
})

export type ExerciseType = z.infer<typeof exerciseSchema>

export type WorkoutExerciseType = z.infer<typeof workoutExerciseSchema>
