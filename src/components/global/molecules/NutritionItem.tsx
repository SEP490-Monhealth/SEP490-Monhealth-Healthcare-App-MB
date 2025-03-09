import React, { ReactNode } from "react"

import { Text, View } from "react-native"

import { CardHeader, HStack } from "@/components/global/atoms"

interface NutritionItemProps {
  label: string
  value?: number
  unit?: string
  children?: ReactNode
}

export const NutritionItem = ({
  label,
  value,
  unit,
  children
}: NutritionItemProps) => (
  <View className="border-b border-border py-2">
    <HStack center className="items-center justify-between">
      <Text className="font-tregular text-base text-secondary">{label}</Text>

      <CardHeader label={value !== undefined ? `${value} ${unit}` : ""} />
    </HStack>

    {children && <View className="ml-1 mt-1">{children}</View>}
  </View>
)

interface NutritionSubItemProps {
  label: string
  value?: number
  unit: string
}

export const NutritionSubItem = ({
  label,
  value = 0,
  unit
}: NutritionSubItemProps) => (
  <HStack center className="justify-between py-1.5">
    <Text className="font-tregular text-sm text-secondary">{label}</Text>
    <Text className="font-tmedium text-base text-primary">
      {value} {unit}
    </Text>
  </HStack>
)
