import { z } from "zod"

import { Gender, GoalType } from "@/constants/enums"

import { timestampSchema } from "./commonSchema"

const GenderEnum = z.nativeEnum(Gender)
const GoalTypeEnum = z.nativeEnum(GoalType)
const activityLevels = [1.2, 1.375, 1.55, 1.725, 1.9]

const baseMetricSchema = z
  .object({
    metricId: z.string(),
    userId: z.string(),

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
    gender: GenderEnum,
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

    goalType: GoalTypeEnum,
    weightGoal: z
      .number()
      .min(1, { message: "Trọng lượng mục tiêu phải lớn hơn hoặc bằng 1" })
      .optional(),

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

export const dateOfBirthMetricSchema = baseMetricSchema.pick({
  dateOfBirth: true
})

export const genderMetricSchema = baseMetricSchema.pick({
  gender: true
})

export const heightWeightMetricSchema = baseMetricSchema.pick({
  height: true,
  weight: true
})

export const activityLevelMetricSchema = baseMetricSchema.pick({
  activityLevel: true
})

export const weightGoalSchema = baseMetricSchema.pick({
  weightGoal: true
})

export const createMetricSchema = baseMetricSchema.pick({
  userId: true,
  dateOfBirth: true,
  gender: true,
  height: true,
  weight: true,
  activityLevel: true,
  goalType: true,
  weightGoal: true
})

export type MetricType = z.infer<typeof metricSchema>
export type CreateMetricType = z.infer<typeof createMetricSchema>
