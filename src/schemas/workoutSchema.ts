import { z } from "zod"

import { DifficultyLevel } from "@/constants/enums"

import { auditSchema } from "./commonSchema"

const DifficultyLevelEnum = z.nativeEnum(DifficultyLevel)

const baseWorkoutSchema = z
  .object({
    workoutId: z.string(),
    categoryId: z.string(),
    userId: z.string(),

    name: z
      .string()
      .nonempty({ message: "Tên bài tập không được để trống" })
      .max(100, { message: "Tên bài tập không được dài hơn 100 ký tự" }),
    description: z
      .string()
      .nonempty({ message: "Mô tả không được để trống" })
      .max(500, { message: "Mô tả không được dài hơn 500 ký tự" }),
    difficultyLevel: DifficultyLevelEnum,
    views: z.number().min(0, { message: "Luợt xem phải lớn hơn hoặc bằng 0" })
  })
  .merge(auditSchema)

export const workoutSchema = baseWorkoutSchema

export type WorkoutType = z.infer<typeof workoutSchema>
