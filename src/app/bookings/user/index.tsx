import React, { useState } from "react"

import { View } from "react-native"

import { useLocalSearchParams, useRouter } from "expo-router"

import {
  Container,
  Content,
  Modal,
  ScrollArea,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/global/atoms"
import { BookingCard } from "@/components/global/molecules"
import { Header } from "@/components/global/organisms"

import { sampleBookingsData } from "@/constants/bookings"
import { BookingStatusEnum } from "@/constants/enum/BookingStatus"

import { useAuth } from "@/contexts/AuthContext"

function BookingsUserScreen() {
  const { tab } = useLocalSearchParams<{ tab: string }>()

  const [activeTab, setActiveTab] = useState(tab || "pending")
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(
    null
  )
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
  const [reason, setReason] = useState<string>("")

  const router = useRouter()
  const { user } = useAuth()
  const userId = user?.userId

  const bookingsData = sampleBookingsData

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }

  const handleCancel = (bookingId: string) => {
    setSelectedBookingId(bookingId)
    setIsModalVisible(true)
  }

  const handleViewBooking = (bookingId: string) => {
    console.log(bookingId)
  }

  const handleConfirmCancel = () => {
    if (selectedBookingId) {
      const finalData = {
        userId: userId,
        bookingId: selectedBookingId,
        reason: reason
      }

      console.log("Final Data:", JSON.stringify(finalData, null, 2))
    }

    setIsModalVisible(false)
    setSelectedBookingId(null)
    setReason("")
  }

  const handleConfirm = (bookingId: string) => {
    console.log("Confirm booking id", bookingId)
  }

  const handleReview = (bookingId: string) => {
    router.push(`/bookings/user/${bookingId}/details`)
  }

  const filteredBookingsData = bookingsData.filter((booking) => {
    if (activeTab === "pending") {
      return (
        booking.status === BookingStatusEnum.Pending ||
        booking.status === BookingStatusEnum.Confirmed
      )
    } else {
      return (
        booking.status !== BookingStatusEnum.Pending &&
        booking.status !== BookingStatusEnum.Confirmed
      )
    }
  })

  return (
    <>
      <Container>
        <Header back label="Lịch hẹn" />
        <Content className="mt-2">
          <ScrollArea className="flex-1">
            <Tabs defaultValue={activeTab} contentMarginTop={12}>
              <TabsList scrollable>
                <TabsTrigger value="pending" onChange={handleTabChange}>
                  Đang thực hiện
                </TabsTrigger>
                <TabsTrigger value="history" onChange={handleTabChange}>
                  Lịch sử
                </TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab}>
                {filteredBookingsData.map((booking) => (
                  <View key={booking.bookingId} className="mb-4">
                    <BookingCard
                      variant={
                        booking.status === BookingStatusEnum.Pending
                          ? "cancel"
                          : booking.status === BookingStatusEnum.Completed
                            ? "review"
                            : "default"
                      }
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
                  </View>
                ))}
              </TabsContent>
            </Tabs>
          </ScrollArea>
        </Content>
      </Container>

      <Modal
        variant="cancel"
        isVisible={isModalVisible}
        reason={reason}
        onClose={() => setIsModalVisible(false)}
        title="Hủy lịch hẹn"
        description="Bạn có chắc chắn muốn hủy lịch hẹn này không?"
        confirmText="Đồng ý"
        cancelText="Hủy"
        onConfirm={handleConfirmCancel}
        onReasonChange={setReason}
      />
    </>
  )
}

export default BookingsUserScreen
