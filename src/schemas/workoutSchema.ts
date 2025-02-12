import { z } from "zod"

import { DifficultyEnum, WorkoutEnum } from "@/constants/enums"

import { auditSchema } from "./commonSchema"

const Workout = z.nativeEnum(WorkoutEnum)
const DifficultyLevel = z.nativeEnum(DifficultyEnum)

const baseWorkoutSchema = z
  .object({
    workoutId: z.string(),
    categoryId: z.string(),
    userId: z.string(),

    type: Workout,
    name: z
      .string()
      .nonempty({ message: "Tên bài tập không được để trống" })
      .max(100, { message: "Tên bài tập không được dài hơn 100 ký tự" }),
    description: z
      .string()
      .nonempty({ message: "Mô tả không được để trống" })
      .max(500, { message: "Mô tả không được dài hơn 500 ký tự" }),
    difficultyLevel: DifficultyLevel,

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

  type: true,
  name: true,
  description: true,
  difficultyLevel: true,

  exercises: true,
  duration: true,
  caloriesBurned: true,

  views: true,

  createdAt: true,
  createdBy: true,
  updatedAt: true,
  updatedBy: true
})

export type WorkoutType = z.infer<typeof workoutSchema>
