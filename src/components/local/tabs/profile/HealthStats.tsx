import React from "react"

import { Text, View } from "react-native"

import { Card } from "@/components/global/atoms"

interface HealthStatsProps {
  weight: number
  height: number
  bmi: number
}

export const HealthStats = ({ weight, height, bmi }: HealthStatsProps) => {
  return (
    <Card className="flex w-full flex-row justify-between px-12">
      <View className="items-center">
        <Text className="font-tbold text-sm text-card">Cân nặng</Text>
        <Text className="font-tbold text-xl text-typography">{weight} kg</Text>
      </View>
      <View className="items-center">
        <Text className="font-tbold text-sm text-card">BMI</Text>
        <Text className="font-tbold text-3xl text-primary">{bmi}</Text>
      </View>
      <View className="items-center">
        <Text className="font-tbold text-sm text-card">Chiều cao</Text>
        <Text className="font-tbold text-xl text-typography">{height} cm</Text>
      </View>
    </Card>
  )
}
