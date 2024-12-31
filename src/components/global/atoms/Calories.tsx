import React from "react"

import { Text, View } from "react-native"

import { Button } from "./Button"
import { VStack } from "./Stack"

interface CaloriesProps {
  caloriesInput: number
}

export const Calories = ({ caloriesInput }: CaloriesProps) => {
  return (
    <View className="flex-row items-end">
      <Text className="font-tbold text-6xl text-primary">{caloriesInput}</Text>
      <Text className="pb-3 font-tmedium text-base text-accent">kcal</Text>
    </View>
  )
}
