import React from "react"

import { Text } from "react-native"

import { HStack } from "@/components/global/atoms"

interface NutrientItemProps {
  label: string
  value: number
  unit: string
}

export const NutrientItem = ({ label, value, unit }: NutrientItemProps) => (
  <HStack className="justify-between">
    <Text className="font-tmedium text-lg text-typography">{label}</Text>
    <Text className="font-tmedium text-lg text-typography">
      {value} {unit}
    </Text>
  </HStack>
)
