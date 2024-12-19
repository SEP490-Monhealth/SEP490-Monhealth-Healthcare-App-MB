import React from "react"

import { VStack } from "@/components/global/atoms"

import { FoodType } from "@/schemas/foodSchema"

import { NutritionItem } from "./NutritionItem"

interface NutritionFactsProps {
  nutritionData: FoodType
}

export const NutritionFacts = ({ nutritionData }: NutritionFactsProps) => (
  <VStack>
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
