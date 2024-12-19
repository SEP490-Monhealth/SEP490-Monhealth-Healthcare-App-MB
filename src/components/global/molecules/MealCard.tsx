import React from "react"

import { Text } from "react-native"
import { View } from "react-native"

import { useRouter } from "expo-router"

import { Reserve } from "iconsax-react-native"
import { ChevronRight } from "lucide-react-native"

import { COLORS } from "@/constants/appConstants"

import { getMealTypeName } from "@/utils/helpers"

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
        <Reserve variant="Bold" size="32" color={COLORS.secondary} />

        <View>
          <Text className="font-tmedium text-lg text-primary">
            {getMealTypeName(mealType)}
          </Text>

          {progress && <Progress progress={progress || 0} />}

          <Text className="font-tmedium text-sm text-accent">
            {totalCalories} kcal
          </Text>
        </View>
      </HStack>

      {!progress && <ChevronRight size={20} color={COLORS.primary} />}
    </Card>
  )
}
