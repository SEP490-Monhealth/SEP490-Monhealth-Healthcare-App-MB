import React, { useEffect } from "react"

import { View } from "react-native"

import { useRouter } from "expo-router"

import { useIsFetching, useIsMutating } from "@tanstack/react-query"

import { Badge, HStack, VStack } from "@/components/global/atoms"
import { TipText } from "@/components/global/atoms/Typography"
import { MealCard } from "@/components/global/molecules"
import { Section } from "@/components/global/organisms"

import {
  NutritionProgress,
  NutritionSummary
} from "@/components/local/tabs/home"

import { COLORS } from "@/constants/color"
import { MealTypeEnum } from "@/constants/enum/Food"
import { GoalTypeEnum, getGoalTypeMeta } from "@/constants/enum/Goal"

import { useGetGoalsByUserId } from "@/hooks/useGoal"
import { useGetDailyMealByUserId } from "@/hooks/useTracker"

import { formatDateY } from "@/utils/formatters"
import { getRandomTip } from "@/utils/helpers"

interface MealTabProps {
  userId?: string
  onOverlayLoading: (isLoading: boolean) => void
}

export const MealTab = ({ userId, onOverlayLoading }: MealTabProps) => {
  const router = useRouter()

  const today = formatDateY(new Date())

  const { data: dailyMealData } = useGetDailyMealByUserId(userId, today)
  const { data: goalData } = useGetGoalsByUserId(userId)

  const currentGoalData = goalData?.[0]

  const isFetching = useIsFetching()
  const isMutating = useIsMutating()

  // useEffect(() => {
  //   onLoading(
  //     !dailyMealData ||
  //       isDailyMealLoading ||
  //       !goalData ||
  //       isGoalLoading
  //   )
  // }, [
  //   dailyMealData,
  //   isDailyMealLoading,
  //   goalData,
  //   isGoalLoading,
  //   onLoading
  // ])

  useEffect(() => {
    onOverlayLoading(isFetching > 0 || isMutating > 0)
  }, [isFetching, isMutating, onOverlayLoading])

  const mealsData = dailyMealData?.items || []

  const { label: goalTypeLabel } = getGoalTypeMeta(
    currentGoalData?.type ?? GoalTypeEnum.Maintenance
  )

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

  const caloriesGoal = currentGoalData?.caloriesGoal || 0

  const caloriesData = {
    label: "Calories",
    value: dailyMealData?.nutrition?.calories || 0,
    targetValue: caloriesGoal
  }

  const nutritionData = [
    {
      label: "Protein",
      value: dailyMealData?.nutrition?.protein || 0,
      targetValue: currentGoalData?.proteinGoal || 0
    },
    {
      label: "Carbs",
      value: dailyMealData?.nutrition?.carbs || 0,
      targetValue: currentGoalData?.carbsGoal || 0
    },
    {
      label: "Fat",
      value: dailyMealData?.nutrition?.fat || 0,
      targetValue: currentGoalData?.fatGoal || 0
    },
    {
      label: "Fiber",
      value: dailyMealData?.nutrition?.fiber || 0,
      targetValue: currentGoalData?.fiberGoal || 0
    },
    {
      label: "Sugar",
      value: dailyMealData?.nutrition?.sugar || 0,
      targetValue: currentGoalData?.sugarGoal || 0
    }
  ]

  // const dailyCaloriesIntakeProgress =
  //   caloriesGoal > 0 ? (caloriesValue / caloriesGoal) * 100 : 0

  const handleViewMeal = (mealId: string) => {
    router.push(`/meals/${mealId}`)
  }

  const handleViewFoods = (mealType?: MealTypeEnum) => {
    if (mealType !== undefined) {
      router.push({
        pathname: "/foods",
        params: { mealType: mealType.toString() }
      })
    } else {
      router.push("/foods")
    }
  }

  return (
    <View className="mt-4">
      <HStack center className="justify-between">
        <NutritionProgress
          calorieData={caloriesData}
          nutritionData={nutritionData}
        />

        <NutritionSummary nutritionData={nutritionData} />
      </HStack>

      {/* <Progress
        height={8}
        progress={dailyCaloriesIntakeProgress}
        labelStart="Mục tiêu hằng ngày"
        labelEnd={`${toFixed(dailyCaloriesIntakeProgress, 0)}%`}
        className="mt-8"
      /> */}

      {dailyMealData && (
        <Section
          label="Mục tiêu hiện tại"
          description={
            goalTypeLabel === "Giảm cân"
              ? "Giảm calo để kiểm soát cân nặng"
              : goalTypeLabel === "Tăng cân"
                ? "Tăng cường dưỡng chất và calo"
                : "Duy trì năng lượng ổn định"
          }
          action={
            <Badge
              label={goalTypeLabel}
              background={COLORS.primary}
              color="#fff"
            />
          }
        />
      )}

      <Section
        label="Bữa ăn hôm nay"
        actionText="Thêm thức ăn"
        onPress={handleViewFoods}
      />

      <VStack gap={12}>
        {mergedMealsData.map((item) => (
          <MealCard
            key={item.mealId}
            type={item.type as MealTypeEnum}
            totalFoods={item.foods}
            totalCalories={item.calories}
            onPress={() =>
              item.isDefault
                ? handleViewFoods(item.type)
                : handleViewMeal(item.mealId)
            }
          />
        ))}
      </VStack>

      <View className="mt-8">
        <TipText tip={getRandomTip()} />
      </View>
    </View>
  )
}
