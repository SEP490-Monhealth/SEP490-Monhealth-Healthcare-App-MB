import React from "react"

import { Text, View } from "react-native"

import { COLORS } from "@/constants/color"
import {
  BookingStatusEnum,
  getBookingStatusMeta
} from "@/constants/enum/Booking"

import { Badge, Card, CardHeader, HStack, VStack } from "../atoms"
import { IconButton } from "./IconButton"

const formatTime = (time: string): string => {
  if (!time) return ""

  const [hours, minutes] = time.split(":")
  return `${parseInt(hours, 10)}h${minutes}`
}

interface ScheduleCardProps {
  member: string
  startTime: string
  endTime: string
  notes?: string
  status: BookingStatusEnum
  onPress?: () => void
}

export const ScheduleCard = ({
  member,
  startTime,
  endTime,
  notes,
  status,
  onPress
}: ScheduleCardProps) => {
  const {
    label: bookingStatusLabel,
    icon: bookingStatusIcon,
    color: bookingStatusColor
  } = getBookingStatusMeta(status)

  const BookingIcon = bookingStatusIcon

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
        <HStack center className="mr-1 justify-between">
          <Text className="ml-2 font-tmedium text-base text-primary">
            {formatTime(startTime)} - {formatTime(endTime)}
          </Text>

          <Badge
            label={bookingStatusLabel}
            background={bookingStatusColor}
            color="#fff"
            rounded
          />
        </HStack>

        <Card onPress={onPress}>
          <CardHeader label={member} />

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
