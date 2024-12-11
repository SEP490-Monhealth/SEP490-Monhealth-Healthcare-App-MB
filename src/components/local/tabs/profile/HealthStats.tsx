import React from "react"

import { Text, View } from "react-native"

import { Card } from "@/components/global/atoms"

import { COLORS } from "@/constants/appConstants"

interface HealthStatsProps {
  weight: number
  height: number
  bmi: number
}

export const HealthStats = ({ weight, height, bmi }: HealthStatsProps) => {
  let bmiColor = COLORS.BMI.normal

  if (bmi < 18.5) {
    bmiColor = COLORS.BMI.low
  } else if (bmi >= 30) {
    bmiColor = COLORS.BMI.high
  }

  return (
    <Card className="flex flex-row items-center justify-between px-12">
      <View className="items-center">
        <Text className="font-tmedium text-base text-card">Cân nặng</Text>
        <Text className="font-tbold text-xl text-typography">{weight} kg</Text>
      </View>

      <View className="items-center">
        <Text className="font-tmedium text-base text-card">BMI</Text>
        <Text className="font-tbold text-3xl" style={{ color: bmiColor }}>
          {bmi}
        </Text>
      </View>

      <View className="items-center">
        <Text className="font-tmedium text-base text-card">Chiều cao</Text>
        <Text className="font-tbold text-xl text-typography">{height} cm</Text>
      </View>
    </Card>
  )
}
