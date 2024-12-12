import React from "react"

import { Text } from "react-native"

import { MoreHorizontal } from "lucide-react-native"

import { COLORS } from "@/constants/appConstants"

import { Card,  HStack, VStack } from "../atoms"

interface FoodCardProps {
  foodName: string
  calories: number
  portionSize?: string
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
    <Card>
      <HStack className="items-center justify-between">
        <VStack gap={0}>
          <Text className="font-tmedium text-lg text-typography">
            {foodName}
          </Text>
          <Text className="font-tmedium text-sm text-accent">
            {calories} calories{portionSize && ` • ${portionSize}`} •{" "}
            {portionWeight}
            {measurementUnit}
          </Text>
        </VStack>

        <MoreHorizontal size={20} color={COLORS.primary} />
      </HStack>
    </Card>
  )
}
