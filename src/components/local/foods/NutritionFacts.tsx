import React from "react"

import { VStack } from "@/components/global/atoms"

import { FoodType } from "@/schemas/foodSchema"

import { NutritionItem } from "./NutrientItem"

interface NutritionFactsProps {
  nutritionData: FoodType
}

export const NutritionFacts = ({ nutritionData }: NutritionFactsProps) => (
  <VStack gap={4}>
    <NutritionItem
      label="Calories"
      value={nutritionData.calories}
      unit="kcal"
    />
    <NutritionItem label="Protein" value={nutritionData.protein} unit="g" />
    <NutritionItem label="Carbs" value={nutritionData.carbs} unit="g" />
    <NutritionItem label="Fat" value={nutritionData.fat} unit="g" />
    <NutritionItem label="Fiber" value={nutritionData.fiber} unit="g" />
    <NutritionItem label="Sugar" value={nutritionData.sugar} unit="g" />
  </VStack>
)
