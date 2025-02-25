import React, { useState } from "react"

import { useRouter } from "expo-router"

import { Container, Content, Schedule, VStack } from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

function AssistantScreen() {
  const router = useRouter()
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
      <Header label="Chuyên viên" />

      <Content className="mt-2 pb-12">
        <VStack gap={20}>
          <Schedule initialDate={today} onDateSelect={handleDateSelect} />
        </VStack>
      </Content>
    </Container>
  )
}
export default AssistantScreen
