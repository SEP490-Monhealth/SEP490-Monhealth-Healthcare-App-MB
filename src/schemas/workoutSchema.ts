import { z } from "zod"

import { DifficultyLevelEnum } from "@/constants/enum/DifficultyLevel"
import { WorkoutTypeEnum } from "@/constants/enum/WorkoutType"

import { auditSchema } from "./commonSchema"

const WorkoutTypeSchemaEnum = z.nativeEnum(WorkoutTypeEnum)
const DifficultyLevelSchemaEnum = z.nativeEnum(DifficultyLevelEnum)

const baseWorkoutSchema = z
  .object({
    workoutId: z.string().uuid(),
    userId: z.string().uuid(),

    category: z.string(),
    type: WorkoutTypeSchemaEnum,

    name: z
      .string()
      .nonempty({ message: "Tên bài tập không được để trống" })
      .max(100, { message: "Tên bài tập không được dài hơn 100 ký tự" }),
    description: z
      .string()
      .nonempty({ message: "Mô tả không được để trống" })
      .max(500, { message: "Mô tả không được dài hơn 500 ký tự" }),
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

    status: z.boolean()
  })
  .merge(auditSchema)

export const workoutSchema = baseWorkoutSchema.pick({
  workoutId: true,
  userId: true,

  category: true,
  type: true,

  name: true,
  description: true,
  difficultyLevel: true,

  exercises: true,
  durationMinutes: true,
  caloriesBurned: true
})

const createWorkoutExerciseSchema = z.object({
  exerciseId: z.string().uuid(),

  durationMinutes: z.number().optional(),
  reps: z.number().optional()
})

export const createWorkoutSchema = z.object({
  userId: workoutSchema.shape.userId,

  category: workoutSchema.shape.category,
  type: workoutSchema.shape.type,

  name: workoutSchema.shape.name,
  description: workoutSchema.shape.description,
  difficultyLevel: workoutSchema.shape.difficultyLevel,

  exercises: z.array(createWorkoutExerciseSchema)
})

export type WorkoutType = z.infer<typeof workoutSchema>
export type CreateWorkoutType = z.infer<typeof createWorkoutSchema>
