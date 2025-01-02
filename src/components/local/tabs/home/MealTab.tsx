import React from "react"

import { View } from "react-native"

import { HStack, Progress, VStack } from "@/components/global/atoms"
import { MealCard } from "@/components/global/molecules"
import { Section } from "@/components/global/organisms"

import {
  NutritionProgress,
  NutritionSummary
} from "@/components/local/tabs/home"

import { useAuth } from "@/contexts/AuthContext"

import { useGetDailyMealByUserId } from "@/hooks/useDailyMeal"
import { useRouterHandlers } from "@/hooks/useRouter"

import { formatDateYYYYMMDD, toFixed } from "@/utils/formatters"

import LoadingScreen from "../../../../app/loading"

export const MealTab = () => {
  const { handleViewMeal } = useRouterHandlers()

  const { user } = useAuth()
  const userId = user?.userId

  console.log(userId)

  const today = formatDateYYYYMMDD(new Date())

  // const dyca = "2025-01-03"

  const { data: dailyMealData, isLoading } = useGetDailyMealByUserId(
    userId,
    today
  )

  const mealsData = dailyMealData?.items || []

  const calorieGoal = 1249

  const caloriesData = {
    label: "Calories",
    value: dailyMealData?.nutrition.calories || 0,
    targetValue: calorieGoal
  }

  const nutritionData = [
    {
      label: "Protein",
      value: dailyMealData?.nutrition.protein || 0,
      targetValue: 90
    },
    {
      label: "Carbs",
      value: dailyMealData?.nutrition.carbs || 0,
      targetValue: 144
    },
    { label: "Fat", value: dailyMealData?.nutrition.fat || 0, targetValue: 35 },
    {
      label: "Fiber",
      value: dailyMealData?.nutrition.fiber || 0,
      targetValue: 28
    },
    {
      label: "Sugar",
      value: dailyMealData?.nutrition.sugar || 0,
      targetValue: 25
    }
  ]

  if (!dailyMealData || isLoading) {
    return <LoadingScreen />
  }

  return (
    <View className="mt-4">
      <VStack gap={24}>
        <HStack center className="justify-between">
          <NutritionProgress
            calorieData={caloriesData}
            nutritionData={nutritionData}
          />

          <NutritionSummary nutritionData={nutritionData} />
        </HStack>
      </VStack>

      <Progress
        height={8}
        progress={(caloriesData.value / calorieGoal) * 100}
        labelStart="Mục tiêu hằng ngày"
        labelEnd={`${toFixed((caloriesData.value / calorieGoal) * 100, 0)}%`}
        className="mt-8"
      />

      <Section label="Bữa ăn hôm nay" />

      <VStack gap={12}>
        {mealsData.map((item) => (
          <MealCard
            key={item.mealId}
            type={item.type as "Breakfast" | "Lunch" | "Dinner" | "Snack"}
            calories={item.calories}
            onPress={() => handleViewMeal(item.mealId)}
          />
        ))}
      </VStack>
    </View>
  )
}
