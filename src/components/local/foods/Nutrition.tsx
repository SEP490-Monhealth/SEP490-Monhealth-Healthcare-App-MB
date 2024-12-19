import React from "react"

import { Card, HStack } from "@/components/global/atoms"
import { NutritionCard } from "@/components/global/molecules"

import { FoodType } from "@/schemas/foodSchema"

import { getNutritionColor } from "@/utils/helpers"

interface NutritionProps {
  foodData: FoodType
}

export const Nutrition = ({ foodData }: NutritionProps) => {
  return (
    <Card className="px-8 py-6">
      <HStack center className="justify-between">
        <NutritionCard
          reverse={true}
          label="Calories"
          value={foodData.calories}
          fillColor={true}
          color={getNutritionColor("Fiber")}
          unit="kcal"
        />

        <NutritionCard
          reverse={true}
          label="Protein"
          value={foodData.protein}
          fillColor={true}
          color={getNutritionColor("Protein")}
          unit="g"
        />

        <NutritionCard
          reverse={true}
          label="Carbs"
          value={foodData.carbs}
          fillColor={true}
          color={getNutritionColor("Carbs")}
          unit="g"
        />

        <NutritionCard
          reverse={true}
          label="Fat"
          value={foodData.fat}
          fillColor={true}
          color={getNutritionColor("Fat")}
          unit="g"
        />
      </HStack>
    </Card>
  )
}
