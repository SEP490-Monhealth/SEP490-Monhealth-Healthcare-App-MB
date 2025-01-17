import { z } from "zod"

import { auditSchema } from "./commonSchema"

const levels = ["Low", "Medium", "High"]

const baseExerciseSchema = z
  .object({
    exerciseId: z.string(),
    categoryId: z.string(),

    exerciseName: z
      .string()
      .nonempty({ message: "Tên bài tập không được để trống" })
      .max(100, { message: "Tên bài tập không được dài hơn 100 ký tự" }),
    exerciseDescription: z
      .string()
      .nonempty({ message: "Mô tả không được để trống" }),
    image: z.string().nonempty({ message: "Hình ảnh không được để trống" }),
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
    instructions: z
      .string()
      .nonempty({ message: "Hướng dẫn không được để trống" }),

    intensityLevel: z.string().refine((val) => levels.includes(val), {
      message: "Mức độ không hợp lệ. Chỉ chấp nhận: Low, Medium, High"
    }),
    difficultyLevel: z.string().refine((val) => levels.includes(val), {
      message: "Độ khó không hợp lệ. Chỉ chấp nhận: Low, Medium, High"
    }),

    status: z.boolean()
  })
  .merge(auditSchema)

export const exerciseSchema = baseExerciseSchema

export type ExerciseType = z.infer<typeof exerciseSchema>
