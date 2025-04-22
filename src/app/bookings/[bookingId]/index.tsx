import React from "react"

import { Text, View } from "react-native"

import { useLocalSearchParams } from "expo-router"

import { Container, Content } from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

import { useGetBookingById } from "@/hooks/useBooking"

const BookingDetailsScreen = () => {
  const { bookingId } = useLocalSearchParams<{ bookingId: string }>()

  const { data: bookingData } = useGetBookingById(bookingId)

  // console.log(JSON.stringify(bookingData, null, 2))

  return (
    <Container>
      <Header back label="Lịch hẹn" />

      <Content className="mt-2">
        <Text>BookingDetailsScreen</Text>
      </Content>
    </Container>
  )
}

export default BookingDetailsScreen
