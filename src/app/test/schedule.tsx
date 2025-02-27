import React, { useEffect, useState } from "react"

import { View } from "react-native"

import {
  Container,
  Content,
  Schedule,
  ScrollArea,
  VStack
} from "@/components/global/atoms"
import { ScheduleCard } from "@/components/global/molecules"
import { Header } from "@/components/global/organisms"

import { sampleBookingsData } from "@/constants/booking"

function ScheduleScreen() {
  const scheduleData = sampleBookingsData
  const today = new Date()

  const [selectedDate, setSelectedDate] = useState<string | null>(
    today.toISOString()
  )

  const handleDateSelect = (date: string) => {
    setSelectedDate(date)
  }

  useEffect(() => {
    console.log("Ngày để chọn:", selectedDate)
  }, [selectedDate])

  const handleViewBooking = (bookingId: string) => {
    console.log(bookingId)
  }

  return (
    <Container>
      <Header back label="Lịch trình" />

      <Content className="mt-2">
        <ScrollArea>
          <VStack>
            <View className="mb-4">
              <Schedule
                initialDate={today}
                pickDateInMonth={selectedDate}
                onDateSelected={handleDateSelect}
              />
            </View>

            {scheduleData.map((schedule) => (
              <ScheduleCard
                key={schedule.scheduleId}
                customer={schedule.customer}
                startTime={schedule.time}
                endTime={schedule.updatedAt}
                status={schedule.status}
                notes={schedule.notes}
                onPress={() => handleViewBooking(schedule.bookingId)}
              />
            ))}
          </VStack>
        </ScrollArea>
      </Content>
    </Container>
  )
}

export default ScheduleScreen
