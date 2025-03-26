import React, { useState } from "react"

import { useLocalSearchParams, useRouter } from "expo-router"

import { LoadingScreen } from "@/app/loading"

import {
  Container,
  Content,
  Modal,
  ScrollArea,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  VStack
} from "@/components/global/atoms"
import { BookingCard, ErrorDisplay } from "@/components/global/molecules"
import { Header } from "@/components/global/organisms"

import { BookingStatusEnum } from "@/constants/enum/Booking"

import { useAuth } from "@/contexts/AuthContext"

import {
  useGetBookingsByUserId,
  useUpdateBookingStatus
} from "@/hooks/useBooking"

function BookingsUserScreen() {
  const router = useRouter()

  const { tab } = useLocalSearchParams<{ tab: string }>()

  const { user } = useAuth()
  const userId = user?.userId

  const { mutate: updateBookingStatus } = useUpdateBookingStatus()

  const { data: bookingsData, isLoading } = useGetBookingsByUserId(userId)

  const [activeTab, setActiveTab] = useState(tab || "pending")
  const [modalType, setModalType] = useState<"cancel" | "complete">("cancel")
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
  const [selectedBooking, setSelectedBooking] = useState<string | null>(null)

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
        router.push({
          pathname: "/bookings/cancel",
          params: { bookingId: selectedBooking }
        })
      } else if (modalType === "complete") {
        updateBookingStatus(
          { bookingId: selectedBooking },
          {
            onSuccess: () => {
              router.replace({
                pathname: "/bookings/user",
                params: { tab: "history" }
              })
            }
          }
        )
      }
    }
    setSelectedBooking(null)
  }

  const handleReview = (bookingId: string) => {
    router.push({
      pathname: "/bookings/review",
      params: { bookingId }
    })
  }

  if (!bookingsData || isLoading) {
    return <LoadingScreen />
  }

  return (
    <>
      <Container>
        <Header back label="Lịch hẹn" />

        <Content className="mt-2">
          <ScrollArea className="flex-1">
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
                        name={booking.consultant.fullName}
                        date={booking.date}
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
                    imageSource={require("../../../../public/images/monhealth-no-data-image.png")}
                    title="Chưa có lịch hẹn"
                    description="Bạn chưa có lịch hẹn nào ở đây!"
                    marginTop={24}
                  />
                )}
              </TabsContent>
            </Tabs>
          </ScrollArea>
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
