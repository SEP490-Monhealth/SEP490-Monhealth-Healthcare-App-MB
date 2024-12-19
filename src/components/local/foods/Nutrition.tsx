import React from "react"

import { HStack } from "@/components/global/atoms"
import { ArcProgress } from "@/components/global/molecules"

import { FoodType } from "@/schemas/foodSchema"

import { toFixed2 } from "@/utils/formatters"
import { getNutritionColor } from "@/utils/helpers"

interface NutritionProps {
  foodData: FoodType
}

export const Nutrition = ({ foodData }: NutritionProps) => {
  const proteinFill = ((foodData.protein * 4) / foodData.calories) * 100
  const carbsFill = ((foodData.carbs * 4) / foodData.calories) * 100
  const fatFill = ((foodData.fat * 9) / foodData.calories) * 100

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
