import React from "react"

import { Linking, Text, View } from "react-native"

import { Calendar2, Timer1 } from "iconsax-react-native"
import { Star } from "lucide-react-native"

import { COLORS } from "@/constants/color"
import {
  BookingStatusEnum,
  getBookingStatusMeta
} from "@/constants/enum/Booking"

import { formatDate } from "@/utils/formatters"

import { Badge, Button, Card, CardHeader, HStack, VStack } from "../atoms"
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
  isReported?: boolean
  status: BookingStatusEnum
  cancellationReason?: string
  onPress?: () => void
  onCompletePress?: () => void
  onCancelPress?: () => void
  onReviewPress?: () => void
  onReportPress?: () => void
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
  isReported,
  status,
  cancellationReason,
  onPress,
  onCompletePress,
  onCancelPress,
  onReviewPress,
  onReportPress
}: BookingCardProps) => {
  // const today = new Date()
  // const bookingDate = new Date(date)

  // const isBookingEnded = () => {
  //   if (
  //     bookingDate.getDate() < today.getDate() ||
  //     bookingDate.getMonth() < today.getMonth() ||
  //     bookingDate.getFullYear() < today.getFullYear()
  //   ) {
  //     return true
  //   }

  //   if (
  //     bookingDate.getDate() === today.getDate() &&
  //     bookingDate.getMonth() === today.getMonth() &&
  //     bookingDate.getFullYear() === today.getFullYear()
  //   ) {
  //     const [endHour, endMinute] = endTime.split(":").map(Number)
  //     const currentHour = today.getHours()
  //     const currentMinute = today.getMinutes()

  //     return (
  //       currentHour > endHour ||
  //       (currentHour === endHour && currentMinute >= endMinute)
  //     )
  //   }

  //   return false
  // }

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
              label={!isReported ? bookingStatusLabel : "Đã báo cáo"}
              background={!isReported ? bookingStatusColor : COLORS.destructive}
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
          <HStack center gap={6}>
            <Text className="font-tmedium text-sm text-accent">Lý do hủy:</Text>
            <Text className="font-tmedium text-sm text-accent">
              {cancellationReason}
            </Text>
          </HStack>
        )}

        {isReviewed && rating && comment && (
          <View className="flex-1 gap-2">
            <HStack center>
              {Array.from({ length: 5 })
                .map((_, index) => {
                  const starValue = index + 1

                  if (rating >= starValue) {
                    return (
                      <Star
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
        )}

        {variant === "member" && status === BookingStatusEnum.Booked && (
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
          !isReviewed && (
            <HStack gap={16}>
              <Button
                variant="danger"
                size="sm"
                onPress={onReportPress}
                className="flex-1"
              >
                Báo cáo
              </Button>

              <Button size="sm" onPress={onReviewPress} className="flex-1">
                Phản hồi
              </Button>
            </HStack>
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

        {variant === "consultant" && status === BookingStatusEnum.Booked && (
          <Button
            variant="primary"
            size="sm"
            onPress={onCompletePress}
            className="flex-1"
          >
            Hoàn thành
          </Button>
        )}

        {variant === "consultant" && status === BookingStatusEnum.Cancelled && (
          <Button
            variant="danger"
            size="sm"
            onPress={onCompletePress}
            className="flex-1"
          >
            Đã hủy
          </Button>
        )}
      </VStack>
    </Card>
  )
}
