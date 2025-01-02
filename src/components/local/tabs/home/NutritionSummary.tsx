import React from "react"

import { VStack } from "@/components/global/atoms"

import { toFixed } from "@/utils/formatters"
import { getNutritionColor } from "@/utils/helpers"

import { NutritionCard } from "./NutritionCard"

export interface NutritionProps {
  label: string
  value: number
  targetValue: number
}

interface NutritionSummaryProps {
  nutritionData: NutritionProps[]
}

export const NutritionSummary = ({ nutritionData }: NutritionSummaryProps) => {
  return (
    <VStack gap={12}>
      {nutritionData.map((nutrient, index) => (
        <NutritionCard
          key={index}
          label={nutrient.label}
          value={toFixed(nutrient.value, 1)}
          targetValue={nutrient.targetValue}
          color={getNutritionColor(nutrient.label)}
        />
      ))}
    </VStack>
  )
}
