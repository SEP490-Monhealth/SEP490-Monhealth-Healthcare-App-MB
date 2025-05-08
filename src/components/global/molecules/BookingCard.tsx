import React from "react"

import { Linking, Text, View } from "react-native"

import { Calendar2, Timer1 } from "iconsax-react-native"

import { COLORS } from "@/constants/color"
import {
  BookingStatusEnum,
  getBookingStatusMeta
} from "@/constants/enum/Booking"

import { formatDate } from "@/utils/formatters"

import { Badge, Card, CardHeader, HStack, VStack } from "../atoms"
import { MeetingCard } from "./MeetingCard"

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
  meetingUrl?: string
  notes?: string
  isReviewed?: boolean
  rating?: number
  comment?: string
  cancellationReason?: string
  onPress?: () => void
  status: BookingStatusEnum
}

export const BookingCard = ({
  variant = "default",
  name,
  date,
  startTime,
  endTime,
  meetingUrl,
  notes,
  isReviewed,
  rating,
  comment,
  cancellationReason,
  status,
  onPress
}: BookingCardProps) => {
  const { label: bookingStatusLabel, color: bookingStatusColor } =
    getBookingStatusMeta(status)

  const handleViewMeetingUrl = () => {
    if (meetingUrl) {
      Linking.openURL(meetingUrl)
    }
  }

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

          <Text
            className="mt-1 font-tmedium text-sm text-accent"
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            Ghi chú: {notes}
          </Text>
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

        {meetingUrl && (
          <MeetingCard meetingUrl={meetingUrl} onPress={handleViewMeetingUrl} />
        )}

        {cancellationReason && (
          <Text className="font-tmedium text-sm text-accent">
            Lý do hủy: {cancellationReason}
          </Text>
        )}

        {/* {isReviewed && rating && comment && (
          <View className="flex-1 gap-2">
            <HStack center>
              {Array.from({ length: 5 })
                .map((_, index) => {
                  const starValue = index + 1

                  if (rating >= starValue) {
                    return (
                      <Fontisto
                        name="star"
                        key={index}
                        size={14}
                        fill={COLORS.PRIMARY.lemon}
                        color={COLORS.PRIMARY.lemon}
                      />
                    )
                  }
                  return null
                })
                .filter(Boolean)}
            </HStack>

            <Text className="font-tmedium text-sm text-accent">{comment}</Text>
          </View>
        )} */}
      </VStack>
    </Card>
  )
}
