import React, { useState } from "react"

import LoadingScreen from "@/app/loading"

import { Chip, Container, ScrollArea } from "@/components/global/atoms"

import { useGetFoodsByCategory } from "@/hooks/useFood"

export const FoodsForm = () => {
  const { data: foodsData, isLoading } = useGetFoodsByCategory("Hải Sản", 1, 10)

  const [selectedFoods, setSelectedFoods] = useState<string[]>([])

  const foods =
    foodsData?.foods.map((f) => ({
      foodId: f.foodId,
      name: f.name
    })) || []

  const handleSelectFood = (food: string) => {
    setSelectedFoods((prev) =>
      prev.includes(food)
        ? prev.filter((item) => item !== food)
        : [...prev, food]
    )
  }

  if (!foodsData || isLoading) return <LoadingScreen />

  return (
    <Container>
      <ScrollArea>
        {foods.map((food, index) => (
          <Chip
            key={food.foodId}
            size="md"
            label={food.name}
            selected={selectedFoods.includes(food.foodId)}
            onPress={() => handleSelectFood(food.name)}
            className={index === foods.length - 1 ? "" : "mb-4"}
          />
        ))}
      </ScrollArea>
    </Container>
  )
}
