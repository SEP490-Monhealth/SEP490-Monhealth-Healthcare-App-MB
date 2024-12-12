import React from "react"

import { Text, View } from "react-native"

import { HStack, VStack } from "@/components/global/atoms"

interface NutrientCardProps {
  label: string
  value: number
  maxValue: number
  color: string
}

export const NutrientCard = ({
  label,
  value,
  maxValue,
  color
}: NutrientCardProps) => {
  return (
    <VStack>
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
      
      <Text className="font-tbold text-sm text-typography">
        {value}/{maxValue}gr
      </Text>
    </VStack>
  )
}
