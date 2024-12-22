import React, { useMemo, useState } from "react"

import { FlatList, View } from "react-native"

import { useLocalSearchParams } from "expo-router"

import LoadingScreen from "@/app/loading"
import { Setting4 } from "iconsax-react-native"

import { Container, Content } from "@/components/global/atoms"
import {
  ArcProgress,
  FoodCard,
  ListFooter,
  ListHeader
} from "@/components/global/molecules"
import { Header, Section } from "@/components/global/organisms"

import { NutritionSummary } from "@/components/local/meals"

import { COLORS } from "@/constants/app"
import { sampleMealsData } from "@/constants/meals"

import { getMealTypeName } from "@/utils/helpers"

function MealDetailsScreen() {
  const { mealId } = useLocalSearchParams() as { mealId: string }
  const [isRefreshing, setIsRefreshing] = useState(false)

  const mealData = useMemo(
    () => sampleMealsData.find((meal) => meal.mealId === mealId),
    [mealId]
  )

  const calorieValue = useMemo(
    () =>
      mealData?.mealFoods.reduce((total, food) => total + food.calories, 0) ||
      0,
    [mealData]
  )

  const totalCalories = 2499
  const progress = Math.min((calorieValue / totalCalories) * 100, 100)

  const onRefresh = async () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
    }, 2000)
  }

  if (!mealData) {
    return <LoadingScreen />
  }

  return (
    <Container>
      <Header
        back
        title={getMealTypeName(mealData?.mealType || "")}
        action={{
          icon: <Setting4 variant="Bold" size={24} color={COLORS.primary} />,
          url: `/(tabs)/schedule`
        }}
      />

      <Content margin={false}>
        <FlatList
          data={mealData?.mealFoods}
          keyExtractor={(item) => item.foodId}
          onRefresh={onRefresh}
          refreshing={isRefreshing}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={() => (
            <ListHeader>
              <ArcProgress
                size={240}
                width={14}
                fill={progress}
                arcSweepAngle={260}
                rotation={230}
                centerCircle
                value={calorieValue}
                maxValue={totalCalories}
                label="Kcal"
              />

              <NutritionSummary nutritionData={mealData} />

              <Section title="Chi tiết bữa ăn" />
            </ListHeader>
          )}
          renderItem={({ item }) => (
            <FoodCard
              key={item.foodId}
              foodId={item.foodId}
              foodName={item.foodName}
              calories={item.calories}
              portionSize={item.portionSize}
              portionWeight={item.portionWeight}
              measurementUnit={item.measurementUnit}
            />
          )}
          ListFooterComponent={<ListFooter />}
          ItemSeparatorComponent={() => <View className="h-3" />}
        />
      </Content>
    </Container>
  )
}

export default MealDetailsScreen
