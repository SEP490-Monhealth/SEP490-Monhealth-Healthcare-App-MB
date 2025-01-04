import React from "react"

import { Text } from "react-native"

import { Check, MoreHorizontal, Plus } from "lucide-react-native"

import { COLORS } from "@/constants/app"

import { toFixed } from "@/utils/formatters"

import { Card, HStack, VStack } from "../atoms"
import { IconButton } from "./IconButton"

interface FoodCardProps {
  variant?: "default" | "add" | "checkbox" | "more"
  name: string
  calories?: number
  quantity?: number
  size?: string
  weight?: number
  unit?: string
  isAdded?: boolean
  onPress?: () => void
  onAddPress?: () => void
  onMorePress?: () => void
}

export const FoodCard = ({
  variant = "default",
  name,
  calories,
  quantity = 1,
  size,
  weight,
  unit,
  isAdded,
  onPress,
  onAddPress,
  onMorePress
}: FoodCardProps) => {
  return (
    <Card>
      <HStack className="w-full items-center justify-between">
        <VStack gap={0} className="ml-1" onPress={onPress}>
          <Text className="font-tmedium text-lg text-primary">{name}</Text>
          <Text className="font-tmedium text-sm text-accent">
            {toFixed(Number(calories), 0) ?? 0} kcal
            {size
              ? ` • ${quantity} ${size.toLowerCase()}`
              : ` • ${quantity} phần`}
            {weight && unit ? ` • ${weight} ${unit}` : ""}
          </Text>
        </VStack>

        {variant === "add" ? (
          <IconButton
            testID="test-icon-add-button"
            size="sm"
            icon={
              isAdded ? (
                <Check size={16} strokeWidth={2.5} color={COLORS.primary} />
              ) : (
                <Plus size={18} strokeWidth={2.3} color={COLORS.secondary} />
              )
            }
            onPress={onAddPress}
          />
        ) : variant === "more" ? (
          <IconButton
            testID="test-icon-more-button"
            size="sm"
            icon={<MoreHorizontal size={20} color={COLORS.primary} />}
            onPress={onMorePress}
          />
        ) : null}
      </HStack>
    </Card>
  )
}
