import React, { useEffect, useState } from "react"

import { Text, TouchableOpacity, View } from "react-native"

import { useLocalSearchParams, useRouter } from "expo-router"

import { LoadingScreen } from "@/app/loading"

import { VStack } from "@/components/global/atoms"
import { TimeSlotSelector } from "@/components/global/molecules"
import { DaySelector } from "@/components/global/molecules/DaySelector"
import { Section } from "@/components/global/organisms"

import { sampleConsultantsData } from "@/constants/consultants"
import { sampleSchedulesData } from "@/constants/schedules"

export const InformationTab = () => {
  const router = useRouter()
  const { consultantId } = useLocalSearchParams() as { consultantId: string }

  const consultantData = sampleConsultantsData.find(
    (c) => c.consultantId === consultantId
  )

  const scheduleData = sampleSchedulesData

  const today = new Date()

  const [expanded, setExpanded] = useState<boolean>(false)
  const [selectedDate, setSelectedDate] = useState<string | null>(
    today.toISOString()
  )
  const [selectedTime, setSelectedTime] = useState<string | null>(null)

  // const bookingDate =
  //   selectedDate && selectedTime
  //     ? new Date(
  //         `${selectedDate.split("T")[0]}T${selectedTime}:00.000Z`
  //       ).toISOString()
  //     : null

  // console.log("🚀 ~ InformationTab ~ bookingDate:", bookingDate)

  const handleDateSelect = (date: string) => {
    setSelectedDate(date)
    console.log(date)
  }

  useEffect(() => {
    console.log("selectedDate updated: ", selectedDate)
  }, [selectedDate])

  const handleTimeSelect = (scheduleId: string) => {
    setSelectedTime(selectedTime === scheduleId ? null : scheduleId)
  }

  const handleViewCalendar = () => router.push("/test/calendar")

  if (!consultantData) return <LoadingScreen />

  return (
    <VStack gap={12} className="mt-2 pb-10">
      <View>
        <Section label="Giới thiệu" margin={false} />

        <Text
          className="-mt-2 text-justify font-tregular text-base text-secondary"
          numberOfLines={expanded ? undefined : 3}
        >
          {consultantData.bio}
        </Text>

        {consultantData.bio.length > 150 && (
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => setExpanded(!expanded)}
          >
            <Text className="font-tmedium text-base text-secondary">
              {expanded ? "Thu gọn" : "Xem thêm"}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <View>
        <Section
          label="Ngày đặt lịch"
          margin={false}
          actionText="Chọn ngày"
          onPress={handleViewCalendar}
        />

        <DaySelector initialDate={today} onDateSelected={handleDateSelect} />
      </View>

      <View>
        <Section label="Thời gian" margin={false} />

        <View className="flex-row flex-wrap gap-2">
          {scheduleData.map((schedule) => (
            <TimeSlotSelector
              key={schedule.scheduleId}
              time={schedule.time}
              status={schedule.status}
              isSelected={selectedTime === schedule.scheduleId}
              onPress={() => handleTimeSelect(schedule.scheduleId)}
            />
          ))}
        </View>
      </View>
    </VStack>
  )
}
