import React from "react"

import { Text, View } from "react-native"

import { Calendar2, Timer1 } from "iconsax-react-native"

import { COLORS } from "@/constants/color"
import {
  BookingStatusEnum,
  getBookingStatusMeta
} from "@/constants/enum/Booking"

import { formatDate } from "@/utils/formatters"

import { Badge, Button, Card, CardHeader, HStack, VStack } from "../atoms"

const formatTime = (time: string): string => {
  if (!time) return ""

  const [hours, minutes] = time.split(":")
  return `${parseInt(hours, 10)}h${minutes}`
}

interface BookingCardProps {
  variant?: "default" | "member" | "consultant"
  name: string
  date: string
  startTime: string
  endTime: string
  notes?: string
  reviewed?: boolean
  status: BookingStatusEnum
  cancellationReason?: string
  onPress?: () => void
  onConfirmPress?: () => void
  onCompletePress?: () => void
  onCancelPress?: () => void
  onReviewPress?: () => void
}

export const BookingCard = ({
  variant = "default",
  name,
  date,
  startTime,
  endTime,
  notes,
  reviewed,
  status,
  cancellationReason,
  onPress,
  onConfirmPress,
  onCompletePress,
  onCancelPress,
  onReviewPress
}: BookingCardProps) => {
  const { label: bookingStatusLabel, color: bookingStatusColor } =
    getBookingStatusMeta(status)

  return (
    <Card onPress={onPress}>
      <VStack gap={12}>
        <VStack>
          <HStack center className="justify-between">
            <CardHeader label={name} />

            <Badge
              label={bookingStatusLabel}
              background={bookingStatusColor}
              color="#fff"
              rounded
            />
          </HStack>

          {variant !== "default" && (
            <Text
              className="mt-1 font-tmedium text-sm text-accent"
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {status === BookingStatusEnum.Cancelled
                ? `Lý do hủy: ${cancellationReason}`
                : `Ghi chú: ${notes}`}
            </Text>
          )}
        </VStack>

        {variant !== "default" && <View className="border border-border" />}

        <HStack center className="justify-between">
          <HStack center gap={6}>
            <Calendar2 variant="Bold" size={20} color={COLORS.accent} />
            <Text className="font-tmedium text-sm text-accent">
              {formatDate(date)}
            </Text>
          </HStack>

          <HStack center gap={6}>
            <Timer1 variant="Bold" size={20} color={COLORS.accent} />
            <Text className="font-tmedium text-sm text-accent">
              {formatTime(startTime)} - {formatTime(endTime)}
            </Text>
          </HStack>
        </HStack>

        {variant === "member" && status === BookingStatusEnum.Pending && (
          <Button
            variant="danger"
            size="sm"
            onPress={onCancelPress}
            className="flex-1"
          >
            Hủy
          </Button>
        )}

        {variant === "member" &&
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

        {/* {variant === "consultant" && status === BookingStatusEnum.Pending && (
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
        )} */}

        {variant === "consultant" && status === BookingStatusEnum.Pending && (
          <Button
            variant="primary"
            size="sm"
            onPress={onCompletePress}
            className="flex-1"
          >
            Hoàn thành
          </Button>
        )}
      </VStack>
    </Card>
  )
}
