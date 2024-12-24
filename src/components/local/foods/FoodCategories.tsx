import React, { useState } from "react"

import { ScrollView } from "react-native"

import { Chip } from "@/components/global/atoms"

import { CategoryType } from "@/schemas/categorySchema"

interface FoodCategoryProps {
  categoriesData: CategoryType[]
}

export const FoodCategories = ({ categoriesData }: FoodCategoryProps) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const categories = [
    "Tất cả",
    ...(categoriesData?.map((cat) => cat.name) || [])
  ]

  const handleSelectCategory = (category: string) => {
    setSelectedCategories((prev) => {
      if (category === "Tất cả") {
        return []
      } else {
        const updated = prev.includes(category)
          ? prev.filter((item) => item !== category)
          : [...prev.filter((item) => item !== "Tất cả"), category]
        return updated
      }
    })
  }

  // console.log("Selected Categories:", selectedCategories)

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {categories.map((category, index) => (
        <Chip
          key={category}
          label={category}
          selected={
            (category === "Tất cả" && selectedCategories.length === 0) ||
            selectedCategories.includes(category)
          }
          onPress={() => handleSelectCategory(category)}
          className={index === categories.length - 1 ? "" : "mr-3"}
        />
      ))}
    </ScrollView>
  )
}

export default FoodCategories
