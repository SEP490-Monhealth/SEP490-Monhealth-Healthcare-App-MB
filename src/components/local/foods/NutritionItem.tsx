import React from "react"

import { Text } from "react-native"

import { HStack } from "@/components/global/atoms"

interface NutritionItemProps {
  label: string
  value: number
  unit: string
}

export const NutritionItem = ({ label, value, unit }: NutritionItemProps) => (
  <HStack center className="justify-between border-b border-border py-2">
    <Text className="font-tmedium text-base text-secondary">{label}</Text>
    <Text className="font-tmedium text-lg text-primary">
      {value} {unit}
    </Text>
  </HStack>
)
