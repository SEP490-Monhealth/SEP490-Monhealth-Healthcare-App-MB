import React from "react"

import { Text } from "react-native"
import { View } from "react-native"

import { DifficultyLevelEnum } from "@/constants/enums"

import { formatDuration } from "@/utils/formatters"
import { getEnumValue } from "@/utils/helpers"

import { Card, HStack } from "../atoms"

interface ExerciseCardProps {
  name: string
  duration: number
  caloriesBurned: number
  difficulty: DifficultyLevelEnum
  onPress?: () => void
}

const ExerciseCard = ({
  name,
  duration,
  caloriesBurned,
  difficulty,
  onPress
}: ExerciseCardProps) => {
  return (
    <Card onPress={onPress}>
      <HStack className="w-full items-center justify-between">
        <View className="flex-1">
          <Text className="font-tmedium text-lg text-primary">{name}</Text>
          <Text className="font-tmedium text-sm text-accent">
            {getEnumValue(difficulty, DifficultyLevelEnum)} •{" "}
            {caloriesBurned * duration} kcal
          </Text>
        </View>

        <Text className="font-tmedium text-base text-secondary">
          {formatDuration(duration)}
        </Text>
      </HStack>
    </Card>
  )
}

export default ExerciseCard
