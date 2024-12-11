import React from "react"

import { Text } from "react-native"

import { MoreHorizontal } from "lucide-react-native"

import { COLORS } from "@/constants/appConstants"

import { Card, Checkbox, HStack, VStack } from "../atoms"

interface FoodCardProps {
  variant?: "more" | "checkbox"
  checked?: boolean
  onCheckChange?: (checked: boolean) => void
  foodName: string
  calories: number
  portionSize?: string
  portionWeight: number
  measurementUnit: string
}

export const FoodCard = ({
  variant = "more",
  checked = false,
  onCheckChange,
  foodName,
  calories,
  portionSize,
  portionWeight,
  measurementUnit
}: FoodCardProps) => {
  return (
    <Card
      onPress={
        variant === "checkbox" ? () => onCheckChange?.(!checked) : undefined
      }
    >
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

        {variant === "more" ? (
          <MoreHorizontal size={20} color={COLORS.primary} />
        ) : (
          <Checkbox size={20} checked={checked} onCheckChange={onCheckChange} />
        )}
      </HStack>
    </Card>
  )
}
