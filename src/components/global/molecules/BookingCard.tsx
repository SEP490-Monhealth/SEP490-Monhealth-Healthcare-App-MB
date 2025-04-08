import React from "react"

import { Text, View } from "react-native"

import { CalendarCircle, TimerStart } from "iconsax-react-native"

import { COLORS } from "@/constants/color"
import { BookingStatusEnum } from "@/constants/enum/Booking"

import { formatDate, formatTime } from "@/utils/formatters"
import { getBookingColor, getBookingLabel } from "@/utils/helpers"

import { Badge, Button, Card, CardHeader, HStack, VStack } from "../atoms"

interface BookingCardProps {
  variant?: "default" | "consultant"
  name: string
  date: string
  notes?: string
  reviewed?: boolean
  status: BookingStatusEnum
  cancellationReason?: string
  onConfirmPress?: () => void
  onCompletePress?: () => void
  onCancelPress?: () => void
  onReviewPress?: () => void
}

export const BookingCard = ({
  variant = "default",
  name,
  date,
  notes,
  reviewed,
  status,
  cancellationReason,
  onConfirmPress,
  onCompletePress,
  onCancelPress,
  onReviewPress
}: BookingCardProps) => {
  return (
    <Card>
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
            className="mt-1 font-tmedium text-sm text-accent"
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {status === BookingStatusEnum.Cancelled
              ? `Lý do hủy: ${cancellationReason}`
              : `Ghi chú: ${notes}`}
          </Text>
        </VStack>

        <View className="border border-border" />

        <HStack center className="justify-between">
          <HStack center gap={6}>
            <CalendarCircle variant="Bold" size={20} color={COLORS.secondary} />
            <Text className="font-tmedium text-sm text-accent">
              {formatDate(date)}
            </Text>
          </HStack>

          <HStack center gap={6}>
            <TimerStart variant="Bold" size={20} color={COLORS.secondary} />
            <Text className="font-tmedium text-sm text-accent">
              {formatTime(date)}
            </Text>
          </HStack>
        </HStack>

        {variant === "default" && status === BookingStatusEnum.Pending && (
          <Button
            variant="danger"
            size="sm"
            onPress={onCancelPress}
            className="flex-1"
          >
            Hủy
          </Button>
        )}

        {variant === "default" && status === BookingStatusEnum.Confirmed && (
          <Button
            variant="primary"
            size="sm"
            onPress={onCompletePress}
            className="flex-1"
          >
            Hoàn thành
          </Button>
        )}

        {variant === "default" &&
          status === BookingStatusEnum.Completed &&
          !reviewed && (
            <Button
              variant="primary"
              size="sm"
              onPress={onReviewPress}
              className="flex-1"
            >
              Phản hồi
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
      </VStack>
    </Card>
  )
}
