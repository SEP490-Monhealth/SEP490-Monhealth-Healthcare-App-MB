import { z } from "zod"

import {
  DifficultyLevelSchemaEnum,
  WorkoutTypeSchemaEnum
} from "@/constants/enum/Workout"

import { auditFields, uuidSchema } from "./baseSchema"

const createWorkoutExerciseSchema = z.object({
  exerciseId: z.string(),

  duration: z.number().optional(),
  reps: z.number().optional()
})

const baseWorkoutSchema = z.object({
  workoutId: uuidSchema,
  userId: uuidSchema,

  category: z.string(),
  type: WorkoutTypeSchemaEnum,

  name: z
    .string()
    .nonempty({ message: "Tên bài tập không được để trống" })
    .max(50, { message: "Tên bài tập không được dài hơn 50 ký tự" }),
  description: z
    .string()
    .nonempty({ message: "Mô tả không được để trống" })
    .max(200, { message: "Mô tả không được dài hơn 200 ký tự" }),
  difficultyLevel: DifficultyLevelSchemaEnum,

  exercises: z
    .number()
    .min(1, { message: "Số lượng bài tập phải lớn hơn hoặc bằng 1" }),
  durationMinutes: z
    .number()
    .min(1, { message: "Thời lượng phải lớn hơn hoặc bằng 1" }),
  caloriesBurned: z
    .number()
    .min(0, { message: "Calo đốt cháy phải lớn hơn hoặc bằng 0" }),

  views: z.number(),

  isPublic: z.boolean(),

  status: z.boolean(),

  ...auditFields
})

export const workoutSchema = baseWorkoutSchema

export const createWorkoutSchema = z.object({
  category: z.string(),
  userId: z.string(),

  name: workoutSchema.shape.name,
  description: workoutSchema.shape.description,
  difficultyLevel: workoutSchema.shape.difficultyLevel,

  exercises: z.array(createWorkoutExerciseSchema).min(3, {
    message: "Số lượng bài tập phải lớn hơn hoặc bằng 3"
  }),

  isPublic: workoutSchema.shape.isPublic
})

export type WorkoutType = z.infer<typeof workoutSchema>
export type CreateWorkoutType = z.infer<typeof createWorkoutSchema>
