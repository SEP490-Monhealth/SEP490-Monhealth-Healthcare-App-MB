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
  const caloriesValue = toFixed(calorieData.value, 0)
  const caloriesGoal = toFixed(calorieData.targetValue, 0)

  return (
    <View
      className="relative items-center justify-center"
      style={{ width: 240, height: 240 }}
    >
      {nutritionData.map((item, index) => {
        const progress =
          item.targetValue > 0 ? (item.value / item.targetValue) * 100 : 0

        return (
          <View key={index} className="absolute items-center">
            <CircularProgress
              size={240 - index * 30}
              width={6}
              fill={progress}
              tintColor={getNutritionColor(item.label)}
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
          {caloriesValue} / {caloriesGoal}
        </Text>

        <Text className="font-tmedium text-sm text-accent">kcal</Text>
      </VStack>
    </View>
  )
}
