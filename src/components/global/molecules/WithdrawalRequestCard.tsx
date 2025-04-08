import React from "react"

import { Image, Text, TouchableOpacity, View } from "react-native"

import {
  WithdrawalRequestStatusEnum,
  getWithdrawalRequestStatusMeta
} from "@/constants/enum/WithdrawalRequest"

import { formatCurrency, formatDateTime } from "@/utils/formatters"

import { Card, VStack } from "../atoms"

interface WithdrawalRequestCardProps {
  description: string
  amount: number
  time: string
  status: WithdrawalRequestStatusEnum
}

export const WithdrawalRequestCard = ({
  description,
  amount,
  time,
  status
}: WithdrawalRequestCardProps) => {
  const { label: withdrawalRequestStatusLabel } =
    getWithdrawalRequestStatusMeta(status)

  return (
    <Card className="flex-row items-center justify-between">
      <TouchableOpacity
        activeOpacity={1}
        className="mr-4 h-12 w-12 items-center justify-center rounded-full bg-muted"
      >
        <Image
          source={require("../../../../public/icons/transactions/donate.png")}
          style={{ width: 24, height: 24 }}
        />
      </TouchableOpacity>

      <View className="flex-1">
        <Text className="font-tmedium text-base text-primary">
          {description}
        </Text>

        <Text className="font-tmedium text-sm text-accent">
          {formatDateTime(time)}
        </Text>
      </View>

      <VStack center gap={4}>
        <Text className="font-tmedium text-sm text-primary">
          {formatCurrency(amount)}
        </Text>

        <Text className="font-tregular text-sm text-accent">
          {withdrawalRequestStatusLabel}
        </Text>
      </VStack>
    </Card>
  )
}
