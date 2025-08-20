import { z } from "zod"

import { ActivityLevel as ActivityLevelEnum } from "@/constants/enums/ActivityLevel"

import { timestampSchema, uuidSchema } from "./commonValidation"

const metricSchema = z.object({
  id: uuidSchema,
  userId: uuidSchema,

  height: z
    .number()
    .int({ error: "Chiều cao phải là số nguyên" })
    .min(140, { error: "Chiều cao phải ít nhất 140cm" })
    .max(220, { error: "Chiều cao không được vượt quá 220cm" }),
  weight: z
    .number()
    .positive({ error: "Cân nặng phải lớn hơn 0" })
    .min(35, { error: "Cân nặng phải ít nhất 35kg" })
    .max(200, { error: "Cân nặng không được vượt quá 200kg" }),
  activityLevel: z
    .enum(ActivityLevelEnum, { error: "Mức độ hoạt động không hợp lệ" })
    .default(ActivityLevelEnum.SEDENTARY),

  bmi: z.number().positive({ error: "BMI phải là số dương" }).optional(),
  bmr: z.number().positive({ error: "BMR phải là số dương" }).optional(),
  tdee: z.number().positive({ error: "TDEE phải là số dương" }).optional(),

  ...timestampSchema.shape
})

export const createUpdateMetricSchema = metricSchema.pick({
  height: true,
  weight: true,
  activityLevel: true
})

export type Metric = z.infer<typeof metricSchema>
export type CreateUpdateMetric = z.infer<typeof createUpdateMetricSchema>
