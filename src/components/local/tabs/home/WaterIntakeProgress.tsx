import React from "react"

import { Image, Text, View } from "react-native"

import { VStack } from "@/components/global/atoms"
import { CircularProgress } from "@/components/global/molecules"

import { COLORS } from "@/constants/app"

import { toFixed } from "@/utils/formatters"

export interface WaterIntakeProps {
  label: string
  value: number
  targetValue: number
}

interface WaterIntakeProgressProps {
  waterIntakeData: WaterIntakeProps
}

export const WaterIntakeProgress = ({
  waterIntakeData
}: WaterIntakeProgressProps) => {
  const progress =
    waterIntakeData.targetValue > 0
      ? (waterIntakeData.value / waterIntakeData.targetValue) * 100
      : 0

  const waterIntakeValue = toFixed(waterIntakeData.value)
  const waterIntakeGoal = toFixed(waterIntakeData.targetValue, 0)

  return (
    <View
      className="relative items-center justify-center"
      style={{ width: 240, height: 240 }}
    >
      <View className="absolute items-center">
        <CircularProgress
          size={240}
          width={8}
          fill={progress}
          tintColor={COLORS.PRIMARY.water}
        />
      </View>

      <VStack center gap={8}>
        <Image
          source={require("../../../../../public/images/monhealth-water-intake-image.png")}
          style={{ width: 36, height: 36 }}
        />

        <VStack center>
          <Text className="-mb-2 font-tbold text-lg text-primary">
            {waterIntakeValue} / {waterIntakeGoal}
          </Text>

          <Text className="font-tmedium text-base text-accent">ml</Text>
        </VStack>
      </VStack>
    </View>
  )
}
