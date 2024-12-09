import React from "react"

import { VStack } from "@/components/global/atoms"

import { getNutrientColor } from "@/utils/helpers"

import { NutrientCard } from "./NutrientCard"

interface NutrientSummaryProps {
  nutrients: {
    label: string
    value: number
    maxValue: number
  }[]
}

export const NutrientSummary = ({ nutrients }: NutrientSummaryProps) => {
  return (
    <VStack gap={12}>
      {nutrients.map((nutrient, index) => (
        <NutrientCard
          key={index}
          label={nutrient.label}
          value={nutrient.value}
          maxValue={nutrient.maxValue}
          color={getNutrientColor(nutrient.label)}
        />
      ))}
    </VStack>
  )
}
