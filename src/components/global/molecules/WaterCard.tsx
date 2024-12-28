import React from "react"

import { Text } from "react-native"

import { MoreHorizontal } from "lucide-react-native"

import { COLORS } from "@/constants/app"

import { Card, HStack, VStack } from "../atoms"
import { IconButton } from "./IconButton"

interface WaterCardProps {
  time: string
  amount: number
  onMorePress?: () => void
}

export const WaterCard = ({ time, amount, onMorePress }: WaterCardProps) => {
  return (
    <Card>
      <HStack className="items-center justify-between">
        <VStack gap={0} className="ml-1">
          <Text className="font-tmedium text-lg text-primary">{time}</Text>
          <Text className="font-tmedium text-sm text-accent">
            {amount ?? 0} ml
          </Text>
        </VStack>

        <IconButton
          size="sm"
          icon={<MoreHorizontal size={20} color={COLORS.primary} />}
          onPress={onMorePress}
        />
      </HStack>
    </Card>
  )
}
