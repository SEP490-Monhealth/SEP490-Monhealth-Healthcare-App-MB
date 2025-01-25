import React from "react"

import { Text } from "react-native"
import { View } from "react-native"

import { formatDuration } from "@/utils/formatters"

import { Card, HStack } from "../atoms"

interface ExerciseCardProps {
  name: string
  duration: number
  caloriesBurned: number
  onPress?: () => void
}

const ExerciseCard = ({
  name,
  duration,
  caloriesBurned,
  onPress
}: ExerciseCardProps) => {
  return (
    <Card onPress={onPress}>
      <HStack gap={8} className="w-full items-center justify-between">
        <View className="flex-1">
          <Text className="font-tmedium text-lg text-primary">{name}</Text>
          <Text className="font-tmedium text-sm text-accent">
            {caloriesBurned * duration} kcal
          </Text>
        </View>

        <Text className="font-tmedium text-sm text-primary">
          {formatDuration(duration)}
        </Text>
      </HStack>
    </Card>
  )
}

export default ExerciseCard
