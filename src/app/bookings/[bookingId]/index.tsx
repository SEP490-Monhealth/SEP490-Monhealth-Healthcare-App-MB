import React from "react"

import { Image, Text, View } from "react-native"

import { useLocalSearchParams } from "expo-router"

import { LoadingScreen } from "@/app/loading"
import { Calendar, Clock, Zoom } from "iconsax-react-native"
import { Star } from "lucide-react-native"

import {
  Card,
  Container,
  Content,
  HStack,
  Input,
  ScrollArea,
  VStack
} from "@/components/global/atoms"
import { BookingItem, RatingStars } from "@/components/global/molecules"
import { Header, Section } from "@/components/global/organisms"

import { COLORS } from "@/constants/color"
import { BookingStatusEnum } from "@/constants/enum/Booking"

import { useAuth } from "@/contexts/AuthContext"

import {
  useGetBookingById,
  useGetBookingsByUserIdAndConsultantId
} from "@/hooks/useBooking"
import { useGetConsultantById } from "@/hooks/useConsultant"

import { formatDate, formatUrl } from "@/utils/formatters"
import { getInitials } from "@/utils/helpers"

const formatTime = (time: string) => {
  const [hour, minute] = time.split(":")
  return `${hour}h${minute}`
}

const BookingDetailsScreen = () => {
  const { bookingId } = useLocalSearchParams<{ bookingId: string }>()

  const { user } = useAuth()
  const userId = user?.userId

  const { data: bookingData } = useGetBookingById(bookingId)

  const { data: consultantData } = useGetConsultantById(
    bookingData?.consultantId
  )

  const { data: bookingsData } = useGetBookingsByUserIdAndConsultantId(
    bookingData?.userId,
    bookingData?.consultantId
  )

  const bookingsCount = bookingsData?.length || 0

  if (!bookingData || !consultantData) {
    return <LoadingScreen />
  }

  const bookingItems = [
    {
      icon: <Calendar variant="Bold" size={20} color={COLORS.primary} />,
      label: "Ngày",
      value: formatDate(bookingData.date)
    },
    {
      icon: <Clock variant="Bold" size={20} color={COLORS.primary} />,
      label: "Thời gian",
      value: `${formatTime(bookingData.startTime)} - ${formatTime(
        bookingData.endTime
      )}`
    },
    {
      icon: <Zoom variant="Bold" size={20} color={COLORS.primary} />,
      label: "Link phòng họp",
      value: formatUrl(bookingData.meetingUrl || "")
    }
  ]

  const renderReviewStars = () => {
    const rating = bookingData.review?.rating

    if (!rating) {
      return (
        <Text className="font-tregular text-base text-primary">
          Chưa có đánh giá
        </Text>
      )
    }

    return (
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
    )
  }

  const { label: bookingStatusLabel, color: bookingStatusColor } =
    getBookingStatusMeta(bookingData.status)

  return (
    <Container>
      <Header back label="Lịch hẹn" />

      <ScrollArea>
        <Content className="mt-2 pb-12">
          <HStack className="justify-between">
            <Text className="font-tbold text-xl text-primary">
              Trạng thái lịch hẹn
            </Text>

            <Badge
              label={bookingStatusLabel}
              background={bookingStatusColor}
              color="#fff"
              rounded
            />
          </HStack>

          <View>
            <Section
              label={
                userId === bookingData.userId
                  ? "Chuyên viên tư vấn"
                  : "Người đặt lịch"
              }
            />

            {userId === bookingData.userId ? (
              <HStack center gap={20}>
                {consultantData.avatarUrl ? (
                  <Image
                    source={{ uri: consultantData.avatarUrl }}
                    className="h-24 w-24 rounded-2xl border border-border"
                  />
                ) : (
                  <View className="flex h-24 w-24 items-center justify-center rounded-xl border border-muted bg-border">
                    <Text className="font-tbold text-lg text-primary">
                      {getInitials(consultantData.fullName)}
                    </Text>
                  </View>
                )}

                <VStack gap={8}>
                  <View>
                    <Text className="font-tbold text-2xl text-primary">
                      {consultantData.fullName}
                    </Text>

                    <Text className="font-tmedium text-base text-accent">
                      {consultantData.expertise} • KN{" "}
                      {consultantData.experience} năm
                    </Text>
                  </View>

                  <RatingStars
                    rating={consultantData.averageRating}
                    count={consultantData.ratingCount}
                    showCount
                  />
                </VStack>
              </HStack>
            ) : (
              <HStack center gap={20}>
                {bookingData.member?.avatarUrl ? (
                  <Image
                    source={{ uri: bookingData.member.avatarUrl }}
                    className="h-24 w-24 rounded-2xl border border-border"
                  />
                ) : (
                  <View className="flex h-24 w-24 items-center justify-center rounded-xl border border-muted bg-border">
                    <Text className="font-tbold text-lg text-primary">
                      {getInitials(bookingData.member?.fullName || "")}
                    </Text>
                  </View>
                )}

                <VStack gap={8}>
                  <View>
                    <Text className="font-tbold text-2xl text-primary">
                      {bookingData.member?.fullName || ""}
                    </Text>

                    <Text className="font-tmedium text-base text-accent">
                      {bookingsCount} lần đặt lịch hẹn
                    </Text>
                  </View>
                </VStack>
              </HStack>
            )}
          </View>

          <View>
            <Section label="Chi tiết lịch hẹn" />

            <Card>
              {bookingItems.map((item, index) => (
                <BookingItem
                  key={index}
                  icon={item.icon}
                  label={item.label}
                  value={item.value}
                />
              ))}
            </Card>
          </View>

          <View>
            <Section label="Ghi chú" />

            <Input
              disabled
              value={bookingData.notes}
              isMultiline
              numberOfLines={6}
            />
          </View>

          {bookingData.cancellationReason && (
            <View>
              <Section label="Lý do hủy" />

              <Input
                disabled
                value={bookingData.cancellationReason}
                isMultiline
                numberOfLines={2}
              />
            </View>
          )}

          <View>
            <Section label="Hình ảnh" />

            <View className="flex-row flex-wrap gap-2">
              {bookingData.status === BookingStatusEnum.Completed &&
              bookingData.evidenceUrls &&
              bookingData.evidenceUrls.length > 0 ? (
                bookingData.evidenceUrls.map((uri, index) => (
                  <View key={index} className="h-28 w-28">
                    <Image
                      source={{ uri }}
                      resizeMode="cover"
                      className="h-full w-full rounded-lg"
                    />
                  </View>
                ))
              ) : (
                <Text className="ml-1 font-tregular text-sm text-accent">
                  Chuyên viên tư vấn phải hoàn thành lịch hẹn và đính kèm hình
                  ảnh
                </Text>
              )}
            </View>
          </View>

          {bookingData.isReviewed && (
            <View>
              <Section label="Đánh giá" action={renderReviewStars()} />
              <Input
                disabled
                value={bookingData.review?.comment || ""}
                isMultiline
                numberOfLines={4}
              />
            </View>
          )}
        </Content>
      </ScrollArea>
    </Container>
  )
}

export default BookingDetailsScreen
