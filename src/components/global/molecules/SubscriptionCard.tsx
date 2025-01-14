import React from "react"

import { Text } from "react-native"

import { formatCurrency } from "@/utils/helpers"

import { Card, HStack, VStack } from "../atoms"

interface SubscriptionCardProps {
  name: string
  price: number
  discount: number
  time: number
  isSelected?: boolean
  onPress?: () => void
}

export const SubscriptionCard = ({
  name,
  price,
  discount,
  time,
  isSelected,
  onPress
}: SubscriptionCardProps) => {
  return (
    <Card
      className={`rounded-2xl border-2 ${
        isSelected ? "border-primary" : "border-border"
      }`}
      onPress={onPress}
    >
      <HStack className="w-full items-center justify-between">
        <Text className="font-tmedium text-lg text-primary">{name}</Text>

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
            <Text className="font-tregular text-base text-accent">
              {time} tháng
            </Text>
          </HStack>
        </VStack>
      </HStack>
    </Card>
  )
}
