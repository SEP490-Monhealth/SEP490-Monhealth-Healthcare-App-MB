import React from "react"

import { Image, Text, TouchableOpacity, View } from "react-native"

import {
  ScheduleExceptionStatusEnum,
  getScheduleExceptionStatusMeta
} from "@/constants/enum/Schedule"

import { formatDate } from "@/utils/formatters"

import { Card, VStack } from "../atoms"

interface ScheduleExceptionCardProps {
  date: string
  reason: string
  status: ScheduleExceptionStatusEnum
  onPress?: () => void
}

export const ScheduleExceptionCard = ({
  date,
  reason,
  status,
  onPress
}: ScheduleExceptionCardProps) => {
  const { label: scheduleExceptionStatusLabel } =
    getScheduleExceptionStatusMeta(status)

  return (
    <Card
      className="flex-row items-center justify-between gap-4"
      onPress={onPress}
    >
      <View className="flex flex-1 flex-row items-center">
        <TouchableOpacity
          activeOpacity={1}
          className="mr-4 h-12 w-12 items-center justify-center rounded-full bg-muted"
        >
          <Image
            source={require("../../../../public/icons/schedule-exception.png")}
            style={{ width: 24, height: 24 }}
          />
        </TouchableOpacity>

        <View className="flex-1">
          <Text className="font-tmedium text-base text-primary">
            {formatDate(date)}
          </Text>

          <Text
            className="mt-1 text-justify font-tregular text-sm text-accent"
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {reason}
          </Text>
        </View>
      </View>

      <VStack className="items-end">
        <Text className="font-tregular text-sm text-accent">
          {scheduleExceptionStatusLabel}
        </Text>
      </VStack>
    </Card>
  )
}
