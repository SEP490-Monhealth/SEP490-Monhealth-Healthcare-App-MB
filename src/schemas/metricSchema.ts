import { z } from "zod"

const activityLevels = [1.2, 1.375, 1.55, 1.725, 1.9]

const baseMetricSchema = z.object({
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
  gender: z.string().refine((val) => ["Male", "Female"].includes(val), {
    message: "Giới tính không hợp lệ. Chỉ chấp nhận 'Nam' hoặc 'Nữ'"
  }),
  height: z
    .number()
    .min(50, { message: "Chiều cao tối thiểu là 50 cm" })
    .max(300, { message: "Chiều cao tối đa là 300 cm" }),
  weight: z
    .number()
    .min(1, { message: "Cân nặng tối thiểu là 1 kg" })
    .max(500, { message: "Cân nặng tối đa là 500 kg" }),
  activityLevel: z.number().refine((value) => activityLevels.includes(value), {
    message:
      "Hệ số hoạt động không hợp lệ. Các giá trị hợp lệ: 1.2, 1.375, 1.55, 1.725, 1.9"
  }),

  goalType: z
    .string()
    .refine(
      (val) => ["WeightLoss", "MaintainWeight", "WeightGain"].includes(val),
      {
        message:
          "Mục tiêu phải là một trong các giá trị: Giảm cân, Duy trì cân nặng, Tăng cân"
      }
    ),
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
    .max(300, { message: "IBW tối đa là 300 kg" }),

  createdAt: z.string(),
  updatedAt: z.string(),
  createdBy: z.string(),
  updatedBy: z.string()
})

const metricSchema = baseMetricSchema.pick({
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
  ibw: true,
  createdAt: true,
  updatedAt: true,
  createdBy: true,
  updatedBy: true
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

export type MetricType = z.infer<typeof metricSchema>
export type CreateMetricType = z.infer<typeof createMetricSchema>
