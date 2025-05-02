import React, { useState } from "react"

import {
  Image,
  Linking,
  RefreshControl,
  ScrollView,
  Text,
  View
} from "react-native"

import { useLocalSearchParams, useRouter } from "expo-router"

import { LoadingScreen } from "@/app/loading"
import { Feather } from "@expo/vector-icons"
import { Calendar, Clock, Zoom } from "iconsax-react-native"

import {
  Badge,
  Button,
  Card,
  Container,
  Content,
  HStack,
  Input,
  Modal,
  VStack
} from "@/components/global/atoms"
import { BookingItem, RatingStars } from "@/components/global/molecules"
import { Header, Section } from "@/components/global/organisms"

import { COLORS } from "@/constants/color"
import {
  BookingStatusEnum,
  getBookingStatusMeta
} from "@/constants/enum/Booking"

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
  const router = useRouter()
  const { bookingId } = useLocalSearchParams<{ bookingId: string }>()

  const { user } = useAuth()
  const userId = user?.userId

  const today = new Date()

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
  const [modalType, setModalType] = useState<
    "cancel" | "complete" | "review" | "report" | null
  >(null)
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false)

  const { data: bookingData, refetch } = useGetBookingById(bookingId)
  const { data: consultantData } = useGetConsultantById(
    bookingData?.consultantId
  )
  const { data: bookingsData } = useGetBookingsByUserIdAndConsultantId(
    bookingData?.userId,
    bookingData?.consultantId
  )

  if (!bookingData || !consultantData) {
    return <LoadingScreen />
  }

  const bookingsCount = bookingsData?.length || 0
  const bookingDate = new Date(bookingData.date)

  const isBookingEnded = () => {
    if (
      bookingDate.getDate() < today.getDate() ||
      bookingDate.getMonth() < today.getMonth() ||
      bookingDate.getFullYear() < today.getFullYear()
    ) {
      return true
    }

    if (
      bookingDate.getDate() === today.getDate() &&
      bookingDate.getMonth() === today.getMonth() &&
      bookingDate.getFullYear() === today.getFullYear()
    ) {
      const [endHour, endMinute] = bookingData.endTime.split(":").map(Number)
      const currentHour = today.getHours()
      const currentMinute = today.getMinutes()

      return (
        currentHour > endHour ||
        (currentHour === endHour && currentMinute >= endMinute)
      )
    }

    return false
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
      value: formatUrl(bookingData.meetingUrl)
    }
  ]

  const getModalConfig = () => {
    switch (modalType) {
      case "cancel":
        return {
          title: "Hủy lịch hẹn",
          description: "Bạn có chắc chắn muốn hủy lịch hẹn này không?"
        }
      case "complete":
        return {
          title: "Hoàn thành lịch hẹn",
          description: "Bạn có chắc chắn muốn hoàn thành lịch hẹn này không?"
        }
      case "review":
        return {
          title: "Đánh giá lịch hẹn",
          description: "Bạn có chắc chắn muốn đánh giá lịch hẹn này không?"
        }
      case "report":
        return {
          title: "Báo cáo lịch hẹn",
          description: "Bạn có chắc chắn muốn báo cáo lịch hẹn này không?"
        }
      default:
        return {
          title: "",
          description: ""
        }
    }
  }

  const modalConfig = getModalConfig()

  const renderReviewStars = () => {
    const rating = bookingData.review?.rating

    return (
      <HStack center>
        {Array.from({ length: 5 })
          .map((_, index) => {
            const starValue = index + 1

            if (rating >= starValue) {
              return (
                <Feather
                  key={index}
                  name="star"
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

  const handleCancel = () => {
    setModalType("cancel")
    setIsModalVisible(true)
  }

  const handleComplete = () => {
    setModalType("complete")
    setIsModalVisible(true)
  }

  const handleReview = () => {
    setModalType("review")
    setIsModalVisible(true)
  }

  const handleReport = () => {
    setModalType("report")
    setIsModalVisible(true)
  }

  const handleConfirmAction = () => {
    if (modalType === "cancel") {
      // console.log("Cancel booking")
      router.push(`/bookings/${bookingId}/cancel`)
    } else if (modalType === "complete") {
      // console.log("Complete booking")
      router.push(`/bookings/${bookingId}/complete`)
    } else if (modalType === "review") {
      // console.log("Review booking")
      router.push(`/bookings/${bookingId}/review`)
    } else if (modalType === "report") {
      // console.log("Report booking")
      router.push(`/bookings/${bookingId}/report`)
    }

    setIsModalVisible(false)
    setModalType(null)
  }

  const onRefresh = async () => {
    setIsRefreshing(true)
    await refetch()
    setIsRefreshing(false)
  }

  const canCancelBooking = () => {
    return (
      userId === bookingData.userId &&
      bookingData.status === BookingStatusEnum.Booked
    )
  }

  const canCompleteBooking = () => {
    return (
      userId !== bookingData.userId &&
      bookingData.status === BookingStatusEnum.Booked
    )
  }

  const canReviewOrReportBooking = () => {
    return (
      userId === bookingData.userId &&
      bookingData.status === BookingStatusEnum.Completed
    )
  }

  return (
    <>
      <Container>
        <Header back label="Lịch hẹn" />

        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
          }
        >
          <Content className="mt-2 pb-4">
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
                {bookingItems.map((item, index) => {
                  const isLast = index === bookingItems.length - 1

                  return (
                    <BookingItem
                      key={index}
                      icon={item.icon}
                      label={item.label}
                      value={item.value}
                      showMore={isLast}
                      onPress={
                        isLast && bookingData.meetingUrl
                          ? () => Linking.openURL(bookingData.meetingUrl!)
                          : undefined
                      }
                    />
                  )
                })}
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

            <View className="mt-8">
              {canCancelBooking() && (
                <Button
                  variant="danger"
                  onPress={handleCancel}
                  className="flex-1"
                >
                  Hủy
                </Button>
              )}

              {userId === bookingData.userId &&
                bookingData.status === BookingStatusEnum.Cancelled && (
                  <Button disabled variant="danger" className="flex-1">
                    Đã hủy
                  </Button>
                )}

              {canCompleteBooking() && (
                <Button
                  disabled={
                    isBookingEnded() ||
                    bookingData.status === BookingStatusEnum.Completed
                  }
                  onPress={handleComplete}
                  className="flex-1"
                >
                  {bookingData.status === BookingStatusEnum.Completed
                    ? "Đã hoàn thành"
                    : "Hoàn thành"}
                </Button>
              )}

              {canReviewOrReportBooking() && (
                <Button
                  onPress={handleReview}
                  className="flex-1"
                  disabled={bookingData.isReviewed}
                >
                  {bookingData.isReviewed ? "Đã đánh giá" : "Đánh giá"}
                </Button>
              )}
            </View>
          </Content>
        </ScrollView>
      </Container>

      <Modal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        title={modalConfig.title}
        description={modalConfig.description}
        confirmText="Đồng ý"
        cancelText="Hủy"
        onConfirm={handleConfirmAction}
      />
    </>
  )
}

export default BookingDetailsScreen
