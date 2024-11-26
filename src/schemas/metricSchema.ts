import { z } from "zod"

const metricSchema = z.object({
  metricId: z.string(),
  userId: z.string(),
  height: z
    .number()
    .positive("Height must be a positive number")
    .min(50, "Height must be at least 50 cm"),
  weight: z
    .number()
    .positive("Weight must be a positive number")
    .min(1, "Weight must be at least 1kg"),
  bmi: z
    .number()
    .min(10, "BMI must be at least 10")
    .max(60, "BMI must be at most 60"),
  bmr: z
    .number()
    .positive("BMR must be a positive number")
    .min(100, "BMR must be at least 100"),
  tdee: z
    .number()
    .positive("TDEE must be a positive number")
    .min(1000, "TDEE must be at least 1000"),
  ibw: z
    .number()
    .positive("IBW must be a positive number")
    .min(30, "IBW must be at least 30 kg"),
  createdAt: z.string(),
  updatedAt: z.string()
})

const createUpdateMetricSchema = metricSchema.omit({
  metricId: true,
  createdAt: true,
  updatedAt: true
})

export type MetricType = z.infer<typeof metricSchema>
export type CreateUpdateMetricType = z.infer<typeof createUpdateMetricSchema>
