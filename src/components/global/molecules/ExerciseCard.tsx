import React from "react"

import { Text } from "react-native"

import { formatDuration } from "@/utils/formatters"

import { Card, HStack, VStack } from "../atoms"

interface ExerciseCardProps {
  name: string
  duration: number
  caloriesBurned: number
  instructions: string
  onPress?: () => void
}

const ExerciseCard = ({
  name,
  duration,
  caloriesBurned,
  instructions,
  onPress
}: ExerciseCardProps) => {
  return (
    <Card onPress={onPress}>
      <HStack gap={4} className="w-full items-center justify-between">
        <Text className="flex-1">
          <VStack>
            <Text className="font-tmedium text-lg text-primary">{name}</Text>

            <Text
              className="font-tmedium text-sm text-accent"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {instructions}
            </Text>
          </VStack>
        </Text>

        <Text className="font-tregular text-sm text-primary">
          {formatDuration(duration)}
        </Text>
      </HStack>
    </Card>
  )
}

export default ExerciseCard
