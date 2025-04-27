import React, { useEffect, useState } from "react"

import { RefreshControl, ScrollView, Text } from "react-native"

import { useRouter } from "expo-router"

import { useIsFetching, useIsMutating } from "@tanstack/react-query"

import { HStack, VStack } from "@/components/global/atoms"
import { BookingCard, ErrorDisplay } from "@/components/global/molecules"
import { Section } from "@/components/global/organisms"

import {
  useGetMonthlyBookingsByConsultantId,
  useGetYearlyBookingByConsultantId
} from "@/hooks/useTracker"

import { getMonthRange } from "@/utils/helpers"

import { BarChart } from "./BarChart"

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
  const router = useRouter()

  const month = date.split("-").slice(0, 2).join("-")

  const [initialDate] = useState(date)
  const [selectedMonth, setSelectedMonth] = useState<string>(month)
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false)

  const { data: yearlyBookingData, isLoading: isYearlyBookingLoading } =
    useGetYearlyBookingByConsultantId(
      consultantId,
      initialDate.split("-").slice(0, 2).join("-")
    )

  const { data: bookingsData, isLoading } = useGetMonthlyBookingsByConsultantId(
    consultantId,
    1,
    undefined,
    selectedMonth
  )

  useEffect(() => {
    if (!isLoading && isRefreshing) {
      setIsRefreshing(false)
    }
  }, [isLoading, isRefreshing])

  const isFetching = useIsFetching()
  const isMutating = useIsMutating()

  useEffect(() => {
    onOverlayLoading(isFetching > 0 || isMutating > 0 || isYearlyBookingLoading)
  }, [isFetching, isMutating, isYearlyBookingLoading, onOverlayLoading])

  const currentDate = new Date(initialDate)
  const currentMonthNum = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()

  const startMonthDate = new Date(currentYear, currentMonthNum - 5, 1)
  const startMonth = `${startMonthDate.getFullYear()}-${String(startMonthDate.getMonth() + 1).padStart(2, "0")}`

  const monthRange = getMonthRange(startMonth, initialDate)

  const totalBookings =
    yearlyBookingData?.reduce((acc, item) => acc + item.bookings, 0) || 0

  const barChartData = yearlyBookingData || []

  const labels = Array.from({ length: 6 }, (_, index) => {
    const month = new Date(currentYear, currentMonthNum - 5 + index, 1)
    const monthNumber = month.getMonth() + 1
    return `T${monthNumber}`
  })

  const handleViewBookings = () => {
    router.replace("/(tabs)/consultant/booking")
  }

  const onRefresh = () => {
    setIsRefreshing(true)
    setIsRefreshing(false)
  }

  const handleSelectMonth = (month: string) => {
    setSelectedMonth(month)
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 48 }}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
      }
    >
      <VStack className="px-2">
        <Text className="font-tbold text-xl text-secondary">Tổng quan</Text>

        <HStack className="-mb-2 items-center justify-between">
          <HStack className="items-end">
            <Text className="font-tbold text-3xl text-primary">
              {totalBookings}
            </Text>
            <Text className="mb-1 font-tmedium text-base text-secondary">
              lịch hẹn
            </Text>
          </HStack>

          <Text className="font-tmedium text-primary">{monthRange}</Text>
        </HStack>
      </VStack>

      <BarChart
        labels={labels}
        data={barChartData}
        selectedMonth={selectedMonth}
        onSelectMonth={handleSelectMonth}
      />

      <Section label="Danh sách lịch hẹn" />

      {bookingsData && bookingsData.bookings.length > 0 ? (
        <VStack gap={12}>
          {bookingsData.bookings.map((booking) => (
            <BookingCard
              key={booking.bookingId}
              variant="default"
              name={
                consultantId
                  ? booking.member.fullName
                  : booking.consultant.fullName
              }
              date={booking.date}
              startTime={booking.startTime}
              endTime={booking.endTime}
              notes={booking.notes}
              status={booking.status}
              onPress={handleViewBookings}
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
