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
                  ? schedule.updatedAt.split("T")[1].slice(0, 5)
                  : null

              return (
                <ScheduleCard
                  key={schedule.scheduleId}
                  customer={schedule.customer}
                  startTime={schedule.time}
                  endTime={endTime}
                  status={schedule.status}
                  notes={schedule.notes}
                  onPress={() => handleSelectSchedule(schedule.scheduleId)}
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
