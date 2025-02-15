import { z } from "zod"

import { GoalEnum } from "@/constants/enums"

import { timestampSchema } from "./commonSchema"

const GoalTypeEnum = z.nativeEnum(GoalEnum)

const baseGoalSchema = z
  .object({
    goalId: z.string(),
    userId: z.string(),

    type: GoalTypeEnum,

    caloriesRatio: z.number().optional(),

    weightGoal: z
      .number()
      .min(1, { message: "Trọng lượng mục tiêu phải lớn hơn hoặc bằng 1" })
      .optional(),

    caloriesGoal: z
      .number()
      .min(1, { message: "Mục tiêu calo phải lớn hơn hoặc bằng 1" })
      .optional(),
    proteinGoal: z
      .number()
      .min(1, { message: "Mục tiêu protein phải lớn hơn hoặc bằng 1" })
      .optional(),
    carbsGoal: z
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

    waterIntakesGoal: z
      .number()
      .min(1, { message: "Mục tiêu nước uống phải lớn hơn hoặc bằng 1" })
      .optional(),

    caloriesBurnedGoal: z
      .number()
      .min(1, {
        message: "Mục tiêu calo tập luyện phải lớn hơn hoặc bằng 1"
      })
      .optional(),
    durationGoal: z
      .number()
      .min(1, {
        message: "Mục tiêu thời gian tập luyện phải lớn hơn hoặc bằng 1"
      })
      .optional(),

    stepsGoal: z
      .number()
      .min(1, {
        message: "Mục tiêu bước chân phải lớn hơn hoặc bằng 1"
      })
      .optional(),

    status: z
      .string()
      .refine((val) => ["Abandoned", "Active", "Completed"].includes(val), {
        message:
          "Trạng thái mục tiêu không hợp lệ. Chỉ chấp nhận: Abandoned, Active, Completed"
      })
  })
  .merge(timestampSchema)

export const goalSchema = baseGoalSchema
  .pick({
    goalId: true,
    userId: true,
    type: true,
    weightGoal: true,
    caloriesGoal: true,
    proteinGoal: true,
    carbsGoal: true,
    fatGoal: true,
    fiberGoal: true,
    sugarGoal: true,
    waterIntakesGoal: true,
    caloriesBurnedGoal: true,
    durationGoal: true,
    stepsGoal: true,
    status: true
  })
  .merge(timestampSchema)

export const weightGoalSchema = baseGoalSchema.pick({
  weightGoal: true
})

export const nutritionGoalSchema = baseGoalSchema.pick({
  caloriesGoal: true,
  proteinGoal: true,
  carbsGoal: true,
  fatGoal: true,
  fiberGoal: true,
  sugarGoal: true
})

export const waterIntakeGoalSchema = baseGoalSchema.pick({
  waterIntakesGoal: true
})

export const exerciseGoalSchema = baseGoalSchema.pick({
  durationGoal: true,
  caloriesBurnedGoal: true
})

export const stepsGoalSchema = baseGoalSchema.pick({
  stepsGoal: true
})

export const createGoalSchema = baseGoalSchema.pick({
  userId: true,
  type: true,
  weightGoal: true,
  caloriesGoal: true,
  proteinGoal: true,
  carbsGoal: true,
  fatGoal: true,
  fiberGoal: true,
  sugarGoal: true,
  waterIntakesGoal: true,
  caloriesBurnedGoal: true,
  durationGoal: true,
  stepsGoal: true
})

export const typeGoalSchema = z.object({
  goalType: GoalTypeEnum
})

export const caloriesRatioSchema = baseGoalSchema.pick({
  caloriesRatio: true
})

export type GoalType = z.infer<typeof goalSchema>
export type WeightGoalType = z.infer<typeof weightGoalSchema>
export type NutritionGoalType = z.infer<typeof nutritionGoalSchema>
export type WaterIntakeGoalType = z.infer<typeof waterIntakeGoalSchema>
export type ExerciseGoalType = z.infer<typeof exerciseGoalSchema>
export type StepsGoalType = z.infer<typeof stepsGoalSchema>
export type CreateGoalType = z.infer<typeof createGoalSchema>
