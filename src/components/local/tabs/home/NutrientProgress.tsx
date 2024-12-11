import React from "react"

import { Image, Text, View } from "react-native"

import { VStack } from "@/components/global/atoms"
import { CircularProgress } from "@/components/global/molecules"

import { getNutrientColor } from "@/utils/helpers"

interface NutrientProgressProps {
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

export const NutrientProgress = ({
  calories,
  nutrients
}: NutrientProgressProps) => {
  return (
    <View
      className="relative items-center justify-center"
      style={{ width: 240, height: 240 }}
    >
      {nutrients.map((nutrient, index) => {
        const fill = (nutrient.value / nutrient.maxValue) * 100

        return (
          <View
            key={index}
            style={{ position: "absolute", alignItems: "center" }}
          >
            <CircularProgress
              size={240 - index * 30}
              width={6}
              fill={fill}
              tintColor={getNutrientColor(nutrient.label)}
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

        <Text className="-mb-2 font-tbold text-base text-typography">
          {calories ? `${calories.value} / ${calories.maxValue}` : "0 / 0"}
        </Text>

        <Text className="font-tmedium text-sm text-accent">
          {calories.label}
        </Text>
      </VStack>
    </View>
  )
}
