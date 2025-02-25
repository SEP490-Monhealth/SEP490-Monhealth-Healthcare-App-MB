import React from "react"

import { View } from "react-native"

import { VStack } from "@/components/global/atoms"
import { BookingCard } from "@/components/global/molecules"

import { sampleBookingsData } from "@/constants/booking"
import { StatusBookingEnum } from "@/constants/enums"

export const CancelledTab = () => {
  const bookingData = sampleBookingsData.filter(
    (booking) => booking.status === StatusBookingEnum.Cancelled
  )

  return (
    <VStack className="mt-4">
      {bookingData.map((booking) => (
        <View key={booking.bookingId} className="mb-4">
          <BookingCard
            variant="default"
            name={booking.customerName}
            date={booking.date}
            time={booking.time}
            note={booking.note}
            status={booking.status}
          />
        </View>
      ))}
    </VStack>
  )
}
