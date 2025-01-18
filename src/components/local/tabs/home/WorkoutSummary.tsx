import React from "react"

import { VStack } from "@/components/global/atoms"

import { toFixed } from "@/utils/formatters"
import { getWorkoutColor } from "@/utils/helpers"

import { WorkoutCard } from "./WorkoutCard"

export interface WorkoutProps {
  label: string
  value: number
  targetValue: number
}

interface WorkoutSummaryProps {
  workoutsData: WorkoutProps[]
}

export const WorkoutSummary = ({ workoutsData }: WorkoutSummaryProps) => {
  return (
    <VStack gap={12}>
      {workoutsData.map((exercise, index) => (
        <WorkoutCard
          key={index}
          label={exercise.label}
          value={toFixed(exercise.value, 1)}
          targetValue={toFixed(exercise.targetValue)}
          color={getWorkoutColor(exercise.label) || "#334155"}
        />
      ))}
    </VStack>
  )
}
