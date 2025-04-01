import React from "react"

import { useLocalSearchParams } from "expo-router"

import { Calendar, Card, Container, Content } from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

function CalendarScreen() {
  const { selectedDate } = useLocalSearchParams() as { selectedDate?: string }
  const initialDate = selectedDate ? new Date(selectedDate) : new Date()

  return (
    <Container>
      <Header back label="Chọn ngày" />

      <Content className="mt-2">
        <Card activeOpacity={1}>
          <Calendar initialDate={initialDate} />
        </Card>
      </Content>
    </Container>
  )
}

export default CalendarScreen
