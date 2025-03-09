import { z } from "zod"

import { GoalStatusSchemaEnum, GoalTypeSchemaEnum } from "@/constants/enum/Goal"

import { timestampFields, uuidSchema } from "./baseSchema"

const baseGoalSchema = z.object({
  goalId: uuidSchema,
  userId: uuidSchema,

  type: GoalTypeSchemaEnum,

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

  status: GoalStatusSchemaEnum,

  ...timestampFields
})

export const goalSchema = baseGoalSchema

export const weightGoalSetupSchema = goalSchema.pick({
  weightGoal: true
})

export const nutritionGoalSchema = goalSchema.pick({
  caloriesGoal: true,
  proteinGoal: true,
  carbsGoal: true,
  fatGoal: true,
  fiberGoal: true,
  sugarGoal: true
})

export const waterIntakeGoalSchema = goalSchema.pick({
  waterIntakesGoal: true
})

export const workoutGoalSchema = goalSchema.pick({
  durationGoal: true,
  caloriesBurnedGoal: true
})

export const goalTypeSetupSchema = z.object({
  goalType: GoalTypeSchemaEnum
})

export const caloriesRatioSetupSchema = goalSchema.pick({
  caloriesRatio: true
})

export type GoalType = z.infer<typeof goalSchema>
export type WeightGoalType = z.infer<typeof weightGoalSetupSchema>
export type NutritionGoalType = z.infer<typeof nutritionGoalSchema>
export type WaterIntakeGoalType = z.infer<typeof waterIntakeGoalSchema>
export type WorkoutGoalType = z.infer<typeof workoutGoalSchema>
