import React from "react"

import { Text } from "react-native"
import { View } from "react-native"

import { ArrowSwapHorizontal } from "iconsax-react-native"

import { COLORS } from "@/constants/app"
import { ExerciseEnum } from "@/constants/enums"

import { formatDuration } from "@/utils/formatters"

import { Card, HStack } from "../atoms"
import { IconButton } from "./IconButton"

const calculateCalories = (
  type: ExerciseEnum,
  duration?: number,
  reps?: number,
  caloriesPerMinute?: number
) => {
  if (!caloriesPerMinute) return 0

  if (type === ExerciseEnum.Time) {
    return (caloriesPerMinute * (duration ?? 0)) / 60
  }

  if (type === ExerciseEnum.Reps) {
    return caloriesPerMinute * (reps ?? 0) * 0.1
  }

  return 0
}

interface ExerciseCardProps {
  type: ExerciseEnum
  name: string
  duration?: number
  reps?: number
  calories: number
  onPress?: () => void
}

const ExerciseCard = ({
  type,
  name,
  duration,
  reps,
  calories,
  onPress
}: ExerciseCardProps) => {
  const totalCalories = calculateCalories(type, duration, reps, calories)

  return (
    <Card onPress={onPress}>
      <HStack className="w-full items-center justify-between">
        <View className="flex-1">
          <Text className="font-tmedium text-lg text-primary">{name}</Text>
          <Text className="font-tmedium text-sm text-accent">
            {type === ExerciseEnum.Time
              ? `${formatDuration(duration ?? 0)} • ${totalCalories} kcal`
              : `${reps} lần • ${totalCalories} kcal`}
          </Text>
        </View>

        <IconButton
          testID="test-icon-add-button"
          size="sm"
          icon={<ArrowSwapHorizontal size={16} color={COLORS.primary} />}
        />
      </HStack>
    </Card>
  )
}

export default ExerciseCard
