import React, { useEffect, useState } from "react"

import { FlatList, View } from "react-native"

import { ChipPicker } from "@/components/global/atoms"

import { FoodPickerType } from "@/schemas/foodSchema"

type FoodPickerProps = {
  data: FoodPickerType[]
}

export const FoodPicker = ({ data }: FoodPickerProps) => {
  const [selectedFoods, setSelectedFoods] = useState<string[]>([])

  const toggleFoodSelection = (foodId: string) => {
    if (selectedFoods.includes(foodId)) {
      setSelectedFoods(selectedFoods.filter((id) => id !== foodId))
    } else {
      setSelectedFoods([...selectedFoods, foodId])
    }
  }

  // Log selected food names when selectedFoods changes
  useEffect(() => {
    const selectedFoodNames = data
      .filter((item) => selectedFoods.includes(item.foodId))
      .map((item) => item.foodName)

    console.log(selectedFoodNames)
  }, [selectedFoods, data])

  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.foodId}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <ChipPicker
            id={item.foodId}
            name={item.foodName}
            isSelected={selectedFoods.includes(item.foodId)}
            onPress={toggleFoodSelection}
          />
        )}
      />
    </View>
  )
}
