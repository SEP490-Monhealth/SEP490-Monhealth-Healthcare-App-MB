import React, { useState } from "react"

import { Image, Text, TouchableOpacity, View } from "react-native"

import { ScrollArea } from "@/components/global/atoms"

import { sampleCategoriesData } from "@/constants/categories"

import { LoadingScreen } from "../loading"

function SetupCategories() {
  const categoriesData = sampleCategoriesData

  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const categories =
    categoriesData?.map((c) => ({
      name: c.name,
      description: c.description,
      image: c.image
    })) || []

  const handleSelectCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    )
  }

  console.log("Selected Categories:", selectedCategories)

  if (!categoriesData) return <LoadingScreen />

  return (
    <ScrollArea>
      <View
        className="flex-row flex-wrap"
        style={{ rowGap: 16, columnGap: 12 }}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.name}
            activeOpacity={0.7}
            onPress={() => handleSelectCategory(category.name)}
            className={`flex-row items-center rounded-2xl border-2 bg-muted px-4 py-2.5 ${
              selectedCategories.includes(category.name)
                ? "border-primary"
                : "border-border"
            }`}
          >
            <Image
              source={category.image ? { uri: category.image } : undefined}
              className="mr-3 h-8 w-8"
            />

            <Text
              className={`font-tmedium text-base ${
                selectedCategories.includes(category.name)
                  ? "text-primary"
                  : "text-black"
              }`}
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollArea>
  )
}

export default SetupCategories
