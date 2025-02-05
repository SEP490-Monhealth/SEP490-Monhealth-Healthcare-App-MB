import { z } from "zod"

import { DifficultyLevel } from "@/constants/enums"

import { auditSchema } from "./commonSchema"

const DifficultyLevelEnum = z.nativeEnum(DifficultyLevel)

const baseExerciseSchema = z
  .object({
    exerciseId: z.string(),
    category: z.string(),
    userId: z.string(),

    name: z
      .string()
      .nonempty({ message: "Tên bài tập không được để trống" })
      .max(100, { message: "Tên bài tập không được dài hơn 100 ký tự" }),
    instructions: z
      .string()
      .nonempty({ message: "Hướng dẫn không được để trống" }),
    duration: z
      .number()
      .min(1, { message: "Thời gian phải lớn hơn hoặc bằng 1 phút" })
      .max(1000, {
        message: "Thời gian không được vượt quá 1,000 phút"
      }),
    caloriesBurned: z
      .number()
      .min(1, { message: "Kcal phải lớn hơn hoặc bằng 1" })
      .max(1000, {
        message: "Kcal không được vượt quá 1,000"
      }),
    image: z.string().nonempty({ message: "Hình ảnh không được để trống" }),

    difficulty: DifficultyLevelEnum,

    status: z.boolean()
  })
  .merge(auditSchema)

export const exerciseSchema = baseExerciseSchema

export type ExerciseType = z.infer<typeof exerciseSchema>
