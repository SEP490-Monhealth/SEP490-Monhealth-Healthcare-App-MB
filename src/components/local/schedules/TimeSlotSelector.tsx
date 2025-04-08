import React, { memo } from "react"

import { Text, TouchableOpacity, View } from "react-native"

import { HStack, VStack } from "@/components/global/atoms"

import { getDayLabel } from "@/utils/helpers"

export type TimeSlot = {
  dayOfWeek: number
  timeSlots: string[]
}

interface TimeSlotButtonProps {
  timeRange: string
  isSelected: boolean
  onPress: () => void
}

const TimeSlotButton = ({
  timeRange,
  isSelected,
  onPress
}: TimeSlotButtonProps) => (
  <TouchableOpacity
    activeOpacity={0.8}
    onPress={onPress}
    className={`items-center justify-center rounded-xl ${
      isSelected ? "bg-primary" : "border border-border bg-card"
    } px-3 py-1.5`}
  >
    <Text
      className={`font-tmedium text-base ${isSelected ? "text-white" : "text-primary"}`}
    >
      {timeRange}
    </Text>
  </TouchableOpacity>
)

interface AddTimeButtonProps {
  onPress: () => void
}

const AddTimeButton = ({ onPress }: AddTimeButtonProps) => (
  <TouchableOpacity
    activeOpacity={0.8}
    onPress={onPress}
    className="items-center justify-center rounded-xl bg-primary px-3 py-1.5"
  >
    <Text className="font-tmedium text-base text-white">Thêm</Text>
  </TouchableOpacity>
)

interface DayTimeSlotsProps {
  day: number
  availableTimeSlots: string[]
  selectedTimeSlots: string[]
  toggleTimeSlot: (timeRange: string) => void
  isLastDay: boolean
  onAddTimeSlot: () => void
}

const DayTimeSlots = ({
  day,
  availableTimeSlots,
  selectedTimeSlots,
  toggleTimeSlot,
  isLastDay,
  onAddTimeSlot
}: DayTimeSlotsProps) => {
  const allTimeSlots = Array.from(
    new Set([...availableTimeSlots, ...selectedTimeSlots])
  ).sort()

  return (
    <HStack
      center
      gap={16}
      className={`pb-2 ${!isLastDay ? "border-b border-border" : ""}`}
    >
      <View className="items-center" style={{ width: 64 }}>
        <Text
          className={`font-tmedium text-primary ${
            isLastDay ? "text-base" : "text-lg"
          }`}
        >
          {getDayLabel(day)}
        </Text>
        <Text className="text-tregular text-sm text-secondary">
          {selectedTimeSlots.length} đã chọn
        </Text>
      </View>

      <View className="flex-1 flex-row flex-wrap gap-2">
        {allTimeSlots.map((timeRange) => (
          <TimeSlotButton
            key={timeRange}
            timeRange={timeRange}
            isSelected={selectedTimeSlots.includes(timeRange)}
            onPress={() => toggleTimeSlot(timeRange)}
          />
        ))}
        <AddTimeButton onPress={onAddTimeSlot} />
      </View>
    </HStack>
  )
}

const MemoizedDayTimeSlots = memo(DayTimeSlots)

interface TimeSlotSelectorProps {
  data: TimeSlot[]
  selectedDays: number[]
  selectedTimeSlots: { dayOfWeek: number; timeSlots: string[] }[]
  toggleTimeSlot: (day: number, timeRange: string) => void
  onOpenTimeSheet: (day: number) => void
}

export const TimeSlotSelector = ({
  data,
  selectedDays,
  selectedTimeSlots,
  toggleTimeSlot,
  onOpenTimeSheet
}: TimeSlotSelectorProps) => {
  if (selectedDays.length === 0) return null

  return (
    <VStack gap={8}>
      {selectedDays.map((day, index) => {
        const dayTimeSlots =
          selectedTimeSlots.find((slot) => slot.dayOfWeek === day)?.timeSlots ||
          []

        const availableSlot = data.find((slot) => slot.dayOfWeek === day)
        const availableTimeSlots = availableSlot?.timeSlots || []

        return (
          <MemoizedDayTimeSlots
            key={day}
            day={day}
            availableTimeSlots={availableTimeSlots}
            selectedTimeSlots={dayTimeSlots}
            toggleTimeSlot={(timeRange) => toggleTimeSlot(day, timeRange)}
            isLastDay={index === selectedDays.length - 1}
            onAddTimeSlot={() => onOpenTimeSheet(day)}
          />
        )
      })}
    </VStack>
  )
}
