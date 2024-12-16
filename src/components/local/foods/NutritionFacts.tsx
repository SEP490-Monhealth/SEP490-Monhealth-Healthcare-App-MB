import React from "react"

import { VStack } from "@/components/global/atoms"

import { FoodType } from "@/schemas/foodSchema"

import { NutrientItem } from "./NutrientItem"

interface NutritionFactsProps {
  nutritionData: FoodType
}

export const NutritionFacts = ({ nutritionData }: NutritionFactsProps) => (
  <VStack gap={4}>
    <NutrientItem label="Calories" value={nutritionData.calories} unit="kcal" />
    <NutrientItem label="Protein" value={nutritionData.protein} unit="g" />
    <NutrientItem label="Carbs" value={nutritionData.carbs} unit="g" />
    <NutrientItem label="Fat" value={nutritionData.fat} unit="g" />
    <NutrientItem label="Fiber" value={nutritionData.fiber} unit="g" />
    <NutrientItem label="Sugar" value={nutritionData.sugar} unit="g" />
  </VStack>
)
