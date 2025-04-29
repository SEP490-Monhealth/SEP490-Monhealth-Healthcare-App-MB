import React from "react"

import { useRouter } from "expo-router"

import { Chip, HStack, ScrollArea } from "@/components/global/atoms"

import { CategoryType } from "@/schemas/categorySchema"

interface FoodCategoriesProps {
  mealType: string
  selectedDate: string
  categoriesData: CategoryType[]
  selectedCategory: string
  onSelectCategory: (category: string) => void
}

export const FoodCategories = ({
  mealType,
  selectedDate,
  categoriesData,
  selectedCategory,
  onSelectCategory
}: FoodCategoriesProps) => {
  const router = useRouter()

  const categories = [
    "Tất cả",
    ...(categoriesData?.map((cat) => cat.name) || [])
  ]

  const handleViewSavedFood = () => {
    router.push("/foods/saved")
  }

  const handleViewFoodSuggestions = () => {
    router.push({
      pathname: "/foods/suggestions",
      params: { mealType: mealType, date: selectedDate }
    })
  }

  return (
    <HStack gap={8}>
      {/* <Chip variant="lemon" label="Đã lưu" onPress={handleViewSavedFood} /> */}
      <Chip
        variant="lemon"
        label="Đề xuất"
        onPress={handleViewFoodSuggestions}
      />

      <ScrollArea orientation="horizontal" className="flex-1">
        {categories.map((category, index) => (
          <Chip
            key={category}
            label={category}
            selected={selectedCategory === category}
            onPress={() => onSelectCategory(category)}
            className={index === categories.length - 1 ? "" : "mr-2"}
          />
        ))}
      </ScrollArea>
    </HStack>
  )
}

export default FoodCategories
