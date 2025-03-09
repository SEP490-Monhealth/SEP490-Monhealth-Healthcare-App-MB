import React, { useState } from "react"

import { View } from "react-native"

import { useLocalSearchParams } from "expo-router"

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

function BookingsScreen() {
  const { tab } = useLocalSearchParams<{ tab: string }>()

  const [activeTab, setActiveTab] = useState(tab || "pending")
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(
    null
  )

  const [reason, setReason] = useState<string>("")

  const { user } = useAuth()
  const userId = user?.userId

  const tabStatusMap: Record<string, BookingStatusEnum> = {
    pending: BookingStatusEnum.Pending,
    confirmed: BookingStatusEnum.Confirmed,
    completed: BookingStatusEnum.Completed,
    cancelled: BookingStatusEnum.Cancelled
  }

  const bookingsData = sampleBookingsData

  const filteredBookingsData = bookingsData.filter(
    (booking) => booking.status === tabStatusMap[activeTab]
  )

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

  return (
    <>
      <Container>
        <Header back label="Lịch hẹn" />

        <Content className="mt-2">
          <ScrollArea className="flex-1">
            <Tabs defaultValue={activeTab} contentMarginTop={12}>
              <TabsList scrollable>
                <TabsTrigger value="pending" onChange={handleTabChange}>
                  Chờ xác nhận
                </TabsTrigger>

                <TabsTrigger value="confirmed" onChange={handleTabChange}>
                  Đã xác nhận
                </TabsTrigger>

                <TabsTrigger value="completed" onChange={handleTabChange}>
                  Hoàn thành
                </TabsTrigger>

                <TabsTrigger value="cancelled" onChange={handleTabChange}>
                  Đã hủy
                </TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab}>
                {filteredBookingsData.map((booking) => (
                  <View key={booking.bookingId} className="mb-4">
                    <BookingCard
                      variant={activeTab === "pending" ? "confirm" : "default"}
                      name={booking.customer}
                      date={booking.date}
                      time={booking.time}
                      notes={booking.notes}
                      status={booking.status}
                      onPress={() => handleViewBooking(booking.bookingId)}
                      onCancelPress={() => handleCancel(booking.bookingId)}
                      onConfirmPress={() => handleConfirm(booking.bookingId)}
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

export default BookingsScreen
