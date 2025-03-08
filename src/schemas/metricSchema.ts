import { z } from "zod"

import { GenderEnum } from "@/constants/enum/Gender"

import { timestampSchema } from "./commonSchema"
import { goalSchema } from "./goalSchema"

const GenderSchemaEnum = z.nativeEnum(GenderEnum)
const activityLevels = [1.2, 1.375, 1.55, 1.725, 1.9]

const baseMetricSchema = z
  .object({
    metricId: z.string().uuid(),
    userId: z.string().uuid(),

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
      .min(100, { message: "Chiều cao tối thiểu là 100 cm" })
      .max(250, { message: "Chiều cao tối đa là 250 cm" }),
    weight: z
      .number()
      .min(20, { message: "Cân nặng tối thiểu là 20 kg" })
      .max(300, { message: "Cân nặng tối đa là 300 kg" }),
    activityLevel: z
      .number()
      .refine((value) => activityLevels.includes(value), {
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
      .max(300, { message: "IBW tối đa là 300 kg" })
  })
  .merge(timestampSchema)

export const metricSchema = baseMetricSchema
  .pick({
    metricId: true,
    userId: true,
    dateOfBirth: true,
    gender: true,
    height: true,
    weight: true,
    activityLevel: true,
    bmi: true,
    bmr: true,
    tdee: true,
    ibw: true
  })
  .merge(timestampSchema)

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

export type MetricType = z.infer<typeof metricSchema>
export type CreateMetricType = z.infer<typeof createMetricSchema>
