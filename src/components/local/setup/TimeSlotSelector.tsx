import { memo } from "react"

import { Text, TouchableOpacity, View } from "react-native"

import { HStack, VStack } from "@/components/global/atoms"

import { getDayLabel } from "@/utils/helpers"

const defaultTimeSlots: { [key: number]: string[] } = {
  0: ["08:00", "09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
  1: ["08:00", "09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
  2: ["08:00", "09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
  3: ["08:00", "09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
  4: ["08:00", "09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
  5: ["09:00", "10:00", "11:00", "14:00", "15:00"],
  6: ["09:00", "10:00", "11:00"]
}

interface TimeSlotButtonProps {
  time: string
  isSelected: boolean
  onPress: () => void
}

const TimeSlotButton = ({ time, isSelected, onPress }: TimeSlotButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      className={`items-center justify-center rounded-xl border ${
        isSelected ? "border-none bg-primary" : "border-border bg-card"
      } px-3 py-1.5`}
    >
      <Text
        className={`font-tmedium text-base ${isSelected ? "text-white" : "text-primary"}`}
      >
        {time}
      </Text>
    </TouchableOpacity>
  )
}

const AddTimeButton = () => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className="items-center justify-center rounded-xl border border-none bg-primary px-3 py-1.5"
    >
      <Text className="font-tmedium text-base text-white">Thêm</Text>
    </TouchableOpacity>
  )
}

interface DayTimeSlotsProps {
  day: number
  selectedTimeSlots: Record<number, string[]>
  toggleTimeSlot: (day: number, time: string) => void
  isLastDay: boolean
}

const DayTimeSlots = ({
  day,
  selectedTimeSlots,
  toggleTimeSlot,
  isLastDay
}: DayTimeSlotsProps) => {
  const timeSlotsForDay = selectedTimeSlots[day] || []
  const availableTimeSlotsForDay = defaultTimeSlots[day] || []

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
          {timeSlotsForDay.length || 0} đã chọn
        </Text>
      </View>

      <View className="flex-1 flex-row flex-wrap gap-2">
        {availableTimeSlotsForDay.map((time) => (
          <TimeSlotButton
            key={time}
            time={time}
            isSelected={timeSlotsForDay.includes(time)}
            onPress={() => toggleTimeSlot(day, time)}
          />
        ))}

        <AddTimeButton />
      </View>
    </HStack>
  )
}

const MemoizedDayTimeSlots = memo(DayTimeSlots)

interface TimeSlotSelectorProps {
  selectedDays: number[]
  selectedTimeSlots: Record<number, string[]>
  toggleTimeSlot: (day: number, time: string) => void
}

export const TimeSlotSelector = ({
  selectedDays,
  selectedTimeSlots,
  toggleTimeSlot
}: TimeSlotSelectorProps) => {
  if (selectedDays.length === 0) return null

  return (
    <VStack gap={8}>
      {selectedDays.map((day, index) => (
        <MemoizedDayTimeSlots
          key={day}
          day={day}
          selectedTimeSlots={selectedTimeSlots}
          toggleTimeSlot={toggleTimeSlot}
          isLastDay={index === selectedDays.length - 1}
        />
      ))}
    </VStack>
  )
}
