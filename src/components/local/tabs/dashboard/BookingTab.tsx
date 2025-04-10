import React from "react"

import { ScrollView, Text } from "react-native"

import { LoadingScreen } from "@/app/loading"

import { HStack, VStack } from "@/components/global/atoms"
import { BookingCard } from "@/components/global/molecules"
import { Section } from "@/components/global/organisms"

import { useAuth } from "@/contexts/AuthContext"

import { useGetBookingsByConsultantId } from "@/hooks/useBooking"

import { getMonthRange } from "@/utils/helpers"

import { BarChart } from "./BarChart"

const labels = ["T1", "T2", "T3", "T4", "T5", "T6"]

const bookingData = [
  { month: "2025-01", bookings: 45 },
  { month: "2025-02", bookings: 78 },
  { month: "2025-03", bookings: 120 },
  { month: "2025-04", bookings: 95 },
  { month: "2025-05", bookings: 60 },
  { month: "2025-06", bookings: 110 }
]

interface BookingTabProps {
  onOverlayLoading: (isLoading: boolean) => void
}

export const BookingTab = ({ onOverlayLoading }: BookingTabProps) => {
  const { user } = useAuth()
  const consultantId = user?.consultantId

  const currentMonth = "2025-04"

  const currentDate = new Date(currentMonth)
  const currentMonthNum = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()

  const startMonthDate = new Date(currentYear, currentMonthNum - 5, 1)
  const startMonth = `${startMonthDate.getFullYear()}-${String(startMonthDate.getMonth() + 1).padStart(2, "0")}`

  const monthRange = getMonthRange(startMonth, currentMonth)

  const { data: bookingsData } = useGetBookingsByConsultantId(consultantId)

  const totalBookings = bookingData.reduce(
    (sum, item) => sum + item.bookings,
    0
  )

  if (!bookingsData) {
    return <LoadingScreen />
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 48 }}
    >
      <VStack className="px-2">
        <Text className="font-tbold text-xl text-secondary">Tổng quan</Text>

        <HStack className="-mb-2 items-center justify-between">
          <HStack className="items-end">
            <Text className="font-tbold text-3xl text-primary">
              {totalBookings}
            </Text>
            <Text className="mb-1 font-tmedium text-base text-secondary">
              lượt đặt lịch
            </Text>
          </HStack>

          <Text className="font-tmedium text-primary">{monthRange}</Text>
        </HStack>
      </VStack>

      <BarChart month={currentMonth} labels={labels} data={bookingData} />

      <Section label="Danh sách lịch hẹn" />

      <VStack gap={12}>
        {bookingsData?.length > 0 &&
          bookingsData.map((booking) => (
            <BookingCard
              key={booking.bookingId}
              variant="default"
              name={booking.consultant.fullName}
              date={booking.date}
              startTime={booking.startTime}
              endTime={booking.endTime}
              notes={booking.notes}
              status={booking.status}
              cancellationReason={booking.cancellationReason}
            />
          ))}
      </VStack>
    </ScrollView>
  )
}
