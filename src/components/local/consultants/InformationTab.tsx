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

import { formatDateY } from "@/utils/formatters"

import { ConsultantBio } from "./ConsultantBio"

interface InformationTabProps {
  onOverlayLoading: (isLoading: boolean) => void
}

export const InformationTab = ({ onOverlayLoading }: InformationTabProps) => {
  const router = useRouter()
  const { consultantId, selectedDate: newSelectedDate } =
    useLocalSearchParams() as { consultantId: string; selectedDate?: string }

  const today = formatDateY(new Date())

  // console.log(today)

  const { date: storedDate, updateField } = useBookingStore()

  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)

  const { data: consultantData } = useGetConsultantById(consultantId)
  const { data: schedulesData } = useGetSchedulesByConsultantId(
    consultantId,
    undefined,
    selectedDate || today
  )

  const isFetching = useIsFetching()
  const isMutating = useIsMutating()

  useEffect(() => {
    if (newSelectedDate) {
      setSelectedDate(newSelectedDate)
      updateField("date", newSelectedDate)
    }
  }, [newSelectedDate, updateField])

  useEffect(() => {
    onOverlayLoading?.(isFetching > 0 || isMutating > 0)
  }, [isFetching, isMutating, onOverlayLoading])

  const handleDateSelect = (date: string) => {
    const formattedDate = new Date(date).toISOString().split("T")[0]
    setSelectedDate(formattedDate)

    updateField("date", formattedDate)
  }

  const handleScheduleSelect = (startTime: string, endTime: string) => {
    setSelectedTime(startTime)

    updateField("startTime", startTime)
    updateField("endTime", endTime)
  }

  useEffect(() => {
    if (storedDate) {
      setSelectedDate(storedDate)
    } else {
      setSelectedDate(today)
      updateField("date", today)
    }
  }, [storedDate, today, updateField])

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
              date={selectedDate || today}
              bufferMinutes={60}
              onPress={() => handleScheduleSelect(slot.startTime, slot.endTime)}
            />
          ))
        )}
      </View>
    </View>
  )
}
