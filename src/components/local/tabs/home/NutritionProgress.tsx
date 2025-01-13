import React from "react"

import { Image, Text, View } from "react-native"

import { VStack } from "@/components/global/atoms"
import { CircularProgress } from "@/components/global/molecules"

import { toFixed } from "@/utils/formatters"
import { getNutritionColor } from "@/utils/helpers"

export interface NutritionProps {
  label: string
  value: number
  targetValue: number
}

interface NutritionProgressProps {
  calorieData: NutritionProps
  nutritionData: NutritionProps[]
}

export const NutritionProgress = ({
  calorieData,
  nutritionData
}: NutritionProgressProps) => {
  return (
    <View
      className="relative items-center justify-center"
      style={{ width: 240, height: 240 }}
    >
      {nutritionData.map((nutrient, index) => {
        const fill =
          nutrient.targetValue > 0
            ? (nutrient.value / nutrient.targetValue) * 100
            : 0

        return (
          <View key={index} className="absolute items-center">
            <CircularProgress
              size={240 - index * 30}
              width={6}
              fill={fill}
              tintColor={getNutritionColor(nutrient.label)}
            />
          </View>
        )
      })}

      <VStack center>
        <Image
          source={require("../../../../../public/images/monhealth-fire-image.png")}
          resizeMode="cover"
          style={{ width: 24, height: 24 }}
        />

        <Text className="-mb-2 font-tbold text-base text-primary">
          {calorieData
            ? `${toFixed(calorieData.value, 0)} / ${toFixed(calorieData.targetValue, 0)}`
            : "0 / 0"}
        </Text>

        <Text className="font-tmedium text-sm text-accent">
          {calorieData.label === "Calories" && "Kcal"}
        </Text>
      </VStack>
    </View>
  )
}
