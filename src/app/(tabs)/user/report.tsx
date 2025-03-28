import React from "react"

import { Text } from "react-native"

import { Profile } from "iconsax-react-native"

import {
  Container,
  Content,
  HStack,
  ScrollArea,
  TabsList,
  TabsTrigger,
  VStack
} from "@/components/global/atoms"
import { Tabs, TabsContent } from "@/components/global/atoms"
import { MealCard } from "@/components/global/molecules"
import { Header, Section } from "@/components/global/organisms"

import { BarChart } from "@/components/local/tabs/report"

import { COLORS } from "@/constants/color"
import { MealTypeEnum } from "@/constants/enum/Food"

import { useAuth } from "@/contexts/AuthContext"

import { useGetNutritionGoal } from "@/hooks/useGoal"

const labels = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"]

const data = [
  { date: "2025-02-03", calories: 500 },
  { date: "2025-02-04", calories: 1500 },
  { date: "2025-02-05", calories: 2500 },
  { date: "2025-02-06", calories: 1000 },
  { date: "2025-02-07", calories: 700 },
  { date: "2025-02-08", calories: 800 },
  { date: "2025-02-09", calories: 2000 }
]

function ReportScreen() {
  const { user } = useAuth()
  const userId = user?.userId

  const { data: goalData, isLoading: isLoadingGoal } =
    useGetNutritionGoal(userId)

  // const today = new Date().toISOString().split("T")[0]
  const today = "2025-02-08"

  const caloriesData = data.map((item) => item.calories)

  const totalCalories = caloriesData.reduce((a, b) => a + b, 0)

  const breakfastCalories = 132
  const lunchCalories = 314
  const dinnerCalories = 54
  const snackCalories = 0

  const caloriesGoal = goalData?.caloriesGoal || 0
  const breakfastGoal = caloriesGoal * 0.3
  const lunchGoal = caloriesGoal * 0.35
  const dinnerGoal = caloriesGoal * 0.25
  const snackGoal = caloriesGoal * 0.1

  const breakfastProgress = (breakfastCalories / breakfastGoal) * 100
  const lunchProgress = (lunchCalories / lunchGoal) * 100
  const dinnerProgress = (dinnerCalories / dinnerGoal) * 100
  const snackProgress = (snackCalories / snackGoal) * 100

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

  return (
    <Container>
      <Header
        label="Báo cáo"
        action={{
          icon: <Profile variant="Bold" size={20} color={COLORS.primary} />,
          href: "/settings/user-information"
        }}
      />

      <ScrollArea>
        <Content className="mt-2 pb-12">
          <Tabs defaultValue="meal" contentMarginTop={12}>
            <VStack gap={20}>
              <TabsList>
                <TabsTrigger value="meal">Bữa ăn</TabsTrigger>

                <TabsTrigger value="water">Nước</TabsTrigger>

                <TabsTrigger value="activity">Luyện tập</TabsTrigger>
              </TabsList>
            </VStack>

            <TabsContent value="meal" contentMarginTop={16}>
              <VStack className="px-2">
                <Text className="font-tbold text-xl text-secondary">
                  Tổng quan
                </Text>

                <HStack className="-mb-2 items-center justify-between">
                  <HStack className="items-end">
                    <Text className="font-tbold text-3xl text-primary">
                      {totalCalories}
                    </Text>
                    <Text className="mb-1 font-tmedium text-base text-secondary">
                      tổng kcal
                    </Text>
                  </HStack>

                  <Text className="font-tmedium text-primary">
                    3 - 9 Tháng 2 2025
                  </Text>
                </HStack>
              </VStack>

              <BarChart date={today} labels={labels} data={data} />

              <Section label="Chi tiết bữa ăn" />

              <VStack gap={12}>
                {defaultMealsData.map((item) => (
                  <MealCard
                    key={item.mealId}
                    type={item.type as MealTypeEnum}
                    totalFoods={item.foods}
                    totalCalories={item.calories}
                    progress={75}
                  />
                ))}
              </VStack>
            </TabsContent>

            <TabsContent value="water" contentMarginTop={12}>
              <Text>asd</Text>
            </TabsContent>

            <TabsContent value="activity" contentMarginTop={12}>
              <Text>asd</Text>
            </TabsContent>
          </Tabs>
        </Content>
      </ScrollArea>
    </Container>
  )
}

export default ReportScreen
