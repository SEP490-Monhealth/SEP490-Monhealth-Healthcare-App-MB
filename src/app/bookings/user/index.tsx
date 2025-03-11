import React, { useState } from "react"

import { useLocalSearchParams, useRouter } from "expo-router"

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
import { BookingCard } from "@/components/global/molecules"
import { Header } from "@/components/global/organisms"

import { sampleBookingsData } from "@/constants/bookings"
import { BookingStatusEnum } from "@/constants/enum/Booking"

import { useAuth } from "@/contexts/AuthContext"

function BookingsUserScreen() {
  const router = useRouter()

  const { tab } = useLocalSearchParams<{ tab: string }>()

  const { user } = useAuth()
  const userId = user?.userId

  const bookingsData = sampleBookingsData

  const [activeTab, setActiveTab] = useState(tab || "pending")
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(
    null
  )

  const filteredBookingsData = bookingsData.filter((booking) => {
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
    setSelectedBookingId(bookingId)
    setIsModalVisible(true)
  }

  const handleConfirmCancel = () => {
    if (selectedBookingId) {
      setIsModalVisible(false)
      router.push(`/bookings/cancel?bookingId=${selectedBookingId}`)
    }
    setSelectedBookingId(null)
  }

  const handleConfirm = (bookingId: string) => {
    console.log("Confirm booking id", bookingId)
  }

  const handleViewBooking = (bookingId: string) => {
    router.push(`/bookings/${bookingId}`)
  }

  const handleReview = (bookingId: string) => {
    router.push(`/bookings/review?bookingId=${bookingId}`)
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
                <VStack gap={12}>
                  {filteredBookingsData.map((booking) => (
                    <BookingCard
                      key={booking.bookingId}
                      variant="default"
                      name={booking.consultant}
                      date={booking.date}
                      time={booking.time}
                      notes={booking.notes}
                      status={booking.status}
                      onPress={() => handleViewBooking(booking.bookingId)}
                      onCancelPress={() => handleCancel(booking.bookingId)}
                      onConfirmPress={() => handleConfirm(booking.bookingId)}
                      onReviewPress={() => handleReview(booking.bookingId)}
                    />
                  ))}
                </VStack>
              </TabsContent>
            </Tabs>
          </ScrollArea>
        </Content>
      </Container>

      <Modal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        title="Hủy lịch hẹn"
        description="Bạn có chắc chắn muốn hủy lịch hẹn này không?"
        confirmText="Đồng ý"
        cancelText="Hủy"
        onConfirm={handleConfirmCancel}
      />
    </>
  )
}

export default BookingsUserScreen
