import { z } from "zod"

import { DifficultyLevelEnum } from "@/constants/enum/DifficultyLevel"
import { WorkoutTypeEnum } from "@/constants/enum/WorkoutType"

import { auditSchema } from "./commonSchema"
import { exerciseSchema } from "./exerciseSchema"

const WorkoutTypeSchemaEnum = z.nativeEnum(WorkoutTypeEnum)
const DifficultyLevelSchemaEnum = z.nativeEnum(DifficultyLevelEnum)

const baseWorkoutSchema = z
  .object({
    workoutId: z.string(),
    category: z
      .string()
      .nonempty({ message: "Loại bài tập không được để trống" }),
    userId: z.string(),
    exerciseId: z
      .array(z.string())
      .nonempty({ message: "Danh sách bài tập không được để trống" }),

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
    duration: z
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
  category: true,

  type: true,
  name: true,
  description: true,
  difficultyLevel: true,

  exercises: true,
  duration: true,
  caloriesBurned: true
})

export const workoutExerciseSchema = z.object({
  warmup: z.array(exerciseSchema),
  workout: z.array(exerciseSchema)
})

export const informationWorkoutSchema = baseWorkoutSchema.pick({
  category: true,
  name: true,
  description: true,
  difficultyLevel: true,
  isPublic: true
})

export const createWorkoutExerciseSchema = z.object({
  exerciseId: z.string(),
  duration: z.number(),
  reps: z.number()
})

export const createWorkoutSchema = baseWorkoutSchema
  .pick({
    userId: true,
    category: true,
    name: true,
    description: true,
    difficultyLevel: true,
    isPublic: true
  })
  .extend({
    items: z.array(createWorkoutExerciseSchema)
  })

export type WorkoutType = z.infer<typeof workoutSchema>
export type WorkoutExerciseType = z.infer<typeof workoutExerciseSchema>
export type CreateWorkoutExerciseType = z.infer<
  typeof createWorkoutExerciseSchema
>
export type CreateWorkoutType = z.infer<typeof createWorkoutSchema>
