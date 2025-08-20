import { z } from "zod"

import { GoalType as GoalTypeEnum } from "@/constants/enums/GoalType"

import { timestampSchema, uuidSchema } from "./commonValidation"

const goalSchema = z
  .object({
    id: uuidSchema,
    userId: uuidSchema,

    type: z.enum(GoalTypeEnum, { error: "Loại mục tiêu không hợp lệ" }),

    targetWeight: z
      .number()
      .positive({ error: "Cân nặng mục tiêu phải lớn hơn 0" })
      .min(35, { error: "Cân nặng mục tiêu phải ít nhất 35kg" })
      .max(200, { error: "Cân nặng mục tiêu không được vượt quá 200kg" })
      .optional(),
    weeklyWeightChange: z
      .number()
      .min(-1.5, { error: "Không nên giảm quá 1.5kg/tuần" })
      .max(0.8, { error: "Không nên tăng quá 0.8kg/tuần" })
      .optional(),

    dailyCalories: z
      .number()
      .int({ error: "Lượng calo phải là số nguyên" })
      .min(800, { error: "Lượng calo tối thiểu là 800 kcal/ngày" })
      .max(5000, { error: "Lượng calo không nên vượt quá 5000 kcal/ngày" }),
    dailyProtein: z
      .number()
      .nonnegative({ error: "Lượng protein không được âm" })
      .max(300, { error: "Lượng protein không nên vượt quá 300g/ngày" }),
    dailyCarbs: z
      .number()
      .nonnegative({ error: "Lượng carbs không được âm" })
      .max(800, { error: "Lượng carbs không nên vượt quá 800g/ngày" }),
    dailyFat: z
      .number()
      .nonnegative({ error: "Lượng chất béo không được âm" })
      .max(200, { error: "Lượng chất béo không nên vượt quá 200g/ngày" })
      .optional(),
    dailyFiber: z
      .number()
      .nonnegative({ error: "Lượng chất xơ không được âm" })
      .max(100, { error: "Lượng chất xơ không nên vượt quá 100g/ngày" })
      .optional(),
    dailySugar: z
      .number()
      .nonnegative({ error: "Lượng đường không được âm" })
      .max(150, { error: "Lượng đường không nên vượt quá 150g/ngày" })
      .optional(),
    dailySodium: z
      .number()
      .nonnegative({ error: "Lượng natri không được âm" })
      .max(6000, { error: "Lượng natri không nên vượt quá 6000mg/ngày" })
      .optional(),

    dailyWater: z
      .number()
      .int({ error: "Lượng nước phải là số nguyên" })
      .min(1000, { error: "Lượng nước tối thiểu là 1000ml/ngày" })
      .max(5000, { error: "Lượng nước không nên vượt quá 5000ml/ngày" }),

    startDate: z
      .string()
      .nonempty({ error: " Ngày bắt đầu không được để trống" })
      .date({ error: "Ngày bắt đầu không hợp lệ" }),
    endDate: z.date({ error: "Ngày kết thúc không hợp lệ" }).optional(),

    isActive: z.boolean().default(true),

    ...timestampSchema.shape
  })
  .refine(
    (data) => {
      if (data.endDate) {
        return new Date(data.endDate) > new Date(data.startDate)
      }
      return true
    },
    {
      error: "Ngày kết thúc phải sau ngày bắt đầu",
      path: ["endDate"]
    }
  )

export const updateGoalTypeSchema = goalSchema.pick({
  type: true
})

export type Goal = z.infer<typeof goalSchema>
export type UpdateGoalType = z.infer<typeof updateGoalTypeSchema>
