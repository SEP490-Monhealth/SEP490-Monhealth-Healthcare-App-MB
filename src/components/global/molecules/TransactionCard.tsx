import React from "react"

import { Image, Text, TouchableOpacity, View } from "react-native"

import {
  TransactionStatusEnum,
  TransactionTypeEnum,
  getTransactionStatusMeta,
  getTransactionTypeMeta
} from "@/constants/enum/Transaction"

import { formatCurrency } from "@/utils/formatters"

import { Card } from "../atoms"

interface TransactionCardProps {
  type: TransactionTypeEnum
  description?: string
  amount: number
  status: TransactionStatusEnum
}

export const TransactionCard = ({
  type,
  description,
  amount,
  status
}: TransactionCardProps) => {
  const { label: transactionTypeLabel, icon: transactionTypeIcon } =
    getTransactionTypeMeta(type)
  const { label: transactionStatusLabel } = getTransactionStatusMeta(status)

  // console.log(time)

  const isPositiveTransaction = [
    TransactionTypeEnum.Earning,
    TransactionTypeEnum.Refund,
    TransactionTypeEnum.Bonus
  ].includes(type)

  return (
    <Card className="flex-row items-center justify-between">
      <TouchableOpacity
        activeOpacity={1}
        className="mr-4 h-12 w-12 items-center justify-center rounded-full bg-muted"
      >
        <Image
          source={
            transactionTypeIcon ||
            require("../../../../public/icons/income.png")
          }
          style={{ width: 24, height: 24 }}
        />
      </TouchableOpacity>

      <View className="flex-1">
        <Text className="font-tmedium text-base text-primary">
          {description ? description : transactionTypeLabel}
        </Text>

        <Text className="font-tmedium text-sm text-accent">
          {isPositiveTransaction ? "+" : "-"}
          {formatCurrency(amount)}
        </Text>
      </View>

      <Text className="font-tregular text-sm text-accent">
        {transactionStatusLabel}
      </Text>
    </Card>
  )
}
