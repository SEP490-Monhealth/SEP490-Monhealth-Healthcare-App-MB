import React, { useEffect, useState } from "react"

import { useLocalSearchParams, useRouter } from "expo-router"

import { LoadingScreen } from "@/app/loading"

import {
  Button,
  Container,
  Content,
  Schedule,
  ScrollArea,
  VStack
} from "@/components/global/atoms"
import { ErrorDisplay, ScheduleCard } from "@/components/global/molecules"
import { Header, Section } from "@/components/global/organisms"

import { useAuth } from "@/contexts/AuthContext"

import { useGetBookingsByConsultantId } from "@/hooks/useBooking"
import { useGetSchedulesByConsultantId } from "@/hooks/useSchedule"

function SchedulesScreen() {
  const router = useRouter()
  const { selectedDate: routeSelectedDate } = useLocalSearchParams<{
    selectedDate?: string
  }>()

  const { user } = useAuth()
  const consultantId = user?.consultantId

  const now = new Date()

  const { data: schedulesData, isLoading: isSchedulesLoading } =
    useGetSchedulesByConsultantId(consultantId)

  const [selectedDate, setSelectedDate] = useState<string | null>(
    routeSelectedDate || now.toISOString()
  )

  useEffect(() => {
    if (routeSelectedDate) {
      setSelectedDate(routeSelectedDate)
    }
  }, [routeSelectedDate])

  const { data: bookingsData, isLoading: isBookingsLoading } =
    useGetBookingsByConsultantId(
      consultantId,
      1,
      undefined,
      selectedDate || now.toISOString()
    )

  const handleDateSelect = (date: string) => {
    setSelectedDate(date)
  }

  const handleViewCalendar = () => {
    router.push({
      pathname: "/calendars",
      params: { selectedDate }
    })
  }

  const handleViewSchedules = () => {
    router.push(`/schedules/consultant/${consultantId}`)
  }

  const handleCreateSchedule = () => {
    router.push(`/schedules/consultant/${consultantId}/create`)
  }

  if (isSchedulesLoading) {
    return <LoadingScreen />
  }

  const hasSetupSchedule = schedulesData && schedulesData.length > 0

  if (!hasSetupSchedule) {
    return (
      <Container>
        <Header label="Lịch trình" />

        <Content className="mt-2">
          <ErrorDisplay
            imageSource={require("../../../../public/images/monhealth-no-data-image.png")}
            title="Chưa thiết lập lịch"
            description="Bạn cần thiết lập lịch trình để nhận đặt lịch hẹn từ khách hàng."
            marginTop={24}
          />

          <Button onPress={handleCreateSchedule} className="mt-12">
            Thiết lập lịch
          </Button>
        </Content>
      </Container>
    )
  }

  if (!bookingsData || isBookingsLoading) {
    return <LoadingScreen />
  }

  return (
    <Container>
      <Header label="Lịch trình" />

      <Content className="mt-2">
        <ScrollArea className="flex-1">
          <VStack className="pb-12">
            <Schedule
              initialDate={new Date(selectedDate || now.toISOString())}
              onDateSelect={handleDateSelect}
              onCalendarPress={handleViewCalendar}
            />

            <Section
              label="Danh sách lịch trình"
              actionText="Xem thời gian biểu"
              onPress={
                schedulesData ? handleViewSchedules : handleCreateSchedule
              }
            />

            <VStack gap={0}>
              {bookingsData.bookings.length > 0 ? (
                bookingsData.bookings.map((schedule) => (
                  <ScheduleCard
                    key={schedule.bookingId}
                    member={schedule.member.fullName}
                    startTime={schedule.startTime}
                    endTime={schedule.endTime}
                    notes={schedule.notes}
                    status={schedule.status}
                  />
                ))
              ) : (
                <ErrorDisplay
                  imageSource={require("../../../../public/images/monhealth-no-data-image.png")}
                  title="Không có lịch trình"
                  description="Không tìm thấy có lịch trình nào ở đây!"
                  marginTop={12}
                />
              )}
            </VStack>
          </VStack>
        </ScrollArea>
      </Content>
    </Container>
  )
}

export default SchedulesScreen
