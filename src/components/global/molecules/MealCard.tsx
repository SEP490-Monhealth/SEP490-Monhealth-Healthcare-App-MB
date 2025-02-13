import React from "react"

import { Image, Text, TouchableOpacity, View } from "react-native"

import { ChevronRight } from "lucide-react-native"

import { COLORS } from "@/constants/app"

import { cn } from "@/lib/utils"

import { toFixed } from "@/utils/formatters"
import { getMealTypeImage, translateMealType } from "@/utils/helpers"

import { Card, Progress } from "../atoms"

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
  const gapClass = progress ? "gap-0" : "gap-1"

  return (
    <Card
      onPress={onPress}
      className="flex flex-row items-center justify-between"
    >
      <TouchableOpacity
        activeOpacity={1}
        onPress={onPress}
        className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted"
      >
        <Image
          testID="test-image"
          source={getMealTypeImage(type)}
          style={{ width: 24, height: 24 }}
        />
      </TouchableOpacity>

      <View className={cn("flex-1", gapClass)}>
        <Text className="font-tmedium text-base text-primary">
          {translateMealType(type)} {progress ? `(${progress}%)` : ""}
        </Text>

        {progress && (
          <Progress
            testID="test-progress-bar"
            progress={progress}
            height={7}
            color={COLORS.PRIMARY.lemon}
            className="mt-2"
          />
        )}

        <Text className="font-tmedium text-sm text-accent">
          {totalFoods} món ăn • {toFixed(totalCalories, 0)} kcal
        </Text>
      </View>

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
