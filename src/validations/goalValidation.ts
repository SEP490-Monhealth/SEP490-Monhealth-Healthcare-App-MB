import { z } from "zod"

import { GoalType as GoalTypeEnum } from "@/constants/enums/GoalType"

import { uuidSchema } from "./commonValidation"

const goalSchema = z
  .object({
    id: uuidSchema,
    userId: uuidSchema,

    type: z.enum(Object.values(GoalTypeEnum) as [string, ...string[]], "Loại mục tiêu không hợp lệ"),

    targetWeight: z
      .number()
      .min(35, "Cân nặng mục tiêu phải ít nhất 35kg")
      .max(200, "Cân nặng mục tiêu không được vượt quá 200kg")
      .optional(),
    weeklyWeightChange: z
      .number()
      .min(-1.5, "Không nên giảm quá 1.5kg/tuần")
      .max(0.8, "Không nên tăng quá 0.8kg/tuần")
      .optional(),

    dailyCalories: z.number().optional(),
    dailyProtein: z.number().optional(),
    dailyCarbs: z.number().optional(),
    dailyFat: z.number().optional(),
    dailyFiber: z.number().optional(),
    dailySugar: z.number().optional(),
    dailySodium: z.number().optional(),

    dailyWater: z.number().optional(),

    startDate: z.string().nonempty("Ngày bắt đầu không được để trống").date("Ngày bắt đầu không hợp lệ"),
    endDate: z.date("Ngày kết thúc không hợp lệ").optional(),

    isActive: z.boolean().default(true),

    createdAt: z.date(),
    updatedAt: z.date()
  })
  .refine(
    (data) => {
      if (data.endDate) {
        return new Date(data.endDate) > new Date(data.startDate)
      }
      return true
    },
    {
      message: "Ngày kết thúc phải sau ngày bắt đầu",
      path: ["endDate"]
    }
  )

export const updateGoalTypeSchema = goalSchema.pick({
  type: true
})

export type Goal = z.infer<typeof goalSchema>
export type UpdateGoalType = z.infer<typeof updateGoalTypeSchema>
