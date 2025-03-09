import React from "react"

import { Text, View } from "react-native"

import { CalendarCircle, TimerStart } from "iconsax-react-native"

import { COLORS } from "@/constants/color"
import { BookingStatusEnum } from "@/constants/enum/BookingStatus"

import { formatDate } from "@/utils/formatters"
import { getBookingColor, getBookingLabel } from "@/utils/helpers"

import { Badge, Button, Card, CardHeader, HStack, VStack } from "../atoms"

interface BookingCardProps {
  variant?: "default" | "consultant"
  name: string
  date: string
  time: string
  status: number
  notes?: string
  onPress?: () => void
  onConfirmPress?: () => void
  onCancelPress?: () => void
  onReviewPress?: () => void
}

export const BookingCard = ({
  variant = "default",
  name,
  date,
  time,
  status,
  notes,
  onPress,
  onConfirmPress,
  onCancelPress,
  onReviewPress
}: BookingCardProps) => {
  return (
    <Card onPress={onPress}>
      <VStack gap={12}>
        <VStack>
          <HStack center className="justify-between">
            <CardHeader label={name} />

            <Badge
              label={getBookingLabel(status)}
              background={getBookingColor(status)}
              color="#fff"
              rounded
            />
          </HStack>
          <Text
            className="font-tmedium text-sm text-accent"
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {notes}
          </Text>
        </VStack>

        <View className="border border-border"></View>

        <HStack center className="justify-between">
          <HStack center>
            <CalendarCircle variant="Bold" size="20" color={COLORS.secondary} />
            <Text className="font-tmedium text-sm text-accent">
              {formatDate(date)}
            </Text>
          </HStack>

          <HStack center>
            <TimerStart variant="Bold" size="20" color={COLORS.secondary} />
            <Text className="font-tmedium text-sm text-accent">{time}</Text>
          </HStack>
        </HStack>

        {status === BookingStatusEnum.Pending && (
          <Button
            variant="danger"
            size="sm"
            onPress={onCancelPress}
            className="flex-1"
          >
            Hủy
          </Button>
        )}

        {variant === "consultant" && status === BookingStatusEnum.Pending && (
          <HStack gap={16}>
            <Button
              variant="danger"
              size="sm"
              onPress={onCancelPress}
              className="flex-1"
            >
              Hủy
            </Button>
            <Button size="sm" onPress={onConfirmPress} className="flex-1">
              Xác nhận
            </Button>
          </HStack>
        )}

        {status === BookingStatusEnum.Completed && (
          <Button
            variant="primary"
            size="sm"
            onPress={onReviewPress}
            className="flex-1"
          >
            Phản hồi
          </Button>
        )}
      </VStack>
    </Card>
  )
}
