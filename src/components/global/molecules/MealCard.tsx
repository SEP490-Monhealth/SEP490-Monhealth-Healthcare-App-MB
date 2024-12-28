import React from "react"

import { Image, Text, TouchableOpacity } from "react-native"
import { View } from "react-native"

import { useRouter } from "expo-router"

import { ChevronRight } from "lucide-react-native"

import { COLORS } from "@/constants/app"

import { getMealTypeImage, getMealTypeName } from "@/utils/helpers"

import { Card, HStack, Progress } from "../atoms"

interface MealCardProps {
  mealType: "Breakfast" | "Lunch" | "Dinner" | "Snack"
  totalCalories: number
  progress?: number
}

export const MealCard = ({
  mealType = "Breakfast",
  totalCalories,
  progress
}: MealCardProps) => {
  const router = useRouter()

  const mealId = "c43ad7ca"

  const handleViewMeal = () => {
    router.push(`/meals/${mealId}/details`)
  }

  return (
    <Card
      className="flex flex-row items-center justify-between"
      onPress={handleViewMeal}
    >
      <HStack gap={16} center>
        <TouchableOpacity
          activeOpacity={1}
          onPress={handleViewMeal}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-muted"
        >
          <Image
            testID="test-meal-image"
            source={getMealTypeImage(mealType)}
            style={{
              width: 24,
              height: 24,
              resizeMode: "cover"
            }}
          />
        </TouchableOpacity>

        <View>
          <Text className="font-tmedium text-lg text-primary">
            {getMealTypeName(mealType)}
          </Text>

          {progress !== undefined && (
            <Progress
              testID="progress-bar"
              progress={progress}
              className="mt-2"
            />
          )}

          <Text className="font-tmedium text-sm text-accent">
            {totalCalories} kcal
          </Text>
        </View>
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
