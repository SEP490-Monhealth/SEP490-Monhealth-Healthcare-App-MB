import { z } from "zod"

const metricSchema = z.object({
  metricId: z.string(),
  userId: z.string(),
  height: z
    .number()
    .positive({ message: "Chiều cao phải là số dương" })
    .min(50, { message: "Chiều cao tối thiểu là 50 cm" })
    .max(300, { message: "Chiều cao tối đa là 300 cm" }),
  weight: z
    .number()
    .positive({ message: "Cân nặng phải là số dương" })
    .min(1, { message: "Cân nặng tối thiểu là 1 kg" })
    .max(500, { message: "Cân nặng tối đa là 500 kg" }),
  bmi: z
    .number()
    .min(10, { message: "BMI phải lớn hơn hoặc bằng 10" })
    .max(60, { message: "BMI phải nhỏ hơn hoặc bằng 60" }),
  bmr: z
    .number()
    .positive({ message: "BMR phải là số dương" })
    .min(100, { message: "BMR tối thiểu là 100" })
    .max(5000, { message: "BMR tối đa là 5000" }),
  tdee: z
    .number()
    .positive({ message: "TDEE phải là số dương" })
    .min(1000, { message: "TDEE tối thiểu là 1000" })
    .max(10000, { message: "TDEE tối đa là 10000" }),
  ibw: z
    .number()
    .positive({ message: "IBW phải là số dương" })
    .min(30, { message: "IBW tối thiểu là 30 kg" })
    .max(300, { message: "IBW tối đa là 300 kg" }),
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
