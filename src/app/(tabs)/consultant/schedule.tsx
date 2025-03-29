import React, { useState } from "react"

import { LoadingScreen } from "@/app/loading"

import {
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

function BookingScreen() {
  const { user } = useAuth()
  const consultantId = user?.consultantId

  const { data: bookingsData, isLoading } =
    useGetBookingsByConsultantId(consultantId)

  const today = new Date()

  const [selectedDate, setSelectedDate] = useState<string | null>(
    today.toISOString()
  )
  const [selectedSCheduleId, setSelectedSCheduleId] = useState<string | null>(
    null
  )

  console.log(selectedSCheduleId)

  const handleDateSelect = (date: string) => {
    setSelectedDate(date)
    console.log(date)
  }

  const handleSelectSchedule = (scheduleId: string) => {
    setSelectedSCheduleId(scheduleId)
  }

  if (!bookingsData || isLoading) {
    return <LoadingScreen />
  }

  return (
    <Container>
      <Header label="Lịch hẹn" />

      <Content className="mt-2">
        <ScrollArea className="flex-1">
          <VStack className="pb-12">
            <Schedule initialDate={today} onDateSelect={handleDateSelect} />

            <Section label="Danh sách lịch hẹn" />

            <VStack gap={0}>
              {bookingsData
                .slice()
                .sort((a, b) => {
                  const timeA =
                    parseInt(a.date.split("T")[1].slice(0, 2)) * 60 +
                    parseInt(a.date.split("T")[1].slice(3, 5))
                  const timeB =
                    parseInt(b.date.split("T")[1].slice(0, 2)) * 60 +
                    parseInt(b.date.split("T")[1].slice(3, 5))
                  return timeA - timeB
                })
                .map((schedule) => (
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
                ))}

              <ErrorDisplay
                imageSource={require("../../../../public/images/monhealth-no-data-image.png")}
                title="Chưa có lịch hẹn"
                description="Bạn chưa có lịch hẹn nào ở đây!"
                marginTop={12}
              />
            </VStack>
          </VStack>
        </ScrollArea>
      </Content>
    </Container>
  )
}

export default BookingScreen
