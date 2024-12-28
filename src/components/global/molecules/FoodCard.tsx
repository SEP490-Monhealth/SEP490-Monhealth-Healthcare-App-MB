import React from "react"

import { Text } from "react-native"

import { useRouter } from "expo-router"

import { Add } from "iconsax-react-native"
import { MoreHorizontal } from "lucide-react-native"

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

  const handleViewFood = () => {
    router.push(`/foods/${foodId}/details`)
  }

  const handleAddFood = () => {
    console.log("Add food", foodId)
  }

  return (
    <Card onPress={variant === "default" ? handleViewFood : undefined}>
      <HStack className="items-center justify-between">
        <VStack gap={0} className="ml-1" onPress={handleViewFood}>
          <Text className="font-tmedium text-lg text-primary">{name}</Text>
          <Text className="font-tmedium text-sm text-accent">
            {calories ?? 0} kcal
            {size ? ` • ${size}` : " • 1 phần"} • {weight ?? 0} {unit ?? "g"}
          </Text>
        </VStack>

        {variant === "add" ? (
          <IconButton
            size="sm"
            icon={<Add size={20} color={COLORS.primary} />}
            onPress={handleAddFood}
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
