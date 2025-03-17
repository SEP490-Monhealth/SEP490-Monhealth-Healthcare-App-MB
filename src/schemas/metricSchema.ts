import { z } from "zod"

import { GenderSchemaEnum } from "@/constants/enum/Gender"

import { timestampFields, uuidSchema } from "./baseSchema"
import { goalSchema } from "./goalSchema"

const activityLevels = [1.2, 1.375, 1.55, 1.725, 1.9]

const baseMetricSchema = z.object({
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
    .min(50, { message: "Chiều cao tối thiểu là 50 cm" })
    .max(250, { message: "Chiều cao tối đa là 250 cm" }),
  weight: z
    .number()
    .min(10, { message: "Cân nặng tối thiểu là 10 kg" })
    .max(300, { message: "Cân nặng tối đa là 300 kg" }),
  activityLevel: z.number().refine((value) => activityLevels.includes(value), {
    message:
      "Hệ số hoạt động không hợp lệ. Các giá trị hợp lệ: 1.2, 1.375, 1.55, 1.725, 1.9"
  }),

  goalType: goalSchema.shape.type,
  weightGoal: goalSchema.shape.weightGoal,
  caloriesRatio: goalSchema.shape.caloriesRatio,

  bmi: z
    .number()
    .min(10, { message: "BMI phải lớn hơn hoặc bằng 10" })
    .max(60, { message: "BMI phải nhỏ hơn hoặc bằng 60" }),
  bmr: z
    .number()
    .min(1, { message: "BMR phải lớn hơn hoặc bằng 1" })
    .max(5000, { message: "BMR tối đa là 5000" }),
  tdee: z
    .number()
    .min(1, { message: "TDEE phải lớn hơn hoặc bằng 1" })
    .max(10000, { message: "TDEE tối đa là 10000" }),
  ibw: z
    .number()
    .min(1, { message: "IBW phải lớn hơn hoặc bằng 1" })
    .max(300, { message: "IBW tối đa là 300 kg" }),

  ...timestampFields
})

export const metricSchema = baseMetricSchema

export const dateOfBirthSetupSchema = baseMetricSchema.pick({
  dateOfBirth: true
})

export const genderSetupSchema = baseMetricSchema.pick({
  gender: true
})

export const heightWeightSetupSchema = baseMetricSchema
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

export const activityLevelSetupSchema = baseMetricSchema.pick({
  activityLevel: true
})

export const weightGoalSetupSchema = baseMetricSchema
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

export const createMetricSchema = baseMetricSchema.pick({
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

export const updateMetricSchema = baseMetricSchema.pick({
  dateOfBirth: true,
  gender: true,
  height: true,
  weight: true,
  activityLevel: true
})

export type MetricType = z.infer<typeof metricSchema>
export type CreateMetricType = z.infer<typeof createMetricSchema>
export type UpdateMetricType = z.infer<typeof updateMetricSchema>
