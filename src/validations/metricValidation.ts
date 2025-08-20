import { z } from "zod"

import { ActivityLevel as ActivityLevelEnum } from "@/constants/enums/ActivityLevel"

import { uuidSchema } from "./commonValidation"

const metricSchema = z.object({
  id: uuidSchema,
  userId: uuidSchema,

  height: z.number().min(140, "Chiều cao phải ít nhất 140cm").max(220, "Chiều cao không được vượt quá 220cm"),
  weight: z.number().min(35, "Cân nặng phải ít nhất 35kg").max(200, "Cân nặng không được vượt quá 200kg"),
  activityLevel: z
    .enum(Object.values(ActivityLevelEnum) as [string, ...string[]], "Mức độ hoạt động không hợp lệ")
    .default(ActivityLevelEnum.SEDENTARY),

  bmi: z.number().optional(),
  bmr: z.number().optional(),
  tdee: z.number().optional(),

  createdAt: z.date(),
  updatedAt: z.date()
})

export const createUpdateMetricSchema = metricSchema.pick({
  height: true,
  weight: true,
  activityLevel: true
})

export type Metric = z.infer<typeof metricSchema>
export type CreateUpdateMetric = z.infer<typeof createUpdateMetricSchema>
