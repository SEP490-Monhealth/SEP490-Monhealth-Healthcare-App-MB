import React from "react"

import { ScrollView } from "react-native"

import { Chip } from "@/components/global/atoms"

import { CategoryType } from "@/schemas/categorySchema"

interface FoodCategoryProps {
  categoriesData: CategoryType[]
  selectedCategory: string
  onSelectCategory: (category: string) => void
}

export const FoodCategories = ({
  categoriesData,
  selectedCategory,
  onSelectCategory
}: FoodCategoryProps) => {
  const categories = [
    "Tất cả",
    ...(categoriesData?.map((cat) => cat.name) || [])
  ]

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {categories.map((category, index) => (
        <Chip
          key={category}
          label={category}
          selected={selectedCategory === category}
          onPress={() => onSelectCategory(category)}
          className={index === categories.length - 1 ? "" : "mr-2"}
        />
      ))}
    </ScrollView>
  )
}

export default FoodCategories
