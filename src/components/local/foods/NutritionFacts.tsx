import React from "react"

import { VStack } from "@/components/global/atoms"

import { NutritionType } from "@/schemas/nutritionSchema"

import {
  NutritionItem,
  NutritionSubItem
} from "../../global/molecules/NutritionItem"

interface NutritionFactsProps {
  nutritionData: NutritionType
}

export const NutritionFacts = ({ nutritionData }: NutritionFactsProps) => {
  const nutritionItems = [
    {
      label: "Năng lượng (Calories)",
      value: nutritionData.calories,
      unit: "kcal"
    },
    { label: "Chất đạm (Protein)", value: nutritionData.protein, unit: "g" },
    { label: "Tinh bột (Carbs)", value: nutritionData.carbs, unit: "g" },
    {
      label: "Chất béo (Fat)",
      value: nutritionData.fat,
      unit: "g",
      subItems: [
        {
          label: "Chất béo bão hòa",
          value: nutritionData.saturatedFat,
          unit: "g"
        },
        {
          label: "Chất béo không bão hòa",
          value: nutritionData.unsaturatedFat,
          unit: "g"
        }
      ]
    },
    { label: "Chất xơ (Fiber)", value: nutritionData.fiber, unit: "g" },
    { label: "Đường (Sugar)", value: nutritionData.sugar, unit: "g" },
    { label: "Cholesterol", value: nutritionData.cholesterol, unit: "mg" },
    { label: "Natri (Sodium)", value: nutritionData.sodium, unit: "mg" },
    { label: "Kali (Potassium)", value: nutritionData.potassium, unit: "mg" },
    { label: "Canxi (Calcium)", value: nutritionData.calcium, unit: "mg" },
    { label: "Sắt (Iron)", value: nutritionData.iron, unit: "mg" },
    {
      label: "Vitamin",
      subItems: [
        { label: "Vitamin A", value: nutritionData.vitaminA, unit: "IU" },
        { label: "Vitamin B1", value: nutritionData.vitaminB1, unit: "mg" },
        { label: "Vitamin B2", value: nutritionData.vitaminB2, unit: "mg" },
        { label: "Vitamin C", value: nutritionData.vitaminC, unit: "mg" },
        { label: "Vitamin D", value: nutritionData.vitaminD, unit: "IU" },
        { label: "Vitamin E", value: nutritionData.vitaminE, unit: "mg" }
      ]
    }
  ]

  return (
    <VStack>
      {nutritionItems.map((item, index) => (
        <NutritionItem
          key={index}
          label={item.label}
          value={item.value}
          unit={item.unit}
        >
          {item.subItems &&
            item.subItems.map((subItem, subIndex) => (
              <NutritionSubItem
                key={subIndex}
                label={subItem.label}
                value={subItem.value}
                unit={subItem.unit}
              />
            ))}
        </NutritionItem>
      ))}
    </VStack>
  )
}
