import React, { useState } from "react"

import { Text, TouchableOpacity, View } from "react-native"

import { useLocalSearchParams } from "expo-router"

import { LoadingScreen } from "@/app/loading"

import { Button, VStack } from "@/components/global/atoms"
import { TimeSlotSelector } from "@/components/global/molecules"
import { DaySelector } from "@/components/global/molecules/DaySelector"
import { Section } from "@/components/global/organisms"

import { sampleConsultantsData } from "@/constants/consultants"
import { sampleSchedulesData } from "@/constants/schedules"

export const InformationTab = () => {
  const { consultantId } = useLocalSearchParams() as { consultantId: string }

  const today = new Date().toISOString()

  const [expanded, setExpanded] = useState<boolean>(false)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState<string | null>(today)

  const consultantData = sampleConsultantsData.find(
    (c) => c.consultantId === consultantId
  )

  const scheduleData = sampleSchedulesData

  if (!consultantData) return <LoadingScreen />

  const handleBooking = () => {
    if (selectedTime) {
      console.log("Schedule ID đã chọn:", selectedTime)
    }
  }

  const handleDateSelect = (date: string) => {
    setSelectedDate(date)
    console.log(date)
  }

  const handleSelectTime = (scheduleId: string) => {
    setSelectedTime(selectedTime === scheduleId ? null : scheduleId)
  }

  return (
    <VStack gap={20} className="mt-2 pb-10">
      <VStack>
        <Section label="Về tôi" margin={false} />

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
            <Text className="font-tmedium text-base text-accent">
              {expanded ? "Thu gọn" : "Xem thêm"}
            </Text>
          </TouchableOpacity>
        )}
      </VStack>

      <Section label="Đặt lịch" margin={false} />
      <VStack gap={20} className="-mt-6">
        <VStack>
          <DaySelector initialDate={today} onDateSelect={handleDateSelect} />

          <VStack gap={10} className="mt-4">
            <Text className="font-tmedium text-lg text-primary">
              Thời gian khả dụng
            </Text>

            <View className="my-2 flex flex-row flex-wrap gap-2">
              {scheduleData.map((schedule) => (
                <TimeSlotSelector
                  key={schedule.scheduleId}
                  time={schedule.time}
                  status={schedule.status}
                  isSelected={selectedTime === schedule.scheduleId}
                  onPress={() => handleSelectTime(schedule.scheduleId)}
                />
              ))}
            </View>
          </VStack>
        </VStack>

        <Button
          size="lg"
          disabled={selectedTime === null}
          onPress={handleBooking}
        >
          Đặt lịch
        </Button>
      </VStack>
    </VStack>
  )
}
