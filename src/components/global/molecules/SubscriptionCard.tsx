import React from "react"

import { Text } from "react-native"

import { formatCurrency } from "@/utils/formatters"

import { Card, HStack, VStack } from "../atoms"

interface SubscriptionCardProps {
  name: string
  price: number
  durationDays: number
  maxBookings: number
  isSelected?: boolean
  onPress?: () => void
}

export const SubscriptionCard = ({
  name,
  price,
  durationDays,
  maxBookings,
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
        <VStack>
          <Text className="font-tmedium text-lg text-primary">{name}</Text>

          <Text className="font-tregular text-base text-accent">
            {durationDays !== 0
              ? `1 tháng (${durationDays} ngày)`
              : "Dành cho tất cả người dùng"}
          </Text>
        </VStack>

        <VStack className="items-end">
          <Text className="font-tmedium text-lg text-primary">
            {price !== 0 ? `${formatCurrency(price)}` : "Miễn phí"}
          </Text>

          {maxBookings !== 0 && (
            <Text className="font-tregular text-base text-accent">
              {maxBookings} lần tư vấn
            </Text>
          )}
        </VStack>
      </HStack>
    </Card>
  )
}
