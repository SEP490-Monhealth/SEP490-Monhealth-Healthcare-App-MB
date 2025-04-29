import React, { useEffect, useState } from "react"

import { Text, View } from "react-native"

import { useRouter } from "expo-router"

import { useIsFetching, useIsMutating } from "@tanstack/react-query"

import { HStack, VStack } from "@/components/global/atoms"
import { MealCard } from "@/components/global/molecules"
import { Section } from "@/components/global/organisms"

import { MealTypeEnum } from "@/constants/enum/Food"

import { useGetNutritionGoal } from "@/hooks/useGoal"
import {
  useGetDailyMealByUserId,
  useGetWeeklyMealByUserId
} from "@/hooks/useTracker"

import { toFixed } from "@/utils/formatters"
import { getWeekRange } from "@/utils/helpers"

import { BarChart } from "./BarChart"

const LABELS = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"]

const MEAL_TYPE_DISTRIBUTION = {
  [MealTypeEnum.Breakfast]: 0.3,
  [MealTypeEnum.Lunch]: 0.35,
  [MealTypeEnum.Dinner]: 0.25,
  [MealTypeEnum.Snack]: 0.1
}

interface MealTabProps {
  userId?: string
  onOverlayLoading: (isLoading: boolean) => void
}

export const MealTab = ({ userId, onOverlayLoading }: MealTabProps) => {
  const router = useRouter()

  const today = new Date()
  const todayWithOffset = new Date(today.getTime() + 7 * 60 * 60 * 1000)
  const formattedDate = todayWithOffset.toISOString().split("T")[0]

  const [selectedDate, setSelectedDate] = useState<string>(formattedDate)

  const { data: weeklyMealData } = useGetWeeklyMealByUserId(
    userId,
    formattedDate
  )
  const { data: dailyMealData } = useGetDailyMealByUserId(userId, selectedDate)
  const { data: nutritionGoalData } = useGetNutritionGoal(userId)

  // console.log(JSON.stringify(weeklyMealData, null, 2));
  // console.log(JSON.stringify(dailyMealData, null, 2));

  const isFetching = useIsFetching()
  const isMutating = useIsMutating()

  useEffect(() => {
    onOverlayLoading(isFetching > 0 || isMutating > 0)
  }, [isFetching, isMutating, onOverlayLoading])

  const reportDate = getWeekRange(formattedDate)
  const mealsData = dailyMealData?.items || []

  const caloriesData = weeklyMealData?.map((item) => item.calories)
  const totalCalories = caloriesData?.reduce((a, b) => a + b, 0)

  const dailyCaloriesGoal = nutritionGoalData?.caloriesGoal

  const breakfastCaloriesGoal =
    (dailyCaloriesGoal ?? 0) * MEAL_TYPE_DISTRIBUTION[MealTypeEnum.Breakfast]
  const lunchCaloriesGoal =
    (dailyCaloriesGoal ?? 0) * MEAL_TYPE_DISTRIBUTION[MealTypeEnum.Lunch]
  const dinnerCaloriesGoal =
    (dailyCaloriesGoal ?? 0) * MEAL_TYPE_DISTRIBUTION[MealTypeEnum.Dinner]
  const snackCaloriesGoal =
    (dailyCaloriesGoal ?? 0) * MEAL_TYPE_DISTRIBUTION[MealTypeEnum.Snack]

  const calculateProgress = (mealType: MealTypeEnum, calories: number) => {
    let caloriesGoal = 0

    switch (mealType) {
      case MealTypeEnum.Breakfast:
        caloriesGoal = breakfastCaloriesGoal
        break
      case MealTypeEnum.Lunch:
        caloriesGoal = lunchCaloriesGoal
        break
      case MealTypeEnum.Dinner:
        caloriesGoal = dinnerCaloriesGoal
        break
      case MealTypeEnum.Snack:
        caloriesGoal = snackCaloriesGoal
        break
      default:
        caloriesGoal = 0
    }

    const progress =
      caloriesGoal > 0
        ? Math.min(Math.round((calories / caloriesGoal) * 100), 100)
        : 0

    return progress
  }

  const defaultMealsData = [
    {
      mealId: "default-breakfast",
      type: MealTypeEnum.Breakfast,
      foods: 0,
      calories: 0,
      isDefault: true
    },
    {
      mealId: "default-lunch",
      type: MealTypeEnum.Lunch,
      foods: 0,
      calories: 0,
      isDefault: true
    },
    {
      mealId: "default-dinner",
      type: MealTypeEnum.Dinner,
      foods: 0,
      calories: 0,
      isDefault: true
    },
    {
      mealId: "default-snack",
      type: MealTypeEnum.Snack,
      foods: 0,
      calories: 0,
      isDefault: true
    }
  ]

  const mergedMealsData = defaultMealsData.map((defaultMeal) => {
    const existingMeal = mealsData.find(
      (meal) => meal.type === defaultMeal.type
    )

    return (existingMeal || defaultMeal) as typeof defaultMeal
  })

  const handleViewMeal = (mealId: string) => {
    router.push({
      pathname: `/meals/${mealId}`,
      params: { date: selectedDate }
    })
  }

  const handleViewFoods = (mealType?: MealTypeEnum) => {
    if (mealType !== undefined) {
      router.push({
        pathname: "/foods",
        params: { mealType: mealType.toString(), date: selectedDate }
      })
    } else {
      router.push("/foods")
    }
  }

  return (
    <View className="mt-4">
      <VStack className="px-2">
        <Text className="font-tbold text-xl text-secondary">Tổng quan</Text>

        <HStack className="-mb-2 items-center justify-between">
          <HStack className="items-end">
            <Text className="font-tbold text-3xl text-primary">
              {toFixed(totalCalories ?? 0, 0)}
            </Text>
            <Text className="mb-1 font-tmedium text-base text-secondary">
              kcal
            </Text>
          </HStack>

          <Text className="font-tmedium text-primary">{reportDate}</Text>
        </HStack>
      </VStack>

      <BarChart
        labels={LABELS}
        data={weeklyMealData || []}
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
      />

      <Section label="Lịch sử bữa ăn" />

      <VStack gap={12}>
        {mergedMealsData.map((item) => {
          const progress = calculateProgress(item.type, item.calories)

          return (
            <MealCard
              key={item.mealId}
              type={item.type}
              totalFoods={item.foods}
              totalCalories={item.calories}
              progress={progress}
              onPress={() =>
                item.isDefault
                  ? handleViewFoods(item.type)
                  : handleViewMeal(item.mealId)
              }
            />
          )
        })}
      </VStack>
    </View>
  )
}
