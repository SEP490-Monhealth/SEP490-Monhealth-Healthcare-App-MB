import React from "react"

import { useLocalSearchParams } from "expo-router"

import { Container, VStack } from "@/components/global/atoms"
import { ArcProgress, FoodCard } from "@/components/global/molecules"
import { Header, Section } from "@/components/global/organisms"

import { sampleMealsData } from "@/constants/meals"

import { getMealTypeName } from "@/utils/helpers"

function MealDetailsScreen() {
  const { mealType } = useLocalSearchParams() as { mealType: string }

  return (
    <Container scroll>
      <Header back title={getMealTypeName(mealType)} />

      <ArcProgress
        size={240}
        width={14}
        fill={70}
        arcSweepAngle={260}
        rotation={230}
        centerCircle={true}
        calorieValue={300}
        maxCalories={1000}
        label="Calories"
      />

      <Section title="Chi tiết bữa ăn" />

      <VStack gap={12}>
        {sampleMealsData.map((food) => (
          <FoodCard
            key={food.foodId}
            foodName={food.foodName}
            calories={food.calories}
            portionSize={food.portionSize}
            portionWeight={food.portionWeight}
            measurementUnit={food.measurementUnit}
          />
        ))}
      </VStack>
    </Container>
  )
}

export default MealDetailsScreen
