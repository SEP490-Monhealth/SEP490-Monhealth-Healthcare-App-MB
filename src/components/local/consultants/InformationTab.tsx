import React, { useEffect, useState } from "react"

import { View } from "react-native"

import { useLocalSearchParams, useRouter } from "expo-router"

import { useIsFetching, useIsMutating } from "@tanstack/react-query"

import { TimeSlotSelector } from "@/components/global/molecules"
import { DaySelector } from "@/components/global/molecules/DaySelector"
import { Section } from "@/components/global/organisms"

import { useGetConsultantById } from "@/hooks/useConsultant"
import { useGetSchedulesByConsultantId } from "@/hooks/useSchedule"

import { useBookingStore } from "@/stores/bookingStore"

import { ConsultantBio } from "./ConsultantBio"

interface InformationTabProps {
  onLoading: (isLoading: boolean) => void
  onOverlayLoading: (isLoading: boolean) => void
}

export const InformationTab = ({
  onLoading,
  onOverlayLoading
}: InformationTabProps) => {
  const router = useRouter()
  const { consultantId, selectedDate: newSelectedDate } =
    useLocalSearchParams() as { consultantId: string; selectedDate?: string }

  const today = new Date().toISOString().split("T")[0]

  const { date: storedDate, updateField } = useBookingStore()

  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)

  const { data: consultantData, isLoading: isConsultantLoading } =
    useGetConsultantById(consultantId)
  const { data: schedulesData, isLoading: isSchedulesLoading } =
    useGetSchedulesByConsultantId(consultantId, selectedDate || today)

  const isFetching = useIsFetching()
  const isMutating = useIsMutating()

  useEffect(() => {
    if (newSelectedDate) {
      setSelectedDate(newSelectedDate)
      updateField("date", newSelectedDate)
    }
  }, [newSelectedDate, updateField])

  useEffect(() => {
    onLoading?.(
      !consultantData ||
        isConsultantLoading ||
        !schedulesData ||
        isSchedulesLoading
    )
  }, [
    consultantData,
    isConsultantLoading,
    schedulesData,
    isSchedulesLoading,
    onLoading
  ])

  useEffect(() => {
    onOverlayLoading?.(isFetching > 0 || isMutating > 0)
  }, [isFetching, isMutating, onOverlayLoading])

  const handleDateSelect = (date: string) => {
    console.log(date)

    const formattedDate = new Date(date).toISOString().split("T")[0]
    setSelectedDate(formattedDate)
  }

  const handleScheduleSelect = (time: string) => {
    setSelectedTime(time)

    const timezoneOffset = new Date().getTimezoneOffset() * 60000
    const bookingDate = new Date(
      new Date(`${selectedDate}T${time}`).getTime() - timezoneOffset
    ).toISOString()

    updateField("date", bookingDate)
  }

  useEffect(() => {
    if (storedDate) {
      const formattedDate = storedDate.split("T")[0]
      setSelectedDate(formattedDate)
    } else {
      setSelectedDate(today)
    }
  }, [storedDate, today])

  const handleViewCalendar = () => {
    router.push({ pathname: "/calendars", params: { selectedDate } })
  }

  return (
    <View className="mt-2 pb-10">
      {consultantData && <ConsultantBio bio={consultantData.bio} />}

      <Section
        label="Ngày đặt lịch"
        actionText="Chọn ngày"
        onPress={handleViewCalendar}
      />

      <DaySelector
        initialDate={selectedDate ? new Date(selectedDate) : new Date(today)}
        onDateSelect={handleDateSelect}
      />

      <Section label="Thời gian" />

      <View className="flex-row flex-wrap gap-x-2 gap-y-3">
        {schedulesData?.map((schedule) =>
          schedule.timeSlots.map((slot) => (
            <TimeSlotSelector
              key={slot.startTime}
              startTime={slot.startTime}
              endTime={slot.endTime}
              isSelected={selectedTime === slot.startTime}
              status={slot.status}
              onPress={() => handleScheduleSelect(slot.startTime)}
            />
          ))
        )}
      </View>
    </View>
  )
}
