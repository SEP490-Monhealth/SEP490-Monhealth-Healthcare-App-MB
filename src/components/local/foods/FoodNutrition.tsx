import React from "react"

import { HStack } from "@/components/global/atoms"
import { ArcProgress } from "@/components/global/molecules"

import { toFixed } from "@/utils/formatters"
import { getNutritionColor } from "@/utils/helpers"

interface FoodNutritionProps {
  calories: number
  protein: number
  carbs: number
  fat: number
  weightRatio: number
}

export const FoodNutrition = ({
  calories,
  protein,
  carbs,
  fat,
  weightRatio
}: FoodNutritionProps) => {
  const adjustedCalories = calories * weightRatio
  const adjustedProtein = protein * weightRatio
  const adjustedCarbs = carbs * weightRatio
  const adjustedFat = fat * weightRatio

  const proteinFill = ((adjustedProtein * 4) / adjustedCalories) * 100
  const carbsFill = ((adjustedCarbs * 4) / adjustedCalories) * 100
  const fatFill = ((adjustedFat * 9) / adjustedCalories) * 100

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
        value={toFixed(proteinFill, 1) || 0}
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
        value={toFixed(carbsFill, 1) || 0}
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
        value={toFixed(fatFill, 1) || 0}
        label="Fat"
      />
    </HStack>
  )
}
