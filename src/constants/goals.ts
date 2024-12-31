import { GoalType } from "@/schemas/goalSchema"

export const sampleGoalData: GoalType = {
  goalId: "12345",
  userId: "67890",
  type: "WeightLoss",

  weightGoal: 60,

  calorieGoal: 1500,
  proteinGoal: 100,
  carbGoal: 200,
  fatGoal: 50,
  fiberGoal: 30,
  sugarGoal: 20,

  waterGoal: 2000,
  exerciseGoal: 60,

  status: "Active",

  createdAt: "2025-01-06T00:00:00Z",
  updatedAt: "2025-01-06T00:00:00Z",
  createdBy: "asd",
  updatedBy: "asd"
}
