import React from "react"

import { Text } from "react-native"

import { VStack } from "@/components/global/atoms"

import { toFixed2 } from "@/utils/formatters"

interface NutrientCardProps {
  label: string
  value: number
}

export const NutrientCard = ({ label, value }: NutrientCardProps) => {
  return (
    <VStack center>
      <Text className="font-tmedium text-base leading-4 text-accent">
        {label}
      </Text>
      <Text className="font-tbold text-lg text-typography">
        {toFixed2(value)}g
      </Text>
    </VStack>
  )
}
