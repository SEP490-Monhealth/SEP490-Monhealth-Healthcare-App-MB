import React from "react"

import { HStack } from "@/components/global/atoms"
import { ArcProgress } from "@/components/global/molecules"

import { toFixed2 } from "@/utils/formatters"
import { getNutritionColor } from "@/utils/helpers"

interface FoodNutritionProps {
  calories: number
  protein: number
  carbs: number
  fat: number
}

export const FoodNutrition = ({
  calories,
  protein,
  carbs,
  fat
}: FoodNutritionProps) => {
  const proteinFill = ((protein * 4) / calories) * 100
  const carbsFill = ((carbs * 4) / calories) * 100
  const fatFill = ((fat * 9) / calories) * 100

  return (
    <HStack center className="justify-between">
      <ArcProgress
        variant="sm"
        size={110}
        width={8}
        fill={proteinFill}
        tintColor={getNutritionColor("Protein")}
        centerCircle={true}
        valueType="percentage"
        value={toFixed2(proteinFill) || 0}
        label="Protein"
      />

      <ArcProgress
        variant="sm"
        size={110}
        width={8}
        fill={carbsFill}
        tintColor={getNutritionColor("Carbs")}
        centerCircle={true}
        valueType="percentage"
        value={toFixed2(carbsFill) || 0}
        label="Carbs"
      />

      <ArcProgress
        variant="sm"
        size={110}
        width={8}
        fill={fatFill}
        tintColor={getNutritionColor("Fat")}
        centerCircle={true}
        valueType="percentage"
        value={toFixed2(fatFill) || 0}
        label="Fat"
      />
    </HStack>
  )
}
