import React from "react"

import { View } from "react-native"

import { VStack } from "@/components/global/atoms"
import { BookingCard } from "@/components/global/molecules"

import { sampleBookingsData } from "@/constants/booking"
import { StatusBookingEnum } from "@/constants/enums"

export const PendingTab = () => {
  const bookingData = sampleBookingsData.filter(
    (booking) => booking.status === StatusBookingEnum.Pending
  )

  const handleCancelBooking = (bookingId: string) => {
    console.log("Hủy booking:", bookingId)
  }

  const handleConfirmBooking = (bookingId: string) => {
    console.log("Xác nhận booking:", bookingId)
  }

  return (
    <VStack className="mt-4">
      {bookingData.map((booking) => (
        <View key={booking.bookingId} className="mb-4">
          <BookingCard
            variant="confirm"
            name={booking.customerName}
            date={booking.date}
            time={booking.time}
            note={booking.note}
            status={booking.status}
            onCancelPress={() => handleCancelBooking(booking.bookingId)}
            onConfirmPress={() => handleConfirmBooking(booking.bookingId)}
          />
        </View>
      ))}
    </VStack>
  )
}
