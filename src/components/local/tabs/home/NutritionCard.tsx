import React from "react"

import { Text, View } from "react-native"

import { HStack } from "@/components/global/atoms"

interface NutritionCardProps {
  label: string
  value: number
  maxValue: number
  color: string
}

export const NutritionCard = ({
  label,
  value,
  maxValue,
  color
}: NutritionCardProps) => {
  return (
    <View>
      <HStack gap={8} center>
        <View
          className="rounded-full"
          style={{
            width: 10,
            height: 10,
            backgroundColor: color
          }}
        />
        <Text className="font-tmedium text-base leading-4 text-accent">
          {label}
        </Text>
      </HStack>

      <Text className="font-tbold text-sm text-primary">
        {value}/{maxValue} g
      </Text>
    </View>
  )
}
