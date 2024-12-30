import React from "react"

import { useRouter } from "expo-router"

import { Chip, HStack, ScrollArea } from "@/components/global/atoms"

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
  const router = useRouter()

  const categories = [
    "Tất cả",
    ...(categoriesData?.map((cat) => cat.name) || [])
  ]

  const handleViewSavedFood = () => {
    router.push("/foods/saved")
  }

  return (
    <HStack gap={8}>
      <Chip variant="yellow" label="Đã lưu" onPress={handleViewSavedFood} />

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
