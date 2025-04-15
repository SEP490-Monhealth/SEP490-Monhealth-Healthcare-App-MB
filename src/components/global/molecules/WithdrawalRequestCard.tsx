import React from "react"

import { Image, Text, TouchableOpacity, View } from "react-native"

import {
  WithdrawalRequestStatusEnum,
  getWithdrawalRequestStatusMeta
} from "@/constants/enum/WithdrawalRequest"

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

  const { date, time: timestamp } = formatDateTime(time)

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
          {date} • {timestamp}
        </Text>
      </View>

      <VStack gap={4} className="items-end">
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
