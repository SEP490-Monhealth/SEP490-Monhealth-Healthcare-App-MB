import React, { useEffect, useState } from "react"

import { Calendar, Card, Container, Content } from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

import { dateStore } from "@/stores/dateStore"

function CalendarScreen() {
  const [selectedCalendar, setSelectedCalendar] = useState<String | null>("")
  const [dateObject, setDateObject] = useState<Date>(new Date())
  const today = new Date()

  const handleDateSelect = (date: String) => {
    setSelectedCalendar(date)
  }

  const dateToSend = dateStore((state) => state.dateToSend)

  useEffect(() => {
    if (
      dateToSend &&
      dateToSend instanceof Date &&
      !isNaN(dateToSend.getTime()) &&
      dateToSend.getTime() !== dateObject.getTime()
    ) {
      setDateObject(dateToSend)
    }
  }, [dateToSend, dateObject])

  console.log("Ngày được chọn trong lịch trình:", dateObject)

  return (
    <Container>
      <Header back label="Chọn ngày" />

      <Content className="mt-2">
        <Card activeOpacity={1}>
          <Calendar
            currentDate={dateObject}
            onDateSelected={handleDateSelect}
            href=""
          />
        </Card>
      </Content>
    </Container>
  )
}

export default CalendarScreen
