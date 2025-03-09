import React from "react"

import { Text } from "react-native"
import { View } from "react-native"

import { ArrowSwapHorizontal } from "iconsax-react-native"

import { COLORS } from "@/constants/color"

import { formatDuration, toFixed } from "@/utils/formatters"

import { Card, CardHeader, HStack } from "../atoms"
import { IconButton } from "./IconButton"

interface ExerciseCardProps {
  name: string
  duration?: number
  reps?: number
  calories: number
  onPress?: () => void
}

export const ExerciseCard = ({
  name,
  duration,
  reps,
  calories,
  onPress
}: ExerciseCardProps) => {
  return (
    <Card onPress={onPress}>
      <HStack className="w-full items-center justify-between">
        <View className="flex-1">
          <CardHeader label={name} />

          <Text className="font-tmedium text-sm text-accent">
            {/* {type === TypeExerciseEnum.Time
              ? `${formatDuration(duration ?? 0)} • ${toFixed(totalCalories, 1)} kcal`
              : `${reps} lần • ${toFixed(totalCalories, 1)} kcal`} */}
            {reps && reps > 0
              ? `${reps} lần • ${toFixed(calories, 1)} kcal`
              : `${formatDuration(duration ?? 0)} • ${toFixed(calories, 1)} kcal`}
          </Text>
        </View>

        <IconButton
          size="sm"
          icon={<ArrowSwapHorizontal size={16} color={COLORS.primary} />}
        />
      </HStack>
    </Card>
  )
}
