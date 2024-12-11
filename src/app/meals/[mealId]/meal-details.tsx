import React, { useMemo, useState } from "react"

import { FlatList, View } from "react-native"

import { useLocalSearchParams } from "expo-router"

import { Setting4 } from "iconsax-react-native"

import { Container, Content } from "@/components/global/atoms"
import {
  ArcProgress,
  FoodCard,
  ListHeader
} from "@/components/global/molecules"
import { Header, Section } from "@/components/global/organisms"

import { COLORS } from "@/constants/appConstants"
import { eatenMeals, suggestedMeals } from "@/constants/meals"

import { getMealTypeName } from "@/utils/helpers"

function MealDetailsScreen() {
  const { mealId } = useLocalSearchParams() as { mealId: string }

  const [suggestedFoodsData, setSuggestedData] = useState(suggestedMeals)
  const [eatenFoodsData, setEatenData] = useState(eatenMeals)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const maxCalories = useMemo(() => {
    return suggestedFoodsData.reduce((sum, item) => sum + item.calories, 0)
  }, [suggestedFoodsData])

  const totalCalories = useMemo(() => {
    return eatenFoodsData.reduce((sum, item) => sum + item.calories, 0)
  }, [eatenFoodsData])

  const toggleItemSelection = (foodId: string) => {
    const selectedMeal = suggestedFoodsData.find(
      (item) => item.foodId === foodId
    )

    if (selectedMeal) {
      if (eatenFoodsData.some((item) => item.foodId === foodId)) {
        setEatenData((prev) => prev.filter((item) => item.foodId !== foodId))
      } else {
        setEatenData((prev) => [...prev, selectedMeal])
      }
    }
  }

  const onRefresh = async () => {
    setIsRefreshing(true)

    const refreshedSuggestedMeals = [...suggestedMeals]
    const refreshedEatenMeals = [...eatenMeals]

    setTimeout(() => {
      setSuggestedData(refreshedSuggestedMeals)
      setEatenData(refreshedEatenMeals)
      setIsRefreshing(false)
    }, 2000)
  }

  return (
    <Container>
      <Header
        back
        title={getMealTypeName(mealId)}
        action={{
          icon: <Setting4 variant="Bold" size={24} color={COLORS.primary} />,
          url: `/meals/${mealId}/update-meal`
        }}
      />

      <Content margin={false}>
        <FlatList
          data={suggestedFoodsData}
          ListHeaderComponent={() => (
            <ListHeader>
              <ArcProgress
                size={240}
                width={14}
                fill={(totalCalories / maxCalories) * 100}
                arcSweepAngle={260}
                rotation={230}
                centerCircle={true}
                calorieValue={totalCalories}
                maxCalories={maxCalories}
                label="Calories"
              />

              <Section title="Chi tiết bữa ăn" />
            </ListHeader>
          )}
          renderItem={({ item }) => {
            const isSelected = eatenFoodsData.some(
              (meal) => meal.foodId === item.foodId
            )

            return (
              <FoodCard
                key={item.foodId}
                variant="checkbox"
                checked={isSelected}
                onCheckChange={() => toggleItemSelection(item.foodId)}
                foodName={item.foodName}
                calories={item.calories}
                portionSize={item.portionSize}
                portionWeight={item.portionWeight}
                measurementUnit={item.measurementUnit}
              />
            )
          }}
          keyExtractor={(item) => item.foodId}
          onRefresh={onRefresh}
          refreshing={isRefreshing}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View className="h-3" />}
        />
      </Content>
    </Container>
  )
}

export default MealDetailsScreen
