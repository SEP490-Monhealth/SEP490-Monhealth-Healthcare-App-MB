import React from "react"

import { Image, Text, TouchableOpacity, View } from "react-native"

import { WithdrawalRequestStatusEnum } from "@/constants/enum/WithdrawalRequest"

import { formatCurrency } from "@/utils/formatters"

import { Card } from "../atoms"

interface WithdrawalRequestCardProps {
  description: string
  amount: number
  status: WithdrawalRequestStatusEnum
}

export const WithdrawalRequestCard = ({
  description,
  amount,
  status
}: WithdrawalRequestCardProps) => {
  return (
    <Card className="flex-row items-center justify-between">
      <TouchableOpacity
        activeOpacity={1}
        className="mr-4 h-12 w-12 items-center justify-center rounded-full bg-muted"
      >
        <Image
          source={require("../../../../public/icons/transactions/money.png")}
          style={{ width: 24, height: 24 }}
        />
      </TouchableOpacity>

      <View className="flex-1">
        <Text className="font-tmedium text-base text-primary">
          {description}
        </Text>

        <Text className="font-tmedium text-sm text-accent">27/08/2003</Text>
      </View>

      <Text className="font-tmedium text-sm text-primary">
        {formatCurrency(amount)}
      </Text>
    </Card>
  )
}
