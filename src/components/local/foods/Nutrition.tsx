import React from "react"

import { HStack } from "@/components/global/atoms"
import { ArcProgress } from "@/components/global/molecules"

import { NutritionType } from "@/schemas/nutritionSchema"

import { toFixed2 } from "@/utils/formatters"
import { getNutritionColor } from "@/utils/helpers"

interface NutritionProps {
  nutritionData: NutritionType
}

export const Nutrition = ({ nutritionData }: NutritionProps) => {
  const proteinFill =
    ((nutritionData.protein * 4) / nutritionData.calories) * 100
  const carbsFill = ((nutritionData.carbs * 4) / nutritionData.calories) * 100
  const fatFill = ((nutritionData.fat * 9) / nutritionData.calories) * 100

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
        value={toFixed2(proteinFill)}
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
        value={toFixed2(carbsFill)}
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
        value={toFixed2(fatFill)}
        label="Fat"
      />
    </HStack>
  )
}
