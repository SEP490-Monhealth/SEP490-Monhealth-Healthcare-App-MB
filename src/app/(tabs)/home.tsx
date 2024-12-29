import React, { useState } from "react"

import { Text, View } from "react-native"

import {
  Container,
  Content,
  HStack,
  Progress,
  ScrollArea,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  VStack
} from "@/components/global/atoms"
import { MealCard } from "@/components/global/molecules"
import { Section } from "@/components/global/organisms"

import {
  HomeHeader,
  NutritionProgress,
  NutritionSummary
} from "@/components/local/tabs/home"

import { useAuth } from "@/contexts/AuthContext"

function HomeScreen() {
  const { user } = useAuth()
  
  const [mealsData, setMealsData] = useState<
    {
      mealType: "Breakfast" | "Lunch" | "Dinner" | "Snack"
      totalCalories: number
    }[]
  >([
    { mealType: "Breakfast", totalCalories: 294 },
    { mealType: "Lunch", totalCalories: 294 },
    { mealType: "Dinner", totalCalories: 294 },
    { mealType: "Snack", totalCalories: 294 }
  ])

  const nutrientsData = [
    { label: "Calories", value: 438, maxValue: 842 },
    { label: "Protein", value: 120, maxValue: 220 },
    { label: "Carbs", value: 160, maxValue: 220 },
    { label: "Fat", value: 120, maxValue: 187 },
    { label: "Fiber", value: 24, maxValue: 45 },
    { label: "Sugar", value: 37, maxValue: 60 }
  ]

  const calories = nutrientsData.find(
    (nutrient) => nutrient.label === "Calories"
  ) || { label: "Calories", value: 0, maxValue: 0 }

  const filteredNutrition = nutrientsData.filter((nutrient) =>
    ["Protein", "Carbs", "Fat", "Fiber", "Sugar"].includes(nutrient.label)
  )

  return (
    <Container>
      <HomeHeader fullName={user?.fullName} />

      <Content>
        <ScrollArea>
          <View className="mt-2 pb-12">
            <Tabs defaultValue="meal" contentMarginTop={16}>
              <TabsList center gap={32}>
                <TabsTrigger value="meal">Dinh dưỡng</TabsTrigger>
                <TabsTrigger value="water">Nước</TabsTrigger>
                <TabsTrigger value="exercise">Bài tập</TabsTrigger>
              </TabsList>

              <TabsContent value="meal">
                <VStack gap={24}>
                  <HStack center className="justify-between">
                    <NutritionProgress
                      calories={calories}
                      nutrients={filteredNutrition}
                    />

                    <NutritionSummary nutrients={filteredNutrition} />
                  </HStack>
                </VStack>

                <Progress
                  height={8}
                  progress={50}
                  labelStart="Mục tiêu hằng ngày"
                  labelEnd="50%"
                  className="mt-8"
                />

                <Section label="Bữa ăn hôm nay" />

                <VStack gap={12}>
                  {mealsData.map((item) => (
                    <View key={item.mealType}>
                      <MealCard
                        mealType={item.mealType}
                        totalCalories={item.totalCalories}
                      />
                    </View>
                  ))}
                </VStack>
              </TabsContent>

              <TabsContent value="water">
                <VStack gap={24}>
                  <Text>asd</Text>
                </VStack>
              </TabsContent>

              <TabsContent value="exercise">
                <VStack gap={24}>
                  <Text>asd</Text>
                </VStack>
              </TabsContent>
            </Tabs>
          </View>
        </ScrollArea>
      </Content>
    </Container>
  )
}

export default HomeScreen
