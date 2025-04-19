import { z } from "zod"

import { GenderSchemaEnum } from "@/constants/enum/Gender"

import { timestampFields, uuidSchema, validEnumWithNull } from "./baseSchema"
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
        return age >= 15 && age <= 100
      },
      { message: "Tuổi phải nằm trong khoảng từ 15 đến 100" }
    ),
  gender: validEnumWithNull(GenderSchemaEnum, "giới tính"),
  height: z
    .union([z.string(), z.number()])
    .refine(
      (val) =>
        val !== null &&
        /^\d*\.?\d*$/.test(val.toString()) &&
        parseFloat(val.toString()) > 0,
      {
        message: "Vui lòng nhập chiều cao hợp lệ"
      }
    )
    .refine(
      (val) => {
        const height = parseFloat(val.toString())
        return height >= 130 && height <= 220
      },
      {
        message: "Chiều cao phải nằm trong khoảng từ 130cm đến 220cm"
      }
    )
    .transform((val) => (val !== null ? parseFloat(val.toString()) : 0)),

  weight: z
    .union([z.string(), z.number()])
    .refine(
      (val) =>
        val !== null &&
        /^\d*\.?\d*$/.test(val.toString()) &&
        parseFloat(val.toString()) > 0,
      {
        message: "Vui lòng nhập cân nặng hợp lệ"
      }
    )
    .refine(
      (val) => {
        const weight = parseFloat(val.toString())
        return weight >= 35 && weight <= 200
      },
      {
        message: "Cân nặng phải nằm trong khoảng từ 35kg đến 200kg"
      }
    )
    .transform((val) => (val !== null ? parseFloat(val.toString()) : 0)),
  activityLevel: z.number().refine((val) => activityLevels.includes(val), {
    message: `Hệ số hoạt động không hợp lệ. Các giá trị hợp lệ: ${activityLevels.join(", ")}`
  }),

  goalType: goalSchema.shape.type,
  weightGoal: z
    .union([z.string(), z.number()])
    .refine(
      (val) =>
        val !== null &&
        /^\d*\.?\d*$/.test(val.toString()) &&
        parseFloat(val.toString()) > 0,
      {
        message: "Vui lòng nhập cân nặng hợp lệ"
      }
    )
    .refine(
      (val) => {
        const weight = parseFloat(val.toString())
        return weight >= 10 && weight <= 300
      },
      {
        message: "Cân nặng phải nằm trong khoảng từ 10kg đến 300kg"
      }
    )
    .transform((val) => (val !== null ? parseFloat(val.toString()) : 0)),
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

export const heightWeightSetupSchema = z.object({
  height: z
    .union([z.string(), z.number()])
    .refine(
      (val) =>
        val !== null &&
        /^\d*\.?\d*$/.test(val.toString()) &&
        parseFloat(val.toString()) > 0,
      {
        message: "Vui lòng nhập chiều cao hợp lệ"
      }
    )
    .refine(
      (val) => {
        const height = parseFloat(val.toString())
        return height >= 130 && height <= 220
      },
      {
        message: "Chiều cao phải nằm trong khoảng từ 130cm đến 220cm"
      }
    )
    .transform((val) => (val !== null ? parseFloat(val.toString()) : 0)),

  weight: z
    .union([z.string(), z.number()])
    .refine(
      (val) =>
        val !== null &&
        /^\d*\.?\d*$/.test(val.toString()) &&
        parseFloat(val.toString()) > 0,
      {
        message: "Vui lòng nhập cân nặng hợp lệ"
      }
    )
    .refine(
      (val) => {
        const weight = parseFloat(val.toString())
        return weight >= 35 && weight <= 200
      },
      {
        message: "Cân nặng phải nằm trong khoảng từ 35kg đến 200kg"
      }
    )
    .transform((val) => (val !== null ? parseFloat(val.toString()) : 0))
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
      .refine(
        (val) =>
          /^\d*\.?\d*$/.test(val.toString()) && parseFloat(val.toString()) > 0,
        {
          message: "Vui lòng nhập cân nặng mục tiêu hợp lệ"
        }
      )
      .transform((val) => parseFloat(val.toString()) || 0)
      .refine(
        (val) => {
          const weight = parseFloat(val.toString())
          return weight >= 35 && weight <= 200
        },
        {
          message: "Cân nặng phải nằm trong khoảng từ 35kg đến 200kg"
        }
      )
      .transform((val) => (val !== null ? parseFloat(val.toString()) : 0))
  })

export const createUpdateMetricSchema = metricSchema.pick({
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
export type CreateUpdateMetricType = z.infer<typeof createUpdateMetricSchema>
