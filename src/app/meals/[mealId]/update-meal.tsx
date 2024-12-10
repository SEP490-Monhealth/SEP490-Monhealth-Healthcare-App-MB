import React, { useMemo, useState } from "react"

import { FlatList, View } from "react-native"

import { useLocalSearchParams } from "expo-router"

import { Container } from "@/components/global/atoms"
import {
  ArcProgress,
  FoodCard,
  ListHeader
} from "@/components/global/molecules"
import { Header, Section } from "@/components/global/organisms"

import { suggestedMeals } from "@/constants/meals"

import { getMealTypeName } from "@/utils/helpers"

function UpdateMealScreen() {
  const { mealType } = useLocalSearchParams() as { mealType: string }

  const [foodsData, setFoodsData] = useState(suggestedMeals)

  return (
    <Container>
      <Header back title={getMealTypeName(mealType)} />

      <FlatList
        data={foodsData}
        ListHeaderComponent={() => (
          <ListHeader>
            <Section title="Chỉnh sửa thực đơn" />
          </ListHeader>
        )}
        renderItem={({ item }) => (
          <FoodCard
            key={item.foodId}
            foodName={item.foodName}
            calories={item.calories}
            portionSize={item.portionSize}
            portionWeight={item.portionWeight}
            measurementUnit={item.measurementUnit}
          />
        )}
        keyExtractor={(item) => item.foodId}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View className="h-3" />}
      />
    </Container>
  )
}

export default UpdateMealScreen
