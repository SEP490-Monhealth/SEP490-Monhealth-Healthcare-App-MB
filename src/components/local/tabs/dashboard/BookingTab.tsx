import React, { useEffect, useState } from "react"

import { ScrollView, Text } from "react-native"

import { useIsFetching, useIsMutating } from "@tanstack/react-query"

import { HStack, VStack } from "@/components/global/atoms"
import { BookingCard, ErrorDisplay } from "@/components/global/molecules"
import { Section } from "@/components/global/organisms"

import { useGetBookingsByConsultantId } from "@/hooks/useBooking"
import { useGetMonthlyBookingByConsultantId } from "@/hooks/useReport"

import { getMonthRange } from "@/utils/helpers"

import { BarChart } from "./BarChart"

const labels = ["T1", "T2", "T3", "T4", "T5", "T6"]

interface BookingTabProps {
  consultantId?: string
  date: string
  onOverlayLoading: (isLoading: boolean) => void
}

export const BookingTab = ({
  consultantId,
  date,
  onOverlayLoading
}: BookingTabProps) => {
  const [selectedMonth, setSelectedMonth] = useState<string>(date)

  const { data: monthlyBookingData, isLoading: isMonthlyBookingLoading } =
    useGetMonthlyBookingByConsultantId(consultantId, selectedMonth)
  const { data: bookingsData } = useGetBookingsByConsultantId(consultantId)

  const isFetching = useIsFetching()
  const isMutating = useIsMutating()

  useEffect(() => {
    onOverlayLoading(
      isFetching > 0 || isMutating > 0 || isMonthlyBookingLoading
    )
  }, [isFetching, isMutating, isMonthlyBookingLoading, onOverlayLoading])

  const currentDate = new Date(date)
  const currentMonthNum = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()

  const startMonthDate = new Date(currentYear, currentMonthNum - 5, 1)
  const startMonth = `${startMonthDate.getFullYear()}-${String(startMonthDate.getMonth() + 1).padStart(2, "0")}`

  const monthRange = getMonthRange(startMonth, date)

  const totalBookings = monthlyBookingData?.reduce(
    (acc, item) => acc + item.bookings,
    0
  )

  const barChartData = monthlyBookingData || []

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

      <BarChart
        date={date}
        labels={labels}
        data={barChartData}
        onSelectMonth={setSelectedMonth}
      />

      <Section label="Danh sách lịch hẹn" />

      {bookingsData && bookingsData.length > 0 ? (
        <VStack gap={12}>
          {bookingsData.map((booking) => (
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
      ) : (
        <ErrorDisplay
          imageSource={require("../../../../../public/images/monhealth-no-data-image.png")}
          title="Không có dữ liệu"
          description="Không tìm thấy có lịch hẹn nào ở đây!"
          marginTop={12}
        />
      )}
    </ScrollView>
  )
}
