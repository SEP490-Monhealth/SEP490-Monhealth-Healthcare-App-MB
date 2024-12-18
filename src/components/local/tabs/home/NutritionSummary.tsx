import React from "react"

import { VStack } from "@/components/global/atoms"

import { getNutritionColor } from "@/utils/helpers"

import { NutritionCard } from "./NutritionCard"

interface NutritionSummaryProps {
  nutrients: {
    label: string
    value: number
    maxValue: number
  }[]
}

export const NutritionSummary = ({ nutrients }: NutritionSummaryProps) => {
  return (
    <VStack gap={12}>
      {nutrients.map((nutrient, index) => (
        <NutritionCard
          key={index}
          label={nutrient.label}
          value={nutrient.value}
          maxValue={nutrient.maxValue}
          color={getNutritionColor(nutrient.label)}
        />
      ))}
    </VStack>
  )
}
