import React from "react"

import { FlatList, View } from "react-native"

import { FoodCard, ListFooter, ListHeader } from "@/components/global/molecules"

import { useRouterHandlers } from "@/hooks/useRouter"

import { FoodType } from "@/schemas/foodSchema"

interface MealTabProps {
  foodsData: FoodType[]
}

export const MealTab = ({ foodsData }: MealTabProps) => {
  const { handleViewFood } = useRouterHandlers()

  return (
    <FlatList
      data={foodsData}
      keyExtractor={(item) => item.foodId}
      showsVerticalScrollIndicator={false}
      stickyHeaderIndices={[0]}
      ListHeaderComponent={<ListHeader />}
      renderItem={({ item }) => (
        <FoodCard
          key={item.foodId}
          name={item.name}
          calories={item.nutrition.calories}
          size={item.portion.size}
          weight={item.portion.weight}
          unit={item.portion.unit}
          onPress={() => handleViewFood(item.foodId)}
        />
      )}
      ListFooterComponent={<ListFooter />}
      ItemSeparatorComponent={() => <View className="h-3" />}
    />
  )
}
