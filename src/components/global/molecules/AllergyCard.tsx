import React from "react"

import { Text } from "react-native"

import { MoreHorizontal } from "lucide-react-native"

import { COLORS } from "@/constants/color"

import { Card, HStack } from "../atoms"
import { IconButton } from "./IconButton"

interface AllergyCardProps {
  variant?: "default" | "more"
  name: string
  isSelected?: boolean
  onPress?: () => void
  onMorePress?: () => void
}

export const AllergyCard = ({
  variant = "default",
  name,
  isSelected,
  onPress,
  onMorePress
}: AllergyCardProps) => {
  return (
    <Card
      className={`rounded-2xl border-2 ${
        isSelected ? "border-primary" : "border-border"
      }`}
      onPress={onPress}
    >
      <HStack className="w-full items-center justify-between">
        <Text className="font-tmedium text-lg text-primary">{name}</Text>

        {variant === "more" && (
          <IconButton
            size="sm"
            icon={<MoreHorizontal size={20} color={COLORS.primary} />}
            onPress={onMorePress}
          />
        )}
      </HStack>
    </Card>
  )
}
