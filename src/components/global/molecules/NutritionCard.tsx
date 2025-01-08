import React from "react"

import { Text } from "react-native"

import { VStack } from "@/components/global/atoms"

import { cn } from "@/lib/utils"

import { toFixed } from "@/utils/formatters"

import { CounterText } from "./CounterText"

interface NutritionCardProps {
  reverse?: boolean
  label: string
  value: number
  fillColor?: boolean
  color?: string
  showUnit?: boolean
  unit?: string
}

export const NutritionCard = ({
  reverse = false,
  label,
  value,
  fillColor = false,
  color,
  showUnit = false,
  unit
}: NutritionCardProps) => {
  const reverseClass = reverse ? "flex-col-reverse" : ""

  return (
    <VStack center className={cn("", reverseClass)}>
      <Text className="font-tmedium text-base text-accent">{label}</Text>

      <Text
        className={cn("font-tbold text-lg leading-5")}
        style={fillColor ? { color } : undefined}
      >
        <CounterText value={toFixed(value, 2)} />
        {showUnit ? unit : ""}
      </Text>
    </VStack>
  )
}
