import React from "react"

import { Image, Text, TouchableOpacity, View } from "react-native"

import {
  WithdrawalRequestStatusEnum,
  getWithdrawalRequestStatusMeta
} from "@/constants/enum/WithdrawalRequest"

import { formatCurrency } from "@/utils/formatters"

import { Card } from "../atoms"

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
  time?: string
  reason?: string | null
  status: WithdrawalRequestStatusEnum
  onPress?: () => void
}

export const WithdrawalRequestCard = ({
  description,
  amount,
  time,
  reason,
  status,
  onPress
}: WithdrawalRequestCardProps) => {
  const { label: withdrawalRequestStatusLabel } =
    getWithdrawalRequestStatusMeta(status)

  const { date, time: timestamp } = formatDateTime(time || "")

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

        <View className="flex-1">
          <Text className="font-tmedium text-base text-primary">
            {description}
          </Text>

          <Text className="font-tmedium text-sm text-accent">
            {time ? `${date} • ${timestamp}` : formatCurrency(amount)}
          </Text>
        </View>

        <Text className="font-tregular text-sm text-accent">
          {withdrawalRequestStatusLabel}
        </Text>
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
