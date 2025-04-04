import { z } from "zod"

import { GoalStatusSchemaEnum, GoalTypeSchemaEnum } from "@/constants/enum/Goal"

import { timestampFields, uuidSchema } from "./baseSchema"

const caloriesRatios = [0.9, 0.8, 0.7, 1, 1.1, 1.2, 1.3]

export const goalSchema = z.object({
  goalId: uuidSchema,
  userId: uuidSchema,

  type: GoalTypeSchemaEnum,

  caloriesRatio: z.number().refine((val) => caloriesRatios.includes(val), {
    message: `Tỷ lệ calo không hợp lệ. Các giá trị hợp lệ: ${caloriesRatios.join(", ")}`
  }),

  weightGoal: z
    .number()
    .min(1, { message: "Trọng lượng mục tiêu phải lớn hơn hoặc bằng 1" })
    .optional(),

  caloriesGoal: z.number(),
  proteinGoal: z.number(),
  carbsGoal: z.number(),
  fatGoal: z.number(),
  fiberGoal: z.number(),
  sugarGoal: z.number(),

  waterIntakesGoal: z.number(),

  workoutDurationGoal: z.number(),
  caloriesBurnedGoal: z.number(),

  status: GoalStatusSchemaEnum,

  ...timestampFields
})

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
  caloriesGoal: true,
  caloriesBurnedGoal: true,
  workoutDurationGoal: true
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
