import React from "react"

import { Text } from "react-native"

import { toFixed } from "@/utils/formatters"

import { Card, CardHeader, VStack } from "../atoms"

interface WorkoutCardProps {
  name: string
  exercises: number
  duration: number
  caloriesBurned: number
  onPress?: () => void
}

export const WorkoutCard = ({
  name,
  exercises,
  duration,
  caloriesBurned,
  onPress
}: WorkoutCardProps) => {
  return (
    <Card onPress={onPress}>
      <VStack gap={0}>
        <CardHeader label={name} />

        <Text className="font-tmedium text-sm text-accent">
          {exercises} bài tập • {toFixed(caloriesBurned, 1)} kcal • {duration}{" "}
          phút
        </Text>
      </VStack>
    </Card>
  )
}
