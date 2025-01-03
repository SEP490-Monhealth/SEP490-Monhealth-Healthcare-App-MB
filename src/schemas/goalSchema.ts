import { z } from "zod"

const baseGoalSchema = z.object({
  goalId: z.string(),
  userId: z.string(),

  type: z
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

  calorieGoal: z
    .number()
    .min(1, { message: "Mục tiêu calo phải lớn hơn hoặc bằng 1" })
    .optional(),
  proteinGoal: z
    .number()
    .min(1, { message: "Mục tiêu protein phải lớn hơn hoặc bằng 1" })
    .optional(),
  carbGoal: z
    .number()
    .min(1, { message: "Mục tiêu carbohydrate phải lớn hơn hoặc bằng 1" })
    .optional(),
  fatGoal: z
    .number()
    .min(1, { message: "Mục tiêu chất béo phải lớn hơn hoặc bằng 1" })
    .optional(),
  fiberGoal: z
    .number()
    .min(1, { message: "Mục tiêu chất xơ phải lớn hơn hoặc bằng 1" })
    .optional(),
  sugarGoal: z
    .number()
    .min(1, { message: "Mục tiêu đường phải lớn hơn hoặc bằng 1" })
    .optional(),

  waterGoal: z
    .number()
    .min(1, { message: "Mục tiêu nước uống phải lớn hơn hoặc bằng 1" })
    .optional(),

  exerciseGoal: z
    .number()
    .min(1, { message: "Mục tiêu tập thể dục phải lớn hơn hoặc bằng 1" })
    .optional(),

  status: z
    .string()
    .refine((val) => ["Abandoned", "Active", "Completed"].includes(val), {
      message:
        "Trạng thái phải là một trong các giá trị: Bỏ dở, Đang hoạt động, Hoàn thành"
    }),

  createdAt: z.string(),
  updatedAt: z.string(),
  createdBy: z.string(),
  updatedBy: z.string()
})

export const goalSchema = baseGoalSchema.pick({
  goalId: true,
  userId: true,
  type: true,
  weightGoal: true,
  calorieGoal: true,
  proteinGoal: true,
  carbGoal: true,
  fatGoal: true,
  fiberGoal: true,
  sugarGoal: true,
  waterGoal: true,
  exerciseGoal: true,
  status: true,
  createdAt: true,
  updatedAt: true,
  createdBy: true,
  updatedBy: true
})

export const createGoalSchema = baseGoalSchema.pick({
  userId: true,
  type: true,
  weightGoal: true,
  calorieGoal: true,
  proteinGoal: true,
  carbGoal: true,
  fatGoal: true,
  fiberGoal: true,
  sugarGoal: true,
  waterGoal: true,
  exerciseGoal: true
})

export const typeGoalSchema = z.object({
  goal: z
    .string()
    .refine(
      (val) => ["WeightLoss", "MaintainWeight", "WeightGain"].includes(val),
      {
        message:
          "Mục tiêu phải là một trong các giá trị: Giảm cân, Duy trì cân nặng, Tăng cân"
      }
    )
})

export type GoalType = z.infer<typeof goalSchema>
export type CreateGoalType = z.infer<typeof createGoalSchema>
