import React from "react"

import { Text } from "react-native"

import { Check, MoreHorizontal, Plus } from "lucide-react-native"

import { COLORS } from "@/constants/app"

import { toFixed } from "@/utils/formatters"

import { Card, Checkbox, HStack, VStack } from "../atoms"
import { IconButton } from "./IconButton"

interface FoodCardProps {
  variant?: "default" | "add" | "checkbox"
  name: string
  calories?: number
  quantity?: number
  size?: string
  weight?: number
  unit?: string
  recommended?: boolean
  status?: boolean
  isAdded?: boolean
  onPress?: () => void
  onAddPress?: () => void
  onCheckboxChange?: (value: boolean) => void
  onMorePress?: () => void
  onStatusPress?: () => void
}

export const FoodCard = ({
  variant = "default",
  name,
  calories,
  quantity = 1,
  size,
  weight,
  unit,
  recommended,
  status,
  isAdded,
  onPress,
  onAddPress,
  onCheckboxChange,
  onMorePress,
  onStatusPress
}: FoodCardProps) => {
  const handlePress = () => {
    if (variant === "checkbox") {
      if (onCheckboxChange) {
        onCheckboxChange(!status)
      }
      if (onStatusPress) {
        onStatusPress()
      }
    }
  }

  return (
    <Card>
      <HStack
        className="w-full items-center justify-between"
        onPress={handlePress}
      >
        <VStack gap={0} onPress={onPress}>
          <HStack center gap={8}>
            <Text className="font-tmedium text-lg text-primary">{name}</Text>

            {recommended && (
              <Text className="rounded-lg bg-muted px-3 py-1 font-tmedium text-sm text-primary">
                Đề xuất
              </Text>
            )}
          </HStack>

          <Text className="font-tmedium text-sm text-accent">
            {toFixed(Number(calories), 0) ?? 0} kcal
            {size
              ? ` - ${quantity} ${size.toLowerCase()}`
              : ` - ${quantity} phần`}
            {weight && unit ? ` - ${toFixed(weight, 1)} ${unit}` : ""}
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
        ) : variant === "checkbox" ? (
          <Checkbox
            size={20}
            checked={status}
            onCheckChange={() => {
              if (onCheckboxChange) onCheckboxChange(!status)
              if (onStatusPress) onStatusPress()
            }}
          />
        ) : (
          <IconButton
            testID="test-icon-more-button"
            size="sm"
            icon={<MoreHorizontal size={20} color={COLORS.primary} />}
            onPress={onMorePress}
          />
        )}
      </HStack>
    </Card>
  )
}
