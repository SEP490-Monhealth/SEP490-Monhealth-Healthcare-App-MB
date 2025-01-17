import React from "react"

import { VStack } from "@/components/global/atoms"

import { toFixed } from "@/utils/formatters"
import { getExerciseColor } from "@/utils/helpers"

import { WorkoutCard } from "./WorkoutCard"

export interface NutritionProps {
  label: string
  value: number
  targetValue: number
}

interface NutritionSummaryProps {
  progressData: NutritionProps[]
}

export const ExerciseSummary = ({ progressData }: NutritionSummaryProps) => {
  return (
    <VStack gap={12}>
      {progressData.map((exercise, index) => (
        <WorkoutCard
          key={index}
          label={exercise.label}
          value={toFixed(exercise.value, 1)}
          targetValue={toFixed(exercise.targetValue)}
          color={getExerciseColor(exercise.label) || "#334155"}
        />
      ))}
    </VStack>
  )
}
