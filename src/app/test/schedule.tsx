import React, { useState } from "react"

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
  const today = new Date()

  const scheduleData = sampleBookingsData

  const [selectedDate, setSelectedDate] = useState<string | null>(
    today.toISOString()
  )

  const handleDateSelect = (date: string) => {
    setSelectedDate(date)
    console.log(date)
  }

  return (
    <Container>
      <Header back label="Lịch trình" />

      <Content className="mt-2">
        <ScrollArea>
          <VStack>
            <View className="mb-4">
              <Schedule initialDate={today} onDateSelect={handleDateSelect} />
            </View>

            {scheduleData.map((schedule) => {
              const endTime =
                schedule.updatedAt !== schedule.createdAt
                  ? schedule.updatedAt
                  : null

              return (
                <ScheduleCard
                  key={schedule.scheduleId}
                  customer={schedule.customer}
                  startTime={schedule.time}
                  endTime={endTime}
                  status={schedule.status}
                  notes={schedule.notes}
                />
              )
            })}
          </VStack>
        </ScrollArea>
      </Content>
    </Container>
  )
}

export default ScheduleScreen
