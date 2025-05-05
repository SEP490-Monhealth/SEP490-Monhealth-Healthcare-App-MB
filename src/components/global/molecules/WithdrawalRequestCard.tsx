import React from "react"

import { Image, Text, TouchableOpacity, View } from "react-native"

import {
  WithdrawalRequestStatusEnum,
  getWithdrawalRequestStatusMeta
} from "@/constants/enum/WithdrawalRequest"

import { formatCurrency } from "@/utils/formatters"

import { Card, HStack } from "../atoms"

interface WithdrawalRequestCardProps {
  description: string
  amount: number
  reason?: string | null
  status: WithdrawalRequestStatusEnum
  onPress?: () => void
}

export const WithdrawalRequestCard = ({
  description,
  amount,
  reason,
  status,
  onPress
}: WithdrawalRequestCardProps) => {
  const { label: withdrawalRequestStatusLabel } =
    getWithdrawalRequestStatusMeta(status)

  return (
    <Card className="flex-col gap-2" onPress={onPress}>
      <View className="flex-row items-center justify-between">
        <TouchableOpacity
          activeOpacity={1}
          className="mr-4 h-12 w-12 items-center justify-center rounded-full bg-muted"
        >
          <Image
            source={require("../../../../public/icons/withdrawal.png")}
            style={{ width: 24, height: 24 }}
          />
        </TouchableOpacity>

        <View className="flex-1 flex-col">
          <HStack center className="justify-between">
            <Text className="font-tmedium text-base text-primary">
              {formatCurrency(amount)}
            </Text>

            <Text className="font-tregular text-sm text-accent">
              {withdrawalRequestStatusLabel}
            </Text>
          </HStack>

          <Text className="font-tmedium text-sm text-accent">
            {description}
          </Text>
        </View>
      </View>

      {reason && (
        <>
          <View className="border border-border" />

          <Text className="font-tmedium text-sm text-accent">
            Lý do: {reason}
          </Text>
        </>
      )}
    </Card>
  )
}
