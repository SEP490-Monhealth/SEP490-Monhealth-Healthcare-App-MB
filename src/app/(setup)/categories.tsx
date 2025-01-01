import React, { useState } from "react"

import { Image, KeyboardAvoidingView, Platform } from "react-native"
import { ScrollView } from "react-native"

import LoadingScreen from "@/app/loading"
import { View } from "lucide-react-native"

import { Chip, Content, ScrollArea, VStack } from "@/components/global/atoms"

import { useGetAllCategories } from "@/hooks/useCategory"

function SetupCategories() {
  const { data: categoriesData, isLoading } = useGetAllCategories()

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

  if (!categoriesData || isLoading) return <LoadingScreen />

  return (
    <ScrollArea>
      <VStack className="pb-32">
        {categories.map((category, index) => (
          <Chip
            key={category.name}
            size="md"
            label={category.name}
            icon={
              <Image
                source={category.image ? { uri: category.image } : undefined}
                className="mr-3 h-11 w-11"
              />
            }
            selected={selectedCategories.includes(category.name)}
            onPress={() => handleSelectCategory(category.name)}
            className={index === categories.length - 1 ? "" : "mb-3"}
          />
        ))}
      </VStack>
    </ScrollArea>
  )
}

export default SetupCategories
