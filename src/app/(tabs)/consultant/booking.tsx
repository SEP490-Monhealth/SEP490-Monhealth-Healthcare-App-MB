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
  useGetBookingsByConsultantId,
  useUpdateBookingStatus
} from "@/hooks/useBooking"

function BookingsScreen() {
  const router = useRouter()

  const { tab } = useLocalSearchParams<{ tab: string }>()

  const { user } = useAuth()
  const consultantId = user?.consultantId

  console.log(consultantId)

  const { mutate: updateBookingStatus } = useUpdateBookingStatus()

  const { data: bookingsData, isLoading } =
    useGetBookingsByConsultantId(consultantId)

  const [activeTab, setActiveTab] = useState(tab || "pending")
  const [modalType, setModalType] = useState<"cancel" | "confirm">("cancel")
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
  const [selectedBooking, setSelectedBooking] = useState<string | null>(null)

  const tabStatusMap: Record<string, BookingStatusEnum> = {
    pending: BookingStatusEnum.Pending,
    confirmed: BookingStatusEnum.Confirmed,
    completed: BookingStatusEnum.Completed,
    cancelled: BookingStatusEnum.Cancelled
  }

  const filteredBookingsData = bookingsData?.filter(
    (booking) => booking.status === tabStatusMap[activeTab]
  )

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }

  const handleCancel = (bookingId: string) => {
    setSelectedBooking(bookingId)
    setModalType("cancel")
    setIsModalVisible(true)
  }

  const handleConfirm = (bookingId: string) => {
    setSelectedBooking(bookingId)
    setModalType("confirm")
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
      } else if (modalType === "confirm") {
        updateBookingStatus(
          { bookingId: selectedBooking },
          {
            onSuccess: () => {
              router.replace({
                pathname: "/(tabs)/consultant/bookings",
                params: { tab: "confirmed" }
              })
            }
          }
        )
      }
    }
    setSelectedBooking(null)
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
                {filteredBookingsData && filteredBookingsData.length > 0 ? (
                  <VStack gap={12}>
                    {filteredBookingsData?.map((booking) => (
                      <BookingCard
                        key={booking.bookingId}
                        variant="consultant"
                        name={booking.consultant.fullName}
                        date={booking.date}
                        notes={booking.notes}
                        status={booking.status}
                        cancellationReason={booking.cancellationReason}
                        onCancelPress={() => handleCancel(booking.bookingId)}
                        onConfirmPress={() => handleConfirm(booking.bookingId)}
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
        title={modalType === "cancel" ? "Hủy lịch hẹn" : "Xác nhận lịch hẹn"}
        description={
          modalType === "cancel"
            ? "Bạn có chắc chắn muốn hủy lịch hẹn này không?"
            : "Bạn có chắc chắn muốn xác nhận lịch hẹn này không?"
        }
        confirmText="Đồng ý"
        cancelText="Hủy"
        onConfirm={handleConfirmAction}
      />
    </>
  )
}

export default BookingsScreen
