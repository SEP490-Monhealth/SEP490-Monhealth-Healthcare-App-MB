import React from "react"

import { Text } from "react-native"

import { MoreCircle } from "iconsax-react-native"

import { COLORS } from "@/constants/appConstants"

import { HStack, VStack } from "../atoms"

interface FoodCardProps {
  foodName: string
  calories: number
  portionSize: number
  portionWeight: number
  measurementUnit: string
}

export const FoodCard = ({
  foodName,
  calories,
  portionSize,
  portionWeight,
  measurementUnit
}: FoodCardProps) => {
  return (
    <HStack className="justify-between p-5">
      <VStack gap={2}>
        <Text className="font-nmedium text-sm text-typography">{foodName}</Text>
        <Text className="font-nregular text-xs text-typography-description">
          {portionSize} - {portionWeight} {measurementUnit} - {calories}{" "}
          calories
        </Text>
      </VStack>

      <MoreCircle size="32" color={COLORS.primary} />
    </HStack>
  )
}
