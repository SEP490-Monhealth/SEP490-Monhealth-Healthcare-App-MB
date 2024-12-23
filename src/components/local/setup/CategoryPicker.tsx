import React, { useEffect, useState } from "react"

import { FlatList } from "react-native"
import { Text, View } from "react-native"

import { ChipPicker } from "@/components/global/atoms"

import { CategoryPickerType } from "@/schemas/categorySchema"

type CategoryPickerProps = {
  data: CategoryPickerType[]
}

export const CategoryPicker = ({ data }: CategoryPickerProps) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const toggleCategorySelection = (categoryId: string) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(
        selectedCategories.filter((id) => id !== categoryId)
      )
    } else {
      setSelectedCategories([...selectedCategories, categoryId])
    }
  }

  useEffect(() => {
    const selectedFoodNames = data
      .filter((item) => selectedCategories.includes(item.categoryId))
      .map((item) => item.categoryName)

    console.log(selectedFoodNames)
  }, [selectedCategories, data])

  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.categoryId}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <ChipPicker
            id={item.categoryId}
            name={item.categoryName}
            icon={item.icon}
            isSelected={selectedCategories.includes(item.categoryId)}
            onPress={toggleCategorySelection}
          />
        )}
      />
    </View>
  )
}
