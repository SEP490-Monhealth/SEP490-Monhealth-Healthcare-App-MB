import React from "react"

import { Calendar, Container, Content, VStack } from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

function CalendarScreen() {
  return (
    <Container>
      <Header back title="Chọn ngày" />

      <Content>
        <VStack center gap={20} className="mt-4 pb-16">
          <Calendar />
        </VStack>
      </Content>
    </Container>
  )
}

export default CalendarScreen
