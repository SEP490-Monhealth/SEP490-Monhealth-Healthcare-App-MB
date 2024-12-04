import React from "react"

import { Text } from "react-native"

import { Reserve } from "iconsax-react-native"
import { MoreHorizontal } from "lucide-react-native"

import { COLORS } from "@/constants/appConstants"

import { HStack, Progress, VStack } from "../atoms"

interface MealCardProps {
  mealType: string
  totalCalories: number
  progress?: number
}

export const MealCard = ({
  mealType,
  totalCalories,
  progress
}: MealCardProps) => {
  return (
    <HStack className="justify-between p-5">
      <Reserve variant="Bold" size="40" color={COLORS.secondary} />

      <VStack gap={2}>
        <Text className="font-dmedium text-sm text-typography">{mealType}</Text>

        {progress && <Progress progress={progress || 0} />}

        <Text className="font-tregular text-xs text-accent">
          {totalCalories} calories
        </Text>
      </VStack>

      {!progress && <MoreHorizontal size={24} color={COLORS.secondary} />}
    </HStack>
  )
}
