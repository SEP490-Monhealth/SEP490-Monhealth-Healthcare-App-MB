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

import { useGetNutritionGoal } from "@/hooks/useGoal"
import { useGetDailyMealByUserId } from "@/hooks/useMeal"
import { useGetWeeklyMealByUserId } from "@/hooks/useReport"

import { toFixed } from "@/utils/formatters"
import { getWeekRange } from "@/utils/helpers"

const labels = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"]

const MEAL_TYPE_DISTRIBUTION = {
  [MealTypeEnum.Breakfast]: 0.3,
  [MealTypeEnum.Lunch]: 0.35,
  [MealTypeEnum.Dinner]: 0.25,
  [MealTypeEnum.Snack]: 0.1
}

function ReportScreen() {
  const router = useRouter()

  const { user } = useAuth()
  const userId = user?.userId

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

  const reportDate = getWeekRange(formattedDate)
  const mealsData = dailyMealData?.items || []

  if (!weeklyMealData || !dailyMealData || !nutritionGoalData) {
    return <LoadingScreen />
  }

  const caloriesData = weeklyMealData.map((item) => item.calories)
  const totalCalories = caloriesData.reduce((a, b) => a + b, 0)

  const dailyCaloriesGoal = nutritionGoalData?.caloriesGoal

  const breakfastCaloriesGoal =
    dailyCaloriesGoal * MEAL_TYPE_DISTRIBUTION[MealTypeEnum.Breakfast]
  const lunchCaloriesGoal =
    dailyCaloriesGoal * MEAL_TYPE_DISTRIBUTION[MealTypeEnum.Lunch]
  const dinnerCaloriesGoal =
    dailyCaloriesGoal * MEAL_TYPE_DISTRIBUTION[MealTypeEnum.Dinner]
  const snackCaloriesGoal =
    dailyCaloriesGoal * MEAL_TYPE_DISTRIBUTION[MealTypeEnum.Snack]

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
    router.push(`/meals/${mealId}`)
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
    <Container>
      <Header
        label="Báo cáo"
        action={{
          icon: <Profile variant="Bold" size={20} color={COLORS.primary} />,
          href: `/settings/user/${userId}/information`
        }}
      />

      <ScrollArea>
        <Content className="mt-2 pb-12">
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
            labels={labels}
            data={weeklyMealData}
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
          />

          <Section label="Danh sách bữa ăn" />

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
        </Content>
      </ScrollArea>
    </Container>
  )
}

export default ReportScreen
