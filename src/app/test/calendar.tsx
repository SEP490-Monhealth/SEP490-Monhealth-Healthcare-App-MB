import React from "react"

import { Calendar, Card, Container, Content } from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

function CalendarScreen() {
  return (
    <Container>
      <Header back label="Chọn ngày" />

      <Content className="mt-2">
        <Card activeOpacity={1}>
          <Calendar />
        </Card>
      </Content>
    </Container>
  )
}

export default CalendarScreen
