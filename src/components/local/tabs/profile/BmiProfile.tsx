import React from "react"

import { Text, View } from "react-native"

import { Card } from "../../../global/atoms/Card"

interface BmiProps {
  weight: number
  bmi: number
  height: number
}

export const BmiProfile = ({ weight, bmi, height }: BmiProps) => {
  return (
    <Card className="flex-row justify-between px-8 py-6">
      <View className="items-center">
        <Text className="font-tbold text-sm text-card">Cân nặng</Text>
        <Text className="text-xl font-bold text-typography">{weight} kg</Text>
      </View>
      <View className="items-center">
        <Text className="font-tbold text-sm text-card">BMI</Text>
        <Text className="text-3xl font-bold text-primary">{bmi}</Text>
      </View>
      <View className="items-center">
        <Text className="font-tbold text-sm text-card">Chiều cao</Text>
        <Text className="text-xl font-bold text-typography">{height} cm</Text>
      </View>
    </Card>
  )
}

export default BmiProfile
