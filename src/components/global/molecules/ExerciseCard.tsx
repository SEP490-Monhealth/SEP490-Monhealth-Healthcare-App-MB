import React from "react"

import { Text } from "react-native"
import { View } from "react-native"

import { ChevronRight } from "lucide-react-native"

import { COLORS } from "@/constants/color"

import { formatDuration, toFixed } from "@/utils/formatters"

import { Card, CardHeader, HStack } from "../atoms"

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
              ? `${formatDuration(duration ?? 0)} • ${toFixed(totalCalories)} kcal`
              : `${reps} lần • ${toFixed(totalCalories)} kcal`} */}
            {reps && reps > 0
              ? `${reps} lần • ${toFixed(calories)} kcal`
              : `${formatDuration(duration ?? 0)} • ${toFixed(calories)} kcal`}
          </Text>
        </View>

        <ChevronRight size={20} color={COLORS.primary} />
      </HStack>
    </Card>
  )
}
