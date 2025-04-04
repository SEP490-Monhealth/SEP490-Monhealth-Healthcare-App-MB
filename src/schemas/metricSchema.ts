import { z } from "zod"

import { GenderSchemaEnum } from "@/constants/enum/Gender"

import { timestampFields, uuidSchema } from "./baseSchema"
import { goalSchema } from "./goalSchema"

const activityLevels = [1.2, 1.375, 1.55, 1.725, 1.9]

const metricSchema = z.object({
  metricId: uuidSchema,
  userId: uuidSchema,

  dateOfBirth: z
    .string()
    .refine(
      (date) => {
        const today = new Date()
        const birthDate = new Date(date)
        return !isNaN(birthDate.getTime()) && birthDate <= today
      },
      { message: "Ngày sinh không hợp lệ hoặc vượt quá ngày hiện tại" }
    )
    .refine(
      (date) => {
        const birthDate = new Date(date)
        const age = new Date().getFullYear() - birthDate.getFullYear()
        return age >= 15 && age <= 120
      },
      { message: "Tuổi phải nằm trong khoảng từ 15 đến 120" }
    ),
  gender: GenderSchemaEnum,
  height: z
    .number()
    .min(50, { message: "Chiều cao phải lớn hơn 50 cm" })
    .max(250, { message: "Chiều cao không được lớn hơn 250 cm" }),
  weight: z
    .number()
    .min(10, { message: "Cân nặng phải lớn hơn 10 kg" })
    .max(500, { message: "Cân nặng không được lớn hơn 500 kg" }),
  activityLevel: z.number().refine((val) => activityLevels.includes(val), {
    message: `Hệ số hoạt động không hợp lệ. Các giá trị hợp lệ: ${activityLevels.join(", ")}`
  }),

  goalType: goalSchema.shape.type,
  weightGoal: goalSchema.shape.weightGoal,
  caloriesRatio: goalSchema.shape.caloriesRatio,

  bmi: z.number(),
  bmr: z.number(),
  tdee: z.number(),
  ibw: z.number(),

  ...timestampFields
})

export const dateOfBirthSetupSchema = metricSchema.pick({
  dateOfBirth: true
})

export const genderSetupSchema = metricSchema.pick({
  gender: true
})

export const heightWeightSetupSchema = metricSchema
  .pick({
    height: true,
    weight: true
  })
  .extend({
    height: z
      .union([z.string(), z.number()])
      .refine((val) => /^\d*\.?\d*$/.test(val.toString()), {
        message: "Chiều cao phải là số hợp lệ"
      })
      .transform((val) => parseFloat(val.toString()) || 0),

    weight: z
      .union([z.string(), z.number()])
      .refine((val) => /^\d*\.?\d*$/.test(val.toString()), {
        message: "Cân nặng phải là số hợp lệ"
      })
      .transform((val) => parseFloat(val.toString()) || 0)
  })

export const activityLevelSetupSchema = metricSchema.pick({
  activityLevel: true
})

export const weightGoalSetupSchema = metricSchema
  .pick({
    weightGoal: true
  })
  .extend({
    weightGoal: z
      .union([z.string(), z.number()])
      .refine((val) => /^\d*\.?\d*$/.test(val.toString()), {
        message: "Mục tiêu cân nặng phải là số hợp lệ"
      })
      .transform((val) => parseFloat(val.toString()) || 0)
  })

export const createMetricSchema = metricSchema.pick({
  userId: true,
  dateOfBirth: true,
  gender: true,
  height: true,
  weight: true,
  activityLevel: true,
  goalType: true,
  weightGoal: true,
  caloriesRatio: true
})

export const updateMetricSchema = metricSchema.pick({
  dateOfBirth: true,
  gender: true,
  height: true,
  weight: true,
  activityLevel: true
})

export type MetricType = z.infer<typeof metricSchema>
export type CreateMetricType = z.infer<typeof createMetricSchema>
export type UpdateMetricType = z.infer<typeof updateMetricSchema>
