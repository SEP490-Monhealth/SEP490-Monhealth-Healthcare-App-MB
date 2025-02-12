import React from "react"

import { Text } from "react-native"

import { formatCurrency } from "@/utils/formatters"

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
      onPress={onPress}
      className={`rounded-2xl border-2 ${
        isSelected ? "border-primary" : "border-border"
      }`}
    >
      <HStack center className="justify-between">
        <Text className="font-tmedium text-lg text-primary">
          {duration} tháng
        </Text>

        <VStack className="items-end">
          <Text className="font-tmedium text-lg text-primary">
            {formatCurrency((price * (100 - discount)) / 100)}
          </Text>

          <Text className="font-tregular text-base text-accent">
            {discount > 0 && `(Tiết kiệm ${discount}%)`} / tháng
          </Text>
        </VStack>
      </HStack>
    </Card>
  )
}
