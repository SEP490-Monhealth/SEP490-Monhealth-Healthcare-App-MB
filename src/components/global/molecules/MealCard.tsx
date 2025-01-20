import React from "react"

import { Image, Text, TouchableOpacity } from "react-native"

import { ChevronRight } from "lucide-react-native"

import { COLORS } from "@/constants/app"

import { toFixed } from "@/utils/formatters"
import { getMealTypeImage, getMealTypeName } from "@/utils/helpers"

import { Card, HStack, Progress, VStack } from "../atoms"

interface MealCardProps {
  type: "Breakfast" | "Lunch" | "Dinner" | "Snack"
  totalFoods?: number
  totalCalories: number
  progress?: number
  onPress?: () => void
}

export const MealCard = ({
  type = "Breakfast",
  totalFoods = 0,
  totalCalories,
  progress,
  onPress
}: MealCardProps) => {
  return (
    <Card
      onPress={onPress}
      className="flex flex-row items-center justify-between"
    >
      <HStack gap={16} center>
        <TouchableOpacity
          activeOpacity={1}
          onPress={onPress}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-muted"
        >
          <Image
            testID="test-meal-image"
            source={getMealTypeImage(type)}
            style={{ width: 24, height: 24 }}
          />
        </TouchableOpacity>

        <VStack gap={0}>
          <Text className="font-tmedium text-lg text-primary">
            {getMealTypeName(type)}
          </Text>

          {progress && (
            <Progress
              testID="progress-bar"
              progress={progress}
              className="mt-2"
            />
          )}

          <Text className="font-tmedium text-sm text-accent">
            {totalFoods} món ăn • {toFixed(totalCalories, 0)} kcal
          </Text>
        </VStack>
      </HStack>

      {!progress && (
        <ChevronRight
          testID="chevron-right-icon"
          size={20}
          color={COLORS.primary}
        />
      )}
    </Card>
  )
}
