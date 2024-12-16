import React from "react"

import { HStack } from "@/components/global/atoms"

import { MealType } from "@/schemas/mealSchema"

import { NutrientCard } from "./NutrientCard"

interface NutritionSummaryProps {
  nutritionData: MealType
}

export const NutritionSummary = ({ nutritionData }: NutritionSummaryProps) => {
  return (
    <HStack center className="justify-between px-2">
      <NutrientCard label="Protein" value={nutritionData?.protein} />
      <NutrientCard label="Carbs" value={nutritionData?.carbs} />
      <NutrientCard label="Fat" value={nutritionData?.fat} />
      <NutrientCard label="Fiber" value={nutritionData?.fiber} />
      <NutrientCard label="Sugar" value={nutritionData?.sugar} />
    </HStack>
  )
}
