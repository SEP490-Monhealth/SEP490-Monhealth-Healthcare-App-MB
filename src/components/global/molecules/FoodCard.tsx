import React, { useState } from "react"

import { Text } from "react-native"

import { useRouter } from "expo-router"

import { Check, MoreHorizontal, Plus } from "lucide-react-native"

import { COLORS } from "@/constants/app"

import { Card, HStack, VStack } from "../atoms"
import { IconButton } from "./IconButton"

interface FoodCardProps {
  variant?: "default" | "add" | "more"
  foodId: string
  name: string
  calories?: number
  size?: string
  weight?: number
  unit?: string
  onMorePress?: () => void
}

export const FoodCard = ({
  variant = "default",
  foodId,
  name,
  calories,
  size,
  weight,
  unit,
  onMorePress
}: FoodCardProps) => {
  const router = useRouter()

  const [isAdded, setIsAdded] = useState(false)

  const handleViewFood = () => {
    router.push(`/foods/${foodId}/details`)
  }

  const handleAddFood = () => {
    setIsAdded(!isAdded)

    console.log("Add food", foodId)
  }

  return (
    <Card onPress={variant === "default" ? handleViewFood : undefined}>
      <HStack className="w-full items-center justify-between">
        <VStack gap={0} className="ml-1" onPress={handleViewFood}>
          <Text className="font-tmedium text-lg text-primary">{name}</Text>
          <Text className="font-tmedium text-sm text-accent">
            {calories ?? 0} kcal
            {size ? ` • 1 ${size.toLowerCase()}` : " • 1 phần"}
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
            onPress={handleAddFood}
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
