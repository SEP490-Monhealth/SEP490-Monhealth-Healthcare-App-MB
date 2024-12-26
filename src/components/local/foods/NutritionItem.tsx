import React from "react"

import { Text } from "react-native"

import { HStack } from "@/components/global/atoms"

interface NutritionItemProps {
  label: string
  value: number
  unit: string
  subItems?: NutritionSubItemProps[]
}

interface NutritionSubItemProps {
  label: string
  value: number
  unit: string
}

export const NutritionSubItem = ({
  label,
  value = 0,
  unit
}: NutritionSubItemProps) => (
  <HStack className="justify-between py-1 pl-4">
    <Text className="font-tregular text-sm text-secondary">{label}</Text>
    <Text className="font-tmedium text-sm text-primary">
      {value} {unit}
    </Text>
  </HStack>
)

export const NutritionItem = ({
  label,
  value = 0,
  unit,
  subItems
}: NutritionItemProps) => (
  <HStack center className="justify-between border-b border-border py-2">
    <Text className="font-tmedium text-base text-secondary">{label}</Text>
    <Text className="font-tmedium text-lg text-primary">
      {value} {unit}
    </Text>
    {subItems && (
      <HStack className="mt-2 flex-col">
        {subItems.map((subItem, index) => (
          <NutritionSubItem
            key={index}
            label={subItem.label}
            value={subItem.value}
            unit={subItem.unit}
          />
        ))}
      </HStack>
    )}
  </HStack>
)
