import { GoalTypeEnum } from "@/constants/enum/Goal"

import { formatDate } from "@/utils/formatters"

export interface TimelineData {
  weeklyChange: number
  weeksToGoal: number
  targetDate?: Date
  labels: string[]
  chartData: { date: string; weight: number }[]
}

export interface TimelineParams {
  weight: number
  weightGoal: number
  goalType: GoalTypeEnum
  caloriesRatio: number
  maxWeeks?: number
}

export function calculateWeeklyChange(
  goalType: GoalTypeEnum,
  caloriesRatio: number
): number {
  if (goalType === GoalTypeEnum.WeightLoss && caloriesRatio < 1) {
    return -(1 - caloriesRatio) * 2.5
  }
  if (goalType === GoalTypeEnum.WeightGain && caloriesRatio > 1) {
    return (caloriesRatio - 1) * 2.5
  }
  return 0
}

export function calculateTimeline({
  weight,
  weightGoal,
  goalType,
  caloriesRatio,
  maxWeeks
}: TimelineParams): TimelineData {
  const today = new Date()
  const weeklyChange = calculateWeeklyChange(goalType, caloriesRatio)

  if (goalType === GoalTypeEnum.Maintenance) {
    const defaultWeeks = maxWeeks ?? 16
    const labels: string[] = []
    const chartData: { date: string; weight: number }[] = []

    for (let i = 0; i <= defaultWeeks; i++) {
      const d = new Date(today)
      d.setDate(today.getDate() + i * 7)
      const dateStr = formatDate(d)
      labels.push(dateStr)
      chartData.push({ date: dateStr, weight: parseFloat(weight.toFixed(1)) })
    }

    return {
      weeklyChange: 0,
      weeksToGoal: 0,
      targetDate: today,
      labels,
      chartData
    }
  }

  const diff = weightGoal - weight
  const weeksCalc = weeklyChange !== 0 ? Math.abs(diff / weeklyChange) : 0
  const fullWeeks = Math.ceil(weeksCalc)
  const weekCount = maxWeeks != null ? Math.min(fullWeeks, maxWeeks) : fullWeeks

  const targetDate = new Date(today)
  targetDate.setDate(today.getDate() + fullWeeks * 7)

  const labels: string[] = []
  const chartData: { date: string; weight: number }[] = []

  for (let i = 0; i <= weekCount; i++) {
    const d = new Date(today)
    d.setDate(today.getDate() + i * 7)
    const dateStr = formatDate(d)
    labels.push(dateStr)

    const currentWeight = weight + weeklyChange * i
    const adjusted =
      goalType === GoalTypeEnum.WeightLoss
        ? Math.max(currentWeight, weightGoal)
        : Math.min(currentWeight, weightGoal)

    chartData.push({ date: dateStr, weight: parseFloat(adjusted.toFixed(1)) })
  }

  return {
    weeklyChange,
    weeksToGoal: fullWeeks,
    targetDate,
    labels,
    chartData
  }
}
