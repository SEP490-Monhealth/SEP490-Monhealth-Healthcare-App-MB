import React from "react"

import { Text, View } from "react-native"

import { CalendarCircle, TimerStart } from "iconsax-react-native"

import { COLORS } from "@/constants/color"

import { formatDateVN, formatTimeAMandPM } from "@/utils/formatters"
import { getStatus, getStatusBookingColor } from "@/utils/helpers"

import { Button, Card, HStack, VStack } from "../atoms"

interface BookingCardProps {
  variant?: "default" | "confirm"
  name: string
  date: string
  time: string
  note: string
  status: number
  onPress?: () => void
  onConfirmPress?: () => void
  onCancelPress?: () => void
}

export const BookingCard = ({
  variant = "default",
  name,
  date,
  time,
  note,
  status,
  onPress,
  onConfirmPress,
  onCancelPress
}: BookingCardProps) => {
  const statusColor = getStatusBookingColor(status)

  return (
    <Card onPress={onPress}>
      <VStack gap={10}>
        <VStack>
          <HStack center className="justify-between">
            <Text className="font-tmedium text-lg text-primary">{name}</Text>

            <View
              className="rounded-xl px-3 py-1"
              style={{ backgroundColor: statusColor }}
            >
              <Text className="font-tregular text-sm text-white">
                {getStatus(status)}
              </Text>
            </View>
          </HStack>
          <Text
            className="font-tmedium text-sm text-accent"
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {note}
          </Text>
        </VStack>

        <View className="mt-2 border border-border"></View>

        <HStack center className="justify-between">
          <HStack center>
            <CalendarCircle variant="Bold" size="20" color={COLORS.secondary} />
            <Text className="font-tmedium text-sm text-accent">
              {formatDateVN(date)}
            </Text>
          </HStack>

          <HStack center>
            <TimerStart variant="Bold" size="20" color={COLORS.secondary} />
            <Text className="font-tmedium text-sm text-accent">
              {formatTimeAMandPM(time)}
            </Text>
          </HStack>
        </HStack>

        {variant === "confirm" && (
          <View className="flex-row justify-between gap-6">
            <Button
              variant="secondary"
              size="md"
              onPress={onCancelPress}
              className="flex-1"
            >
              Hủy
            </Button>
            <Button
              variant="primary"
              size="md"
              onPress={onConfirmPress}
              className="flex-1"
            >
              Xác nhận
            </Button>
          </View>
        )}
      </VStack>
    </Card>
  )
}
