import React, { useState } from "react"

import { FlatList, Text, View } from "react-native"

import { Notification } from "iconsax-react-native"

import { Container, HStack, VStack } from "@/components/global/atoms"
import { IconButton, MealCard } from "@/components/global/molecules"
import { Section } from "@/components/global/organisms"

import { COLORS } from "@/constants/appConstants"

function HomeScreen() {
  const [mealsData, setMealsData] = useState<
    {
      mealType: "Bữa sáng" | "Bữa trưa" | "Bữa tối" | "Bữa phụ"
      totalCalories: number
    }[]
  >([
    { mealType: "Bữa sáng", totalCalories: 294 },
    { mealType: "Bữa trưa", totalCalories: 294 },
    { mealType: "Bữa tối", totalCalories: 294 },
    { mealType: "Bữa phụ", totalCalories: 294 }
  ])

  const [isRefreshing, setIsRefreshing] = useState(false)

  const onRefresh = async () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setMealsData([
        { mealType: "Bữa sáng", totalCalories: 300 },
        { mealType: "Bữa trưa", totalCalories: 300 },
        { mealType: "Bữa tối", totalCalories: 300 },
        { mealType: "Bữa phụ", totalCalories: 300 }
      ])
      setIsRefreshing(false)
    }, 2000)
  }

  return (
    <Container>
      <FlatList
        data={mealsData}
        ListHeaderComponent={() => (
          <View>
            <HStack className="items-center justify-between">
              <VStack>
                <Text className="-mb-1 font-pregular text-lg text-muted">
                  Chào buổi sáng,
                </Text>
                <Text className="font-tbold text-2xl text-typography">
                  Van Huu Toan
                </Text>
              </VStack>

              <IconButton
                icon={
                  <Notification
                    variant="Bold"
                    size={24}
                    color={COLORS.primary}
                  />
                }
              />
            </HStack>

            <Section title="Bữa ăn hôm nay" />

            {/* {isRefreshing && (
              <LottieView
                source={require("../../../public/videos/monhealth-data-loading.json")}
                autoPlay
                loop
                style={{ width: "100%", height: 72 }}
              />
            )} */}
          </View>
        )}
        renderItem={({ item }) => (
          <MealCard
            key={item.mealType}
            mealType={item.mealType}
            totalCalories={item.totalCalories}
          />
        )}
        ListFooterComponent={
          <View className="h-[2000px]">
            <Section title="Bài tập hôm nay" />
          </View>
        }
        keyExtractor={(item) => item.mealType}
        onRefresh={onRefresh}
        refreshing={isRefreshing}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <View className="h-3" />}
      />
    </Container>
  )
}

export default HomeScreen
