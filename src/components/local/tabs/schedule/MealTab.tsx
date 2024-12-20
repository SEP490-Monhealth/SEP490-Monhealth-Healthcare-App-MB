import React, { useState } from "react"

import { FlatList, View } from "react-native"

import {
  Schedule,
  TabsList,
  TabsTrigger,
  VStack
} from "@/components/global/atoms"
import { FoodCard, ListFooter, ListHeader } from "@/components/global/molecules"

import { FoodType } from "@/schemas/foodSchema"

interface MealTabProps {
  foodsData: FoodType[]
}

export const MealTab = ({ foodsData }: MealTabProps) => {
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
      ListHeaderComponent={
        <ListHeader>
          <VStack center gap={20}>
            <Schedule initialDate={new Date()} />

            <TabsList>
              <TabsTrigger value="breakfast">Bữa sáng</TabsTrigger>
              <TabsTrigger value="lunch">Bữa trưa</TabsTrigger>
              <TabsTrigger value="dinner">Bữa tối</TabsTrigger>
              <TabsTrigger value="snack">Bữa phụ</TabsTrigger>
            </TabsList>
          </VStack>
        </ListHeader>
      }
      renderItem={({ item }) => (
        <FoodCard
          key={item.foodId}
          variant="more"
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
      stickyHeaderIndices={[0]}
    />
  )
}
