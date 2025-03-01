import React, { useEffect, useState } from "react"

import { View } from "react-native"

import { useLocalSearchParams, useRouter } from "expo-router"

import { LoadingScreen } from "@/app/loading"

import { VStack } from "@/components/global/atoms"
import { TimeSlotSelector } from "@/components/global/molecules"
import { DaySelector } from "@/components/global/molecules/DaySelector"
import { Section } from "@/components/global/organisms"

import { sampleConsultantsData } from "@/constants/consultants"
import { sampleSchedulesData } from "@/constants/schedules"

import { ConsultantBio } from "./ConsultantBio"

export const InformationTab = () => {
  const router = useRouter()
  const { consultantId, selectedDate: newSelectedDate } =
    useLocalSearchParams() as { consultantId: string; selectedDate?: string }

  const consultantData = sampleConsultantsData.find(
    (c) => c.consultantId === consultantId
  )
  const schedulesData = sampleSchedulesData

  const today = new Date().toISOString().split("T")[0]

  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedScheduleId, setSelectedScheduleId] = useState<string | null>(
    null
  )

  useEffect(() => {
    if (newSelectedDate) {
      const formattedDate = newSelectedDate.split("T")[0]
      setSelectedDate(formattedDate)
    } else {
      setSelectedDate(today)
    }
  }, [newSelectedDate])

  console.log("🚀 Final Selected Date:", selectedDate)

  const selectedSchedule = schedulesData.find(
    (schedule) => schedule.scheduleId === selectedScheduleId
  )

  const timezoneOffset = new Date().getTimezoneOffset() * 60000

  const bookingDate =
    selectedDate && selectedSchedule
      ? new Date(
          new Date(`${selectedDate}T${selectedSchedule.time}:00`).getTime() -
            timezoneOffset
        ).toISOString()
      : null

  // console.log(bookingDate)

  const handleDateSelect = (date: string) => {
    const formattedDate = new Date(date).toISOString().split("T")[0]
    setSelectedDate(formattedDate)
    console.log("🚀 Selected Date:", formattedDate)
  }

  const handleScheduleSelect = (scheduleId: string) => {
    setSelectedScheduleId(scheduleId)
  }

  const handleViewCalendar = () => {
    router.push({
      pathname: "/consultants/calendar",
      params: { selectedDate }
    })
  }

  if (!consultantData) return <LoadingScreen />

  return (
    <VStack gap={12} className="mt-2 pb-10">
      {/* Consultant Bio Section */}
      <ConsultantBio bio={consultantData.bio} />

      <View>
        <Section
          label="Ngày đặt lịch"
          margin={false}
          actionText="Chọn ngày"
          onPress={handleViewCalendar}
        />
        <DaySelector
          initialDate={selectedDate ? new Date(selectedDate) : new Date(today)}
          onDateSelect={handleDateSelect}
        />
      </View>

      <View>
        <Section label="Thời gian" margin={false} />

        <View className="flex-row flex-wrap gap-2">
          {schedulesData.map((schedule) => (
            <TimeSlotSelector
              key={schedule.scheduleId}
              time={schedule.time}
              isSelected={selectedScheduleId === schedule.scheduleId}
              status={schedule.status}
              onPress={() => handleScheduleSelect(schedule.scheduleId)}
            />
          ))}
        </View>
      </View>
    </VStack>
  )
}
