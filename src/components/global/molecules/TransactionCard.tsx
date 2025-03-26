import React from "react"

import { Image, Text, TouchableOpacity, View } from "react-native"

import { ChevronRight } from "lucide-react-native"

import { COLORS } from "@/constants/color"
import {
  TransactionStatusEnum,
  TransactionTypeEnum,
  getTransactionStatusMeta,
  getTransactionTypeMeta
} from "@/constants/enum/Transaction"

import { formatCurrency } from "@/utils/formatters"

import { Card } from "../atoms"

const formatDateTime = (isoString: string) => {
  if (!isoString) return { date: "", time: "" }

  const dateObj = new Date(isoString)

  const utcDate = dateObj.toISOString().split("T")[0]
  const utcTime = dateObj.toISOString().split("T")[1].slice(0, 5)

  const [year, month, day] = utcDate.split("-")
  const formattedDate = `${day}/${month}/${year}`

  const formattedTime = utcTime.replace(":", "h")

  return { date: formattedDate, time: formattedTime }
}

interface TransactionCardProps {
  type: TransactionTypeEnum
  datetime: string
  amount: number
  status: TransactionStatusEnum
}

export const TransactionCard = ({
  type,
  datetime,
  amount,
  status
}: TransactionCardProps) => {
  const { label: transactionTypeLabel } = getTransactionTypeMeta(type)
  const { label: transactionStatusLabel, color: transactionStatusColor } =
    getTransactionStatusMeta(status)

  const { date, time } = formatDateTime(datetime)

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
          source={require("../../../../public/icons/meals/dish.png")}
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

      <Text className="font-tmedium text-sm text-primary">
        {isPositiveTransaction ? "+" : "-"}
        {formatCurrency(amount)}
      </Text>
    </Card>
  )
}
