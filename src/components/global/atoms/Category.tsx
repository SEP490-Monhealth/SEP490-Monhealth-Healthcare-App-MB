import React, { useState } from "react"

import { ScrollView, Text, TouchableOpacity, View } from "react-native"

interface Category {
  categoryId: string
  categoryName: string
  categoryDescription?: string
  createdAt: string
  updatedAt: string
}

interface CategoriesProps {
  data: Category[]
  isMultiple?: boolean
  onChange?: (selected: Array<string>) => void
}

const Categories: React.FC<CategoriesProps> = ({
  data,
  isMultiple = false,
  onChange
}) => {
  const [selectedCategory, setSelectedCategory] = useState<Array<string>>([])

  const onSelect = (categoryId: string) => {
    let updatedSelection: Array<string> = []

    if (categoryId === "all") {
      updatedSelection = []
    } else {
      if (isMultiple) {
        if (selectedCategory.includes(categoryId)) {
          updatedSelection = selectedCategory.filter(
            (item) => item !== categoryId
          )
        } else {
          updatedSelection = [...selectedCategory, categoryId]
        }
      } else {
        updatedSelection = [categoryId]
      }
    }

    setSelectedCategory(updatedSelection)
    onChange && onChange(updatedSelection)

    if (categoryId === "all") {
      console.log([])
    } else {
      const selectedNames = data
        .filter((item) => updatedSelection.includes(item.categoryId))
        .map((item) => item.categoryName)
      console.log(selectedNames)
    }
  }

  const Chip: React.FC<{
    categoryName: string
    categoryId: string
    isSelected: boolean
  }> = ({ categoryName, categoryId, isSelected }) => {
    return (
      <TouchableOpacity
        onPress={() => onSelect(categoryId)}
        className={`rounded-full px-4 py-2 mr-4 ${isSelected ? "bg-secondary" : "bg-border"}`}
      >
        <Text className={`${isSelected ? "text-white" : "text-black"}`}>
          {categoryName}
        </Text>
      </TouchableOpacity>
    )
  }

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      horizontal
    >
      <Chip
        categoryName="All"
        categoryId="all"
        isSelected={selectedCategory.length === 0}
      />
      {data.map((item, index) => (
        <Chip
          key={index}
          categoryName={item.categoryName}
          categoryId={item.categoryId}
          isSelected={selectedCategory.includes(item.categoryId)}
        />
      ))}
    </ScrollView>
  )
}

export default Categories
