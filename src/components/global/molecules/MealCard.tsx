import React from "react"

import { Text } from "react-native"

import { useRouter } from "expo-router"

import { Reserve } from "iconsax-react-native"
import { ChevronRight } from "lucide-react-native"

import { COLORS } from "@/constants/appConstants"

import { Card, HStack, Progress, VStack } from "../atoms"

interface MealCardProps {
  mealType: "Bữa sáng" | "Bữa trưa" | "Bữa tối" | "Bữa phụ"
  totalCalories: number
  progress?: number
}

export const MealCard = ({
  mealType = "Bữa sáng",
  totalCalories,
  progress
}: MealCardProps) => {
  const router = useRouter()

  const handleViewMeal = () => {
    const routeMap: Record<string, string> = {
      "Bữa sáng": "/meals/breakfast",
      "Bữa trưa": "/meals/lunch",
      "Bữa tối": "/meals/dinner",
      "Bữa phụ": "/meals/snack"
    }

    router.push(routeMap[mealType] || "/meals")
  }

  return (
    <Card
      className="flex flex-row items-center justify-between"
      onPress={handleViewMeal}
    >
      <HStack gap={16} center>
        <Reserve variant="Bold" size="32" color={COLORS.secondary} />

        <VStack gap={0}>
          <Text className="font-tmedium text-lg text-typography">
            {mealType}
          </Text>

          {progress && <Progress progress={progress || 0} />}

          <Text className="font-tmedium text-sm text-muted">
            {totalCalories} calories
          </Text>
        </VStack>
      </HStack>

      {!progress && <ChevronRight size={20} color={COLORS.primary} />}
    </Card>
  )
}
