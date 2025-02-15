import React from "react"

import { Text } from "react-native"

import { Card, HStack, VStack } from "../atoms"

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
      <HStack className="w-full items-center justify-between">
        <HStack gap={12} center onPress={onPress}>
          <VStack gap={0}>
            <Text className="font-tmedium text-lg text-primary">{name}</Text>
            <Text className="font-tmedium text-sm text-accent">
              {exercises} bài tập • {caloriesBurned} kcal • {duration} phút
            </Text>
          </VStack>
        </HStack>
      </HStack>
    </Card>
  )
}
