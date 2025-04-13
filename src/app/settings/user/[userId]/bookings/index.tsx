import React, { useState } from "react"

import { RefreshControl, ScrollView } from "react-native"

import { useLocalSearchParams, useRouter } from "expo-router"

import { LoadingScreen } from "@/app/loading"

import {
  Container,
  Content,
  Modal,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  VStack
} from "@/components/global/atoms"
import { BookingCard, ErrorDisplay } from "@/components/global/molecules"
import { Header } from "@/components/global/organisms"

import { BookingStatusEnum } from "@/constants/enum/Booking"

import {
  useGetBookingsByUserId,
  useUpdateBookingStatus
} from "@/hooks/useBooking"

function BookingsUserScreen() {
  const router = useRouter()
  const { userId, tab } = useLocalSearchParams<{
    userId: string
    tab: string
  }>()

  const { mutate: updateBookingStatus } = useUpdateBookingStatus()

  const {
    data: bookingsData,
    isLoading,
    refetch
  } = useGetBookingsByUserId(userId)

  const [activeTab, setActiveTab] = useState(tab || "pending")
  const [modalType, setModalType] = useState<"cancel" | "complete">("cancel")
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
  const [selectedBooking, setSelectedBooking] = useState<string | null>(null)
  const [refreshing, setRefreshing] = useState<boolean>(false)

  const filteredBookingsData = bookingsData?.filter((booking) => {
    if (activeTab === "pending") {
      return booking.status === BookingStatusEnum.Pending
    }
    if (activeTab === "ongoing") {
      return booking.status === BookingStatusEnum.Confirmed
    }
    return (
      booking.status === BookingStatusEnum.Completed ||
      booking.status === BookingStatusEnum.Cancelled
    )
  })

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }

  const handleCancel = (bookingId: string) => {
    setSelectedBooking(bookingId)
    setModalType("cancel")
    setIsModalVisible(true)
  }

  const handleComplete = (bookingId: string) => {
    setSelectedBooking(bookingId)
    setModalType("complete")
    setIsModalVisible(true)
  }

  const handleConfirmAction = () => {
    if (selectedBooking) {
      setIsModalVisible(false)

      if (modalType === "cancel") {
        router.push(`/bookings/${selectedBooking}/cancel`)
      } else if (modalType === "complete") {
        updateBookingStatus({ bookingId: selectedBooking })
      }
    }
    setSelectedBooking(null)
  }

  const onRefresh = async () => {
    setRefreshing(true)
    await refetch()
    setRefreshing(false)
  }

  const handleReview = (bookingId: string) => {
    router.push(`/bookings/${bookingId}/review`)
  }

  if (!bookingsData || isLoading) {
    return <LoadingScreen />
  }

  return (
    <>
      <Container>
        <Header back label="Lịch hẹn" />

        <Content className="mt-2">
          <ScrollView
            className="flex-1"
            showsHorizontalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <Tabs defaultValue={activeTab} contentMarginTop={12}>
              <TabsList center>
                <TabsTrigger value="pending" onChange={handleTabChange}>
                  Chờ xác nhận
                </TabsTrigger>

                <TabsTrigger value="ongoing" onChange={handleTabChange}>
                  Đang diễn ra
                </TabsTrigger>

                <TabsTrigger value="history" onChange={handleTabChange}>
                  Lịch sử
                </TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab}>
                {filteredBookingsData && filteredBookingsData.length > 0 ? (
                  <VStack gap={12}>
                    {filteredBookingsData?.map((booking) => (
                      <BookingCard
                        key={booking.bookingId}
                        variant="member"
                        name={booking.consultant.fullName}
                        date={booking.date}
                        startTime={booking.startTime}
                        endTime={booking.endTime}
                        notes={booking.notes}
                        reviewed={booking.isReviewed}
                        status={booking.status}
                        cancellationReason={booking.cancellationReason}
                        onCancelPress={() => handleCancel(booking.bookingId)}
                        onCompletePress={() =>
                          handleComplete(booking.bookingId)
                        }
                        onReviewPress={() => handleReview(booking.bookingId)}
                      />
                    ))}
                  </VStack>
                ) : (
                  <ErrorDisplay
                    imageSource={require("../../../../../../public/images/monhealth-no-data-image.png")}
                    title="Không có lịch hẹn"
                    description="Không tìm thấy có lịch hẹn nào ở đây!"
                    marginTop={24}
                  />
                )}
              </TabsContent>
            </Tabs>
          </ScrollView>
        </Content>
      </Container>

      <Modal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        title={modalType === "cancel" ? "Hủy lịch hẹn" : "Hoàn thành lịch hẹn"}
        description={
          modalType === "cancel"
            ? "Bạn có chắc chắn muốn hủy lịch hẹn này không?"
            : "Bạn có chắc chắn muốn đánh dấu lịch hẹn này là hoàn thành không?"
        }
        confirmText="Đồng ý"
        cancelText="Hủy"
        onConfirm={handleConfirmAction}
      />
    </>
  )
}

export default BookingsUserScreen
