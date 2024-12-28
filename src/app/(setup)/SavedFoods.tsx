import React, { useState } from "react"

import { FlatList, View } from "react-native"

import { FoodCard, ListFooter } from "@/components/global/molecules"
import { SaveFoodType } from "@/schemas/foodSchema"

interface MealTabProps {
  foodsData: SaveFoodType[]
}

export const SavedFoods = ({ foodsData }: MealTabProps) => {
  const [isRefreshing, setIsRefreshing] = useState(false)

  const onRefresh = async () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
    }, 2000)
  }

  return (
    <FlatList
      data={foodsData}
      keyExtractor={(item) => item.foodId}
      onRefresh={onRefresh}
      refreshing={isRefreshing}
      showsVerticalScrollIndicator={false}
      stickyHeaderIndices={[0]}
      renderItem={({ item }) => (
        <FoodCard
          key={item.foodId}
          variant="more"
          foodId={item.foodId}
          name={item.name}
          calories={item.nutrition.calories}
          size={item.portion.size}
          weight={item.portion.weight}
          unit={item.portion.unit}
        />
      )}
      ListFooterComponent={<ListFooter />}
      ItemSeparatorComponent={() => <View className="h-3" />}
    />
  )
}
