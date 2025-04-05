import React, { useState } from "react"

import { useRouter } from "expo-router"

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

  const { user } = useAuth()
  const consultantId = user?.consultantId

  const now = new Date()

  const { data: schedulesData, isLoading: isSchedulesLoading } =
    useGetSchedulesByConsultantId(consultantId)

  const [selectedDate, setSelectedDate] = useState<string | null>(
    now.toISOString()
  )

  const { data: bookingsData, isLoading: isBookingsLoading } =
    useGetBookingsByConsultantId(
      consultantId,
      selectedDate || now.toISOString()
    )

  const [selectedSchedule, setSelectedSchedule] = useState<string | null>(null)

  const handleDateSelect = (date: string) => {
    setSelectedDate(date)
  }

  const handleSelectSchedule = (scheduleId: string) => {
    setSelectedSchedule(scheduleId)
  }

  const handleViewSchedules = () => {
    router.push(`/schedules/consultant/${consultantId}`)
  }

  const handleCreateSchedule = () => {
    router.push(`/schedules/consultant/${consultantId}`)
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

          <Button size="lg" onPress={handleCreateSchedule} className="mt-12">
            Thiết lập lịch
          </Button>
        </Content>
      </Container>
    )
  }

  if (isBookingsLoading || !bookingsData) {
    return <LoadingScreen />
  }

  const sortedBookings = bookingsData.slice().sort((a, b) => {
    const timeA =
      parseInt(a.date.split("T")[1].slice(0, 2)) * 60 +
      parseInt(a.date.split("T")[1].slice(3, 5))
    const timeB =
      parseInt(b.date.split("T")[1].slice(0, 2)) * 60 +
      parseInt(b.date.split("T")[1].slice(3, 5))
    return timeA - timeB
  })

  return (
    <Container>
      <Header label="Lịch trình" />

      <Content className="mt-2">
        <ScrollArea className="flex-1">
          <VStack className="pb-12">
            <Schedule
              initialDate={new Date(selectedDate || now.toISOString())}
              onDateSelect={handleDateSelect}
            />

            <Section
              label="Danh sách lịch trình"
              actionText="Xem thời gian biểu"
              onPress={handleViewSchedules}
            />

            <VStack gap={0}>
              {sortedBookings.length > 0 ? (
                sortedBookings.map((schedule) => (
                  <ScheduleCard
                    key={schedule.bookingId}
                    member={schedule.member.fullName}
                    startTime={schedule.date
                      .split("T")[1]
                      .slice(0, 5)
                      .replace(":", "h")}
                    notes={schedule.notes}
                    status={schedule.status}
                    onPress={() => handleSelectSchedule(schedule.bookingId)}
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
