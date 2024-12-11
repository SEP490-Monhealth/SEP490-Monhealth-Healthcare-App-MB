import React, { useState } from "react"

import { FlatList, Text, View } from "react-native"

import { Notification } from "iconsax-react-native"

import {
  Container,
  Content,
  HStack,
  Progress,
  VStack
} from "@/components/global/atoms"
import { IconButton, ListHeader, MealCard } from "@/components/global/molecules"
import { Section } from "@/components/global/organisms"

import { NutrientProgress, NutrientSummary } from "@/components/local/tabs/home"

import { COLORS } from "@/constants/appConstants"

import { getGreeting } from "@/utils/helpers"

function HomeScreen() {
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

  const [isRefreshing, setIsRefreshing] = useState(false)

  const onRefresh = async () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setMealsData([
        { mealType: "Breakfast", totalCalories: 300 },
        { mealType: "Lunch", totalCalories: 300 },
        { mealType: "Dinner", totalCalories: 300 },
        { mealType: "Snack", totalCalories: 300 }
      ])
      setIsRefreshing(false)
    }, 2000)
  }

  const nutrientsData = [
    { label: "Calories", value: 438, maxValue: 842 },
    { label: "Protein", value: 120, maxValue: 220 },
    { label: "Carbs", value: 160, maxValue: 220 },
    { label: "Fat", value: 120, maxValue: 187 },
    { label: "Salt", value: 24, maxValue: 45 },
    { label: "Sugar", value: 37, maxValue: 60 }
  ]

  const calories = nutrientsData.find(
    (nutrient) => nutrient.label === "Calories"
  ) || { label: "Calories", value: 0, maxValue: 0 }

  const filteredNutrients = nutrientsData.filter((nutrient) =>
    ["Protein", "Carbs", "Fat", "Salt", "Sugar"].includes(nutrient.label)
  )

  return (
    <Container>
      <HStack className="items-center justify-between bg-background pb-4">
        <VStack>
          <Text className="font-pregular text-lg text-muted">
            {getGreeting()}
          </Text>
          <Text className="font-tbold text-2xl leading-6 text-typography">
            Văn Hữu Toàn
          </Text>
        </VStack>

        <IconButton
          icon={
            <Notification variant="Bold" size={24} color={COLORS.primary} />
          }
        />
      </HStack>

      <Content>
        <FlatList
          data={mealsData}
          ListHeaderComponent={() => (
            <ListHeader>
              <VStack gap={24}>
                <HStack center className="justify-between">
                  <NutrientProgress
                    calories={calories}
                    nutrients={filteredNutrients}
                  />

                  <NutrientSummary nutrients={filteredNutrients} />
                </HStack>

                <Progress
                  height={8}
                  progress={50}
                  labelStart="438 trên 842 calories"
                  labelEnd="50%"
                />
              </VStack>

              <Section title="Bữa ăn hôm nay" />
            </ListHeader>
          )}
          renderItem={({ item }) => (
            <MealCard
              key={item.mealType}
              mealType={item.mealType}
              totalCalories={item.totalCalories}
            />
          )}
          ListFooterComponent={
            <View className="mt-8 pb-16">
              <Text className="text-center font-tmedium text-card">
                "Bạn đã hoàn thành mục tiêu calo hôm nay. Tuyệt vời!"
              </Text>
            </View>
          }
          keyExtractor={(item) => item.mealType}
          onRefresh={onRefresh}
          refreshing={isRefreshing}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View className="h-3" />}
        />
      </Content>
    </Container>
  )
}

export default HomeScreen
