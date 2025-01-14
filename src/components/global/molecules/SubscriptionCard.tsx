import React from "react"

import { Text } from "react-native"

import { formatCurrency } from "@/utils/helpers"

import { Card, HStack, VStack } from "../atoms"

interface SubscriptionCardProps {
  duration: number
  price: number
  discount: number
  isSelected?: boolean
  onPress?: () => void
}

export const SubscriptionCard = ({
  duration,
  price,
  discount,
  isSelected,
  onPress
}: SubscriptionCardProps) => {
  return (
    <Card
      className={`h-24 justify-center rounded-2xl border-2 ${
        isSelected ? "border-primary" : "border-border"
      }`}
      onPress={onPress}
    >
      <HStack className="w-full items-center justify-between">
        <Text className="font-tmedium text-lg text-primary">
          {duration} tháng
        </Text>

        <VStack className="items-end">
          <Text className="font-tmedium text-lg text-primary">
            {formatCurrency(price)}
          </Text>

          <HStack>
            {discount > 0 && (
              <Text className="font-tregular text-base text-accent">
                (Tiết kiệm {discount}%)
              </Text>
            )}

            <Text className="font-tregular text-base text-accent">/ tháng</Text>
          </HStack>
        </VStack>
      </HStack>
    </Card>
  )
}
