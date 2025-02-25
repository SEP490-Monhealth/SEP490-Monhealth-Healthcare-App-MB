import React from "react"

import { Text } from "react-native"

import { useLocalSearchParams } from "expo-router"

import { Container } from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

function CreateBookingScreen() {
  const { scheduleId } = useLocalSearchParams() as { scheduleId: string }

  return (
    <Container>
      <Header back label="Đặt lịch" />

      <Text>{scheduleId}</Text>
    </Container>
  )
}

export default CreateBookingScreen
