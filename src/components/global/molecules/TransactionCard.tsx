import React from "react"

import { Image, Text, TouchableOpacity, View } from "react-native"

import {
  TransactionStatusEnum,
  TransactionTypeEnum,
  getTransactionStatusMeta,
  getTransactionTypeMeta
} from "@/constants/enum/Transaction"

import { formatCurrency } from "@/utils/formatters"

import { Card, VStack } from "../atoms"

const formatDateTime = (isoString: string) => {
  if (!isoString) return { date: "", time: "" }

  const dateObj = new Date(isoString)

  const localDateObj = new Date(dateObj.getTime() + 7 * 60 * 60 * 1000)

  const utcDate = localDateObj.toISOString().split("T")[0]
  const utcTime = localDateObj.toISOString().split("T")[1].slice(0, 5)

  const [year, month, day] = utcDate.split("-")
  const formattedDate = `${day}/${month}/${year}`

  const formattedTime = utcTime.replace(":", "h")

  return { date: formattedDate, time: formattedTime }
}

interface TransactionCardProps {
  type: TransactionTypeEnum
  datetime: string
  amount: number
  showStatus?: boolean
  status: TransactionStatusEnum
}

export const TransactionCard = ({
  type,
  datetime,
  amount,
  showStatus = false,
  status
}: TransactionCardProps) => {
  const { label: transactionTypeLabel, icon: transactionTypeIcon } =
    getTransactionTypeMeta(type)
  const { label: transactionStatusLabel, color: transactionStatusColor } =
    getTransactionStatusMeta(status)

  const { date, time } = formatDateTime(datetime)

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
            require("../../../../public/icons/transactions/income.png")
          }
          style={{ width: 24, height: 24 }}
        />
      </TouchableOpacity>

      <View className="flex-1">
        <Text className="font-tmedium text-base text-primary">
          {transactionTypeLabel}
        </Text>

        <Text className="font-tmedium text-sm text-accent">
          {time} • {date}
        </Text>
      </View>

      <VStack gap={4} className="items-end">
        <Text className="font-tmedium text-sm text-primary">
          {isPositiveTransaction ? "+" : "-"}
          {formatCurrency(amount)}
        </Text>

        {showStatus && (
          <Text className="font-tregular text-sm text-accent">
            {transactionStatusLabel}
          </Text>
        )}
      </VStack>
    </Card>
  )
}
