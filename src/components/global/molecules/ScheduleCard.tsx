import React from "react"

import { Text, View } from "react-native"

import { COLORS } from "@/constants/color"
import { BookingStatusEnum } from "@/constants/enum/BookingStatus"

import { getBookingIcon } from "@/utils/helpers"

import { Card, VStack } from "../atoms"
import { IconButton } from "./IconButton"

interface ScheduleCardProps {
  startTime: string
  endTime?: string | null
  customer: string
  status: BookingStatusEnum
  notes?: string
  onPress?: () => void
}

export const ScheduleCard = ({
  startTime,
  endTime,
  customer,
  status,
  notes,
  onPress
}: ScheduleCardProps) => {
  const BookingIcon = getBookingIcon(status)

  return (
    <View className="flex-1 flex-row gap-4">
      <VStack center>
        {BookingIcon && (
          <IconButton
            icon={
              <BookingIcon variant="Bold" size={24} color={COLORS.primary} />
            }
          />
        )}

        <View className="h-24 rounded-lg bg-border" style={{ width: 3 }} />
      </VStack>

      <View className="flex-1 flex-col gap-2">
        <Text className="ml-2 mt-3 font-tmedium text-base text-primary">
          {startTime}
          {endTime && ` - ${endTime}`}
        </Text>

        <Card onPress={onPress}>
          <Text className="font-tmedium text-lg text-primary">{customer}</Text>

          <Text
            className="font-tregular text-sm text-accent"
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {notes}
          </Text>
        </Card>
      </View>
    </View>
  )
}
