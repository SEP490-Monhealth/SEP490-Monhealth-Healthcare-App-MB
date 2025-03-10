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

function BookingsConsultantScreen() {
  const router = useRouter()

  const { tab } = useLocalSearchParams<{ tab: string }>()

  const bookingsData = sampleBookingsData

  const [activeTab, setActiveTab] = useState(tab || "pending")
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(
    null
  )

  const tabStatusMap: Record<string, BookingStatusEnum> = {
    pending: BookingStatusEnum.Pending,
    confirmed: BookingStatusEnum.Confirmed,
    completed: BookingStatusEnum.Completed,
    cancelled: BookingStatusEnum.Cancelled
  }

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

  const handleConfirmCancel = () => {
    if (selectedBookingId) {
      setIsModalVisible(false)
      router.push(`/bookings/cancel?bookingId=${selectedBookingId}`)
    }
    setSelectedBookingId(null)
  }

  const handleViewBooking = (bookingId: string) => {
    router.push(`/bookings/${bookingId}`)
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
                <VStack gap={12}>
                  {filteredBookingsData.map((booking) => (
                    <BookingCard
                      key={booking.bookingId}
                      variant="consultant"
                      name={booking.customer}
                      date={booking.date}
                      time={booking.time}
                      notes={booking.notes}
                      status={booking.status}
                      onPress={() => handleViewBooking(booking.bookingId)}
                      onCancelPress={() => handleCancel(booking.bookingId)}
                      onConfirmPress={() => handleConfirm(booking.bookingId)}
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

export default BookingsConsultantScreen
