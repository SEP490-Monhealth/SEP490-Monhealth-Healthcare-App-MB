import React from "react"

import { VStack } from "@/components/global/atoms"

import { NutritionType } from "@/schemas/nutritionSchema"

import { NutritionItem } from "./NutritionItem"

interface NutritionFactsProps {
  nutritionData: NutritionType
}

export const NutritionFacts = ({ nutritionData }: NutritionFactsProps) => (
  <VStack>
    <NutritionItem
      label="Calories"
      value={200}
      unit="kcal"
      subItems={[
        { label: "From Fat", value: 70, unit: "kcal" },
        { label: "From Carbs", value: 100, unit: "kcal" }
      ]}
    />

    <NutritionItem
      label="Năng lượng (Calories)"
      value={nutritionData.calories}
      unit="kcal"
    />

    <NutritionItem
      label="Chất đạm (Protein)"
      value={nutritionData.protein}
      unit="g"
    />

    <NutritionItem
      label="Tinh bột (Carbohydrate)"
      value={nutritionData.carbs}
      unit="g"
    />

    <NutritionItem label="Chất béo (Fat)" value={nutritionData.fat} unit="g" />

    <NutritionItem
      label="Chất xơ (Fiber)"
      value={nutritionData.fiber}
      unit="g"
    />

    <NutritionItem label="Đường (Sugar)" value={nutritionData.sugar} unit="g" />
  </VStack>
)
