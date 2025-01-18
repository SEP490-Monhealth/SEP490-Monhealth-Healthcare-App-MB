import React from "react"

import { Text, View } from "react-native"

import { HStack } from "@/components/global/atoms"

interface NutritionCardProps {
  label: string
  value: number
  targetValue: number
  color: string
}

export const NutritionCard = ({
  label,
  value,
  targetValue,
  color
}: NutritionCardProps) => {
  return (
    <View>
      <HStack gap={6} center>
        <View
          className="rounded-full"
          style={{ width: 10, height: 10, backgroundColor: color }}
        />
        <Text className="font-tmedium text-base leading-4 text-accent">
          {label}
        </Text>
      </HStack>

      <Text className="font-tbold text-sm text-primary">
        {value}/{targetValue} g
      </Text>
    </View>
  )
}
