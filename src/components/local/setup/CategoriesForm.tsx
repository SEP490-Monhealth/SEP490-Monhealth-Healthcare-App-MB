import React, { useState } from "react"

import { Image } from "react-native"

import LoadingScreen from "@/app/loading"

import { Chip, Container, ScrollArea } from "@/components/global/atoms"

import { useGetAllCategories } from "@/hooks/useCategory"

export const CategoriesForm = () => {
  const { data: categoriesData, isLoading } = useGetAllCategories()

  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const categories =
    categoriesData?.map((c) => ({
      categoryId: c.categoryId,
      name: c.name,
      description: c.description,
      categoryImage: c.categoryImage
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
    <Container>
      <ScrollArea>
        {categories.map((category, index) => (
          <Chip
            key={category.categoryId}
            size="lg"
            label={category.name}
            icon={
              <Image
                source={
                  category.categoryImage
                    ? { uri: category.categoryImage }
                    : undefined
                }
                style={{ width: 36, height: 36, marginRight: 12 }}
              />
            }
            selected={selectedCategories.includes(category.name)}
            onPress={() => handleSelectCategory(category.name)}
            className={index === categories.length - 1 ? "" : "mb-4"}
          />
        ))}
      </ScrollArea>
    </Container>
  )
}
