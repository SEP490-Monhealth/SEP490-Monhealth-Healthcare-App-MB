import { z } from "zod"

import { DifficultyEnum } from "@/constants/enums"

import { auditSchema } from "./commonSchema"
import { exerciseSchema } from "./exerciseSchema"

// const WorkoutTypeEnum = z.nativeEnum(WorkoutEnum)
const DifficultyLevelEnum = z.nativeEnum(DifficultyEnum)

const baseWorkoutSchema = z
  .object({
    workoutId: z.string(),
    category: z.string(),
    userId: z.string(),

    // type: WorkoutTypeEnum,
    name: z
      .string()
      .nonempty({ message: "Tên bài tập không được để trống" })
      .max(100, { message: "Tên bài tập không được dài hơn 100 ký tự" }),
    description: z
      .string()
      .nonempty({ message: "Mô tả không được để trống" })
      .max(500, { message: "Mô tả không được dài hơn 500 ký tự" }),
    difficultyLevel: DifficultyLevelEnum,

    exercises: z
      .number()
      .min(1, { message: "Số lượng bài tập phải lớn hơn hoặc bằng 1" }),
    duration: z
      .number()
      .min(1, { message: "Thời lượng phải lớn hơn hoặc bằng 1" }),
    caloriesBurned: z
      .number()
      .min(0, { message: "Calo đốt cháy phải lớn hơn hoặc bằng 0" }),

    views: z.number().min(0, { message: "Luợt xem phải lớn hơn hoặc bằng 0" }),

    status: z.boolean()
  })
  .merge(auditSchema)

export const workoutSchema = baseWorkoutSchema.pick({
  workoutId: true,
  category: true,

  // type: true,
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

export type WorkoutType = z.infer<typeof workoutSchema>
export type WorkoutExerciseType = z.infer<typeof workoutExerciseSchema>
