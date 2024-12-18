import React from "react"

import { HStack } from "@/components/global/atoms"

import { MealType } from "@/schemas/mealSchema"

import { NutritionCard } from "./NutritionCard"

interface NutritionSummaryProps {
  nutritionData: MealType
}

export const NutritionSummary = ({ nutritionData }: NutritionSummaryProps) => {
  return (
    <HStack center className="justify-between px-2">
      <NutritionCard label="Protein" value={nutritionData?.protein} />
      <NutritionCard label="Carbs" value={nutritionData?.carbs} />
      <NutritionCard label="Fat" value={nutritionData?.fat} />
      <NutritionCard label="Fiber" value={nutritionData?.fiber} />
      <NutritionCard label="Sugar" value={nutritionData?.sugar} />
    </HStack>
  )
}
