import React from "react"

import { Text } from "react-native"

import { useRouter } from "expo-router"

import { Add } from "iconsax-react-native"
import { MoreHorizontal } from "lucide-react-native"

import { COLORS } from "@/constants/appConstants"

import { Card, HStack, VStack } from "../atoms"
import { IconButton } from "./IconButton"

interface FoodCardProps {
  variant?: "default" | "add" | "more"
  foodId: string
  foodName: string
  calories: number
  portionSize?: string
  portionWeight: number
  measurementUnit: string
}

export const FoodCard = ({
  variant = "default",
  foodId,
  foodName,
  calories,
  portionSize,
  portionWeight,
  measurementUnit
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
          <Text className="font-tmedium text-lg text-primary">{foodName}</Text>
          <Text className="font-tmedium text-sm text-accent">
            {calories} kcal{portionSize && ` • ${portionSize}`} •{" "}
            {portionWeight}
            {measurementUnit}
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
            onPress={() => console.log("More")}
          />
        ) : null}
      </HStack>
    </Card>
  )
}
