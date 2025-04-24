import React from "react"

import { Card, VStack } from "@/components/global/atoms"

import { NutritionFactType } from "@/schemas/nutritionSchema"

import { toFixed } from "@/utils/formatters"

import {
  NutritionItem,
  NutritionSubItem
} from "../../global/molecules/NutritionItem"

interface NutritionFactsProps {
  nutritionData: NutritionFactType
  weightRatio: number
}

export const NutritionFacts = ({
  nutritionData,
  weightRatio
}: NutritionFactsProps) => {
  const calculateValue = (value?: number) =>
    toFixed((value ?? 0) * weightRatio, 1)

  const nutritionItems = [
    {
      label: "Năng lượng (Calories)",
      value: calculateValue(nutritionData.calories),
      unit: "kcal"
    },
    {
      label: "Chất đạm (Protein)",
      value: calculateValue(nutritionData.protein),
      unit: "g"
    },
    {
      label: "Tinh bột (Carbs)",
      value: calculateValue(nutritionData.carbs),
      unit: "g"
    },
    {
      label: "Chất béo (Fat)",
      value: calculateValue(nutritionData.fat),
      unit: "g",
      subItems: [
        {
          label: "Chất béo bão hòa",
          value: calculateValue(nutritionData.saturatedFat),
          unit: "g"
        },
        {
          label: "Chất béo không bão hòa",
          value: calculateValue(nutritionData.unsaturatedFat),
          unit: "g"
        }
      ]
    },
    {
      label: "Chất xơ (Fiber)",
      value: calculateValue(nutritionData.fiber),
      unit: "g"
    },
    {
      label: "Đường (Sugar)",
      value: calculateValue(nutritionData.sugar),
      unit: "g"
    },
    {
      label: "Cholesterol",
      value: calculateValue(nutritionData.cholesterol),
      unit: "mg"
    },
    {
      label: "Natri (Sodium)",
      value: calculateValue(nutritionData.sodium),
      unit: "mg"
    },
    {
      label: "Kali (Potassium)",
      value: calculateValue(nutritionData.potassium),
      unit: "mg"
    },
    {
      label: "Canxi (Calcium)",
      value: calculateValue(nutritionData.calcium),
      unit: "mg"
    },
    {
      label: "Sắt (Iron)",
      value: calculateValue(nutritionData.iron),
      unit: "mg"
    },
    {
      label: "Vitamin",
      subItems: [
        {
          label: "Vitamin A",
          value: calculateValue(nutritionData.vitaminA),
          unit: "IU"
        },
        {
          label: "Vitamin B1",
          value: calculateValue(nutritionData.vitaminB1),
          unit: "mg"
        },
        {
          label: "Vitamin B2",
          value: calculateValue(nutritionData.vitaminB2),
          unit: "mg"
        },
        {
          label: "Vitamin C",
          value: calculateValue(nutritionData.vitaminC),
          unit: "mg"
        },
        {
          label: "Vitamin D",
          value: calculateValue(nutritionData.vitaminD),
          unit: "IU"
        },
        {
          label: "Vitamin E",
          value: calculateValue(nutritionData.vitaminE),
          unit: "mg"
        }
      ]
    }
  ]

  return (
    <Card>
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
    </Card>
  )
}
