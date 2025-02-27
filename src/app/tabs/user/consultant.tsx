import React, { useState } from "react"

import { useRouter } from "expo-router"

import { Container, Content, Schedule, VStack } from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

function ConsultantScreen() {
  const router = useRouter()
  const today = new Date().toISOString()

  const [selectedDate, setSelectedDate] = useState<string | null>(today)

  console.log(selectedDate)

  const handleDateSelect = (date: string) => {
    setSelectedDate(date)
    console.log(date)
  }

  return (
    <Container>
      <Header label="Chuyên viên" />

      <Content className="mt-2 pb-12">
        <VStack gap={20}>
          <Schedule initialDate={today} onDateSelected={handleDateSelect} />
        </VStack>
      </Content>
    </Container>
  )
}
export default ConsultantScreen
