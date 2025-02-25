import React, { useState } from "react"

import { Text, View } from "react-native"

import {
  Container,
  Content,
  Schedule,
  ScrollArea,
  VStack
} from "@/components/global/atoms"
import { ScheduleCard } from "@/components/global/molecules"
import { Header } from "@/components/global/organisms"

import { sampleBookedData } from "@/constants/bookedConsultant"

function ScheduleConsultantScreen() {
  const scheduleData = sampleBookedData
  const today = new Date()
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

            {scheduleData.map((schedule) => (
              <View key={schedule.bookingId} className="mb-4">
                <ScheduleCard
                  name={schedule.customerName}
                  time={schedule.time}
                  note={schedule.note}
                />
              </View>
            ))}
          </VStack>
        </ScrollArea>
      </Content>
    </Container>
  )
}

export default ScheduleConsultantScreen
