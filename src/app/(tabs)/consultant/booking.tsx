import React, { useState } from "react"

import { RefreshControl, ScrollView } from "react-native"

import { useRouter } from "expo-router"

import { LoadingScreen } from "@/app/loading"

import {
  Container,
  Content,
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

import { useGetBookingsByConsultantId } from "@/hooks/useBooking"

function BookingsScreen() {
  const router = useRouter()

  const { user } = useAuth()
  const consultantId = user?.consultantId

  const [activeTab, setActiveTab] = useState<string>("booked")
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false)

  const {
    data: bookingsData,
    isLoading,
    refetch
  } = useGetBookingsByConsultantId(consultantId, 1)

  const tabStatusMap: Record<string, BookingStatusEnum | BookingStatusEnum[]> =
    {
      booked: BookingStatusEnum.Booked,
      completed: [BookingStatusEnum.Completed, BookingStatusEnum.Reported],
      cancelled: BookingStatusEnum.Cancelled
    }

  const filteredBookingsData = bookingsData?.bookings?.filter((booking) => {
    const statusFilter = tabStatusMap[activeTab]
    if (Array.isArray(statusFilter)) {
      return statusFilter.includes(booking.status)
    }
    return booking.status === statusFilter
  })

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }

  const onRefresh = async () => {
    setIsRefreshing(true)
    await refetch()
    setIsRefreshing(false)
  }

  const handleViewBooking = (bookingId: string) => {
    router.push(`/bookings/${bookingId}`)
  }

  if (!bookingsData || isLoading) {
    return <LoadingScreen />
  }

  return (
    <Container>
      <Header label="Lịch hẹn" />

      <Content>
        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
          }
        >
          <Tabs defaultValue={activeTab} contentMarginTop={12}>
            <TabsList center>
              <TabsTrigger value="booked" onChange={handleTabChange}>
                Đã đặt
              </TabsTrigger>

              <TabsTrigger value="completed" onChange={handleTabChange}>
                Đã hoàn thành
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
                      name={
                        consultantId
                          ? booking.member.fullName
                          : booking.consultant.fullName
                      }
                      date={booking.date}
                      startTime={booking.startTime}
                      endTime={booking.endTime}
                      notes={booking.notes}
                      isReviewed={booking.isReviewed}
                      rating={booking.reviews?.rating}
                      comment={booking.reviews?.comment}
                      status={booking.status}
                      cancellationReason={booking.cancellationReason}
                      onPress={() => handleViewBooking(booking.bookingId)}
                    />
                  ))}
                </VStack>
              ) : (
                <ErrorDisplay
                  imageSource={require("../../../../public/images/monhealth-no-data-image.png")}
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
  )
}

export default BookingsScreen
