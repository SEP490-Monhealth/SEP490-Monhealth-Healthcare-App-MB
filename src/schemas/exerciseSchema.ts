import { z } from "zod"

import { auditSchema } from "./commonSchema"

const baseExerciseSchema = z
  .object({
    exerciseId: z.string().uuid(),
    userId: z.string().uuid(),

    name: z
      .string()
      .nonempty({ message: "Tên bài tập không được để trống" })
      .max(100, { message: "Tên bài tập không được dài hơn 100 ký tự" }),
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
    // image: z.string().nonempty({ message: "Hình ảnh không được để trống" }),

    status: z.boolean()
  })
  .merge(auditSchema)

export const exerciseSchema = baseExerciseSchema.pick({
  exerciseId: true,
  userId: true,

  name: true,
  instructions: true,

  duration: true,
  reps: true,

  caloriesPerMinute: true,

  status: true,

  createdAt: true,
  updatedAt: true,
  createdBy: true,
  updatedBy: true
})

export const createExerciseSchema = baseExerciseSchema
  .pick({
    userId: true,
    name: true,
    instructions: true,
    caloriesPerMinute: true
  })
  .extend({
    caloriesPerMinute: z
      .string()
      .refine((val) => /^\d*\.?\d*$/.test(val), {
        message: "Calories phải là số hợp lệ"
      })
      .transform((val) => parseFloat(val) || 0)
  })

export const updateExerciseSchema = baseExerciseSchema.pick({
  name: true,
  instructions: true,
  caloriesPerMinute: true
})

export const workoutExerciseSchema = z.object({
  warmupDuration: z.number(),
  workoutDuration: z.number(),

  warmup: z.array(exerciseSchema),
  workout: z.array(exerciseSchema)
})

export type ExerciseType = z.infer<typeof exerciseSchema>
export type CreateExerciseType = z.infer<typeof createExerciseSchema>
export type UpdateExerciseType = z.infer<typeof updateExerciseSchema>
export type WorkoutExerciseType = z.infer<typeof workoutExerciseSchema>
