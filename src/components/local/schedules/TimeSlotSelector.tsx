import React, { memo } from "react"

import { Text, TouchableOpacity, View } from "react-native"

import { HStack, VStack } from "@/components/global/atoms"

import { ScheduleType } from "@/schemas/scheduleSchema"

import { getDayLabel } from "@/utils/helpers"

export type TimeSlot = {
  dayOfWeek: number
  timeSlots: string[]
}

interface TimeSlotButtonProps {
  timeRange: string
  isSelected: boolean
  isExisting: boolean
  onPress: () => void
}

const TimeSlotButton = ({
  timeRange,
  isSelected,
  isExisting,
  onPress
}: TimeSlotButtonProps) => {
  const isPrimary = isSelected || isExisting
  const isDisabled = isExisting

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={isDisabled}
      className={`items-center justify-center rounded-xl border ${
        isPrimary ? "bg-primary" : "border-border bg-card"
      } px-3 py-1.5`}
    >
      <Text
        className={`font-tmedium text-base ${
          isPrimary ? "text-white" : "text-primary"
        }`}
      >
        {timeRange}
      </Text>
    </TouchableOpacity>
  )
}

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
  existingTimeSlots: string[]
  toggleTimeSlot: (timeRange: string) => void
  onAddTimeSlot: () => void
}

const formatTimeSlot = (start: string, end: string): string => {
  const formatTime = (time: string) => time.substring(0, 5)
  return `${formatTime(start)} - ${formatTime(end)}`
}

const DayTimeSlots = ({
  day,
  availableTimeSlots,
  selectedTimeSlots,
  existingTimeSlots,
  toggleTimeSlot,
  onAddTimeSlot
}: DayTimeSlotsProps) => {
  const allTimeSlots = Array.from(
    new Set([...availableTimeSlots, ...selectedTimeSlots, ...existingTimeSlots])
  ).sort()

  const selectedCount = selectedTimeSlots.length
  const existingCount = existingTimeSlots.length

  return (
    <HStack center gap={16} className="border-b border-border pb-2">
      <View className="items-center" style={{ width: 64 }}>
        <Text className="font-tmedium text-base text-primary">
          {getDayLabel(day)}
        </Text>
        <Text className="text-tregular text-sm text-secondary">
          {selectedCount + existingCount} đã chọn
        </Text>
      </View>

      <View className="flex-1 flex-row flex-wrap gap-2">
        {allTimeSlots.map((timeRange) => {
          const isSelected = selectedTimeSlots.includes(timeRange)
          const isExisting = existingTimeSlots.includes(timeRange)

          return (
            <TimeSlotButton
              key={timeRange}
              timeRange={timeRange}
              isSelected={isSelected}
              isExisting={isExisting}
              onPress={() => toggleTimeSlot(timeRange)}
            />
          )
        })}
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
  existingSchedules?: ScheduleType[] | null
}

export const TimeSlotSelector = ({
  data,
  selectedDays,
  selectedTimeSlots,
  toggleTimeSlot,
  onOpenTimeSheet,
  existingSchedules = []
}: TimeSlotSelectorProps) => {
  if (selectedDays.length === 0) return null

  const getExistingTimeSlots = (day: number): string[] => {
    const daySchedules = (existingSchedules || []).filter(
      (schedule) => schedule.recurringDay === day
    )

    return daySchedules.flatMap((schedule) => {
      return schedule.timeSlots
        .map((slot) => {
          if (typeof slot === "string") {
            return slot
          } else if (
            typeof slot === "object" &&
            slot.startTime &&
            slot.endTime
          ) {
            return formatTimeSlot(slot.startTime, slot.endTime)
          }
          return ""
        })
        .filter((slot) => slot !== "")
    })
  }

  const sortedDays = [...selectedDays].sort((a, b) => a - b)

  return (
    <VStack gap={8}>
      {sortedDays.map((day) => {
        const dayTimeSlots =
          selectedTimeSlots.find((slot) => slot.dayOfWeek === day)?.timeSlots ||
          []

        const availableSlot = data.find((slot) => slot.dayOfWeek === day)
        const availableTimeSlots = availableSlot?.timeSlots || []

        const existingTimeSlots = getExistingTimeSlots(day)

        return (
          <MemoizedDayTimeSlots
            key={day}
            day={day}
            availableTimeSlots={availableTimeSlots}
            selectedTimeSlots={dayTimeSlots}
            existingTimeSlots={existingTimeSlots}
            toggleTimeSlot={(timeRange) => toggleTimeSlot(day, timeRange)}
            onAddTimeSlot={() => onOpenTimeSheet(day)}
          />
        )
      })}
    </VStack>
  )
}
