import React from "react"

import { Text } from "react-native"

import { Check, MoreHorizontal, Plus } from "lucide-react-native"

import { COLORS } from "@/constants/color"

import { toFixed } from "@/utils/formatters"

import { Badge, Card, CardHeader, Checkbox, HStack, VStack } from "../atoms"
import { IconButton } from "./IconButton"

interface FoodCardProps {
  variant?: "default" | "add" | "checkbox" | "more"
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
            <CardHeader label={name} />

            {recommended && <Badge label="Đề xuất" />}
          </HStack>

          <Text
            className={`font-tmedium text-sm text-accent ${recommended ? "mt-1" : ""}`}
          >
            {toFixed(Number(calories), 0) ?? 0} kcal
            {size
              ? ` • ${quantity} ${size.toLowerCase()}`
              : ` • ${quantity} phần`}
            {weight && unit ? ` • ${toFixed(weight, 1)} ${unit}` : ""}
          </Text>
        </VStack>

        {variant === "add" ? (
          <IconButton
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
            size={18}
            checked={status}
            onCheckChange={() => {
              if (onCheckboxChange) onCheckboxChange(!status)
              if (onStatusPress) onStatusPress()
            }}
          />
        ) : variant === "more" ? (
          <IconButton
            size="sm"
            icon={<MoreHorizontal size={20} color={COLORS.primary} />}
            onPress={onMorePress}
          />
        ) : null}
      </HStack>
    </Card>
  )
}
