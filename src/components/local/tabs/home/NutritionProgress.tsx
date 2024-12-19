import React from "react"

import { Image, Text, View } from "react-native"

import { VStack } from "@/components/global/atoms"
import { CircularProgress } from "@/components/global/molecules"

import { getNutritionColor } from "@/utils/helpers"

interface NutritionProgressProps {
  calories: {
    label: string
    value: number
    maxValue: number
  }
  nutrients: {
    label: string
    value: number
    maxValue: number
  }[]
}

export const NutritionProgress = ({
  calories,
  nutrients
}: NutritionProgressProps) => {
  return (
    <View
      className="relative items-center justify-center"
      style={{ width: 240, height: 240 }}
    >
      {nutrients.map((nutrient, index) => {
        const fill = (nutrient.value / nutrient.maxValue) * 100

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
          source={require("../../../../../public/images/fire-icon.png")}
          resizeMode="cover"
          style={{ width: 27, height: 27 }}
        />

        <Text className="-mb-2 font-tbold text-base text-primary">
          {calories ? `${calories.value} / ${calories.maxValue}` : "0 / 0"}
        </Text>

        <Text className="font-tmedium text-sm text-accent">
          {calories.label}
        </Text>
      </VStack>
    </View>
  )
}
