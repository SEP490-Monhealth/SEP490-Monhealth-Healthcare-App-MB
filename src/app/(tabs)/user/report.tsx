import React, { useState } from "react"

import { Text } from "react-native"

import { useRouter } from "expo-router"

import { LoadingScreen } from "@/app/loading"
import { Profile } from "iconsax-react-native"

import {
  Container,
  Content,
  HStack,
  ScrollArea,
  VStack
} from "@/components/global/atoms"
import { MealCard } from "@/components/global/molecules"
import { Header, Section } from "@/components/global/organisms"

import { BarChart } from "@/components/local/tabs/report"

import { COLORS } from "@/constants/color"
import { MealTypeEnum } from "@/constants/enum/Food"

import { useAuth } from "@/contexts/AuthContext"

import { useGetDailyMealByUserId } from "@/hooks/useDailyMeal"
import { useGetNutritionGoal } from "@/hooks/useGoal"
import { useGetWeeklyMealByUserId } from "@/hooks/useReport"

import { toFixed } from "@/utils/formatters"
import { getWeekRange } from "@/utils/helpers"

const labels = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"]

function ReportScreen() {
  const router = useRouter()

  const { user } = useAuth()
  const userId = user?.userId

  const today = new Date().toISOString().split("T")[0]

  const [selectedDate, setSelectedDate] = useState<string>(today)

  const { data: weeklyMealData, isLoading: isWeeklyMealLoading } =
    useGetWeeklyMealByUserId(userId, today)

  const { data: dailyMealData, isLoading: isDailyMealLoading } =
    useGetDailyMealByUserId(userId, selectedDate)
  const { data: nutritionGoalData, isLoading: isNutritionGoalLoading } =
    useGetNutritionGoal(userId)

  // console.log(JSON.stringify(weeklyMealData, null, 2))

  // console.log(JSON.stringify(dailyMealData, null, 2))

  const reportDate = getWeekRange(today)

  const mealsData = dailyMealData?.items || []

  // console.log(JSON.stringify(mealsData, null, 2))

  if (!weeklyMealData || isWeeklyMealLoading) {
    return <LoadingScreen />
  }

  const caloriesData = weeklyMealData.map((item) => item.calories)
  const totalCalories = caloriesData.reduce((a, b) => a + b, 0)

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

  const caloriesValue = dailyMealData?.nutrition?.calories || 0
  const caloriesGoal = nutritionGoalData?.caloriesGoal || 0

  const handleViewMeal = (mealId: string) => {
    router.push(`/meals/${mealId}`)
  }

  return (
    <Container>
      <Header
        label="Báo cáo"
        action={{
          icon: <Profile variant="Bold" size={20} color={COLORS.primary} />,
          href: `/settings/user/${userId}/information`
        }}
      />

      <ScrollArea>
        <Content className="mt-2">
          <VStack className="px-2">
            <Text className="font-tbold text-xl text-secondary">Tổng quan</Text>

            <HStack className="-mb-2 items-center justify-between">
              <HStack className="items-end">
                <Text className="font-tbold text-3xl text-primary">
                  {toFixed(totalCalories, 0)}
                </Text>
                <Text className="mb-1 font-tmedium text-base text-secondary">
                  tổng kcal
                </Text>
              </HStack>

              <Text className="font-tmedium text-primary">{reportDate}</Text>
            </HStack>
          </VStack>

          <BarChart
            date={today}
            labels={labels}
            data={weeklyMealData}
            onSelectDate={setSelectedDate}
          />

          <Section label="Danh sách bữa ăn" />

          <VStack gap={12}>
            {mergedMealsData.map((item) => (
              <MealCard
                key={item.mealId}
                type={item.type}
                totalFoods={item.foods}
                totalCalories={item.calories}
                progress={75}
                onPress={
                  item.isDefault ? () => {} : () => handleViewMeal(item.mealId)
                }
              />
            ))}
          </VStack>
        </Content>
      </ScrollArea>
    </Container>
  )
}

export default ReportScreen
