import { memo } from "react"

import { Text, TouchableOpacity, View } from "react-native"

import { HStack, VStack } from "@/components/global/atoms"

import { getDayLabel } from "@/utils/helpers"

export type TimeSlot = {
  dayOfWeek: number
  timeSlots: string[]
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

interface AddTimeButtonProps {
  onPress: () => void
}

const AddTimeButton = ({ onPress }: AddTimeButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      className="items-center justify-center rounded-xl border border-none bg-primary px-3 py-1.5"
    >
      <Text className="font-tmedium text-base text-white">Thêm</Text>
    </TouchableOpacity>
  )
}

interface SelectedTimeSlots {
  dayOfWeek: number
  timeSlots: string[]
}

interface DayTimeSlotsProps {
  data: TimeSlot[]
  day: number
  selectedTimeSlots: SelectedTimeSlots[]
  toggleTimeSlot: (day: number, time: string) => void
  isLastDay: boolean
  onAddTimeSlot: (day: number) => void
}

const DayTimeSlots = ({
  data,
  day,
  selectedTimeSlots,
  toggleTimeSlot,
  isLastDay,
  onAddTimeSlot
}: DayTimeSlotsProps) => {
  const selectedSlot = selectedTimeSlots.find((slot) => slot.dayOfWeek === day)
  const timeSlotsForDay = selectedSlot?.timeSlots || []

  const availableSlot = data.find((slot) => slot.dayOfWeek === day)
  const availableTimeSlotsForDay = availableSlot?.timeSlots || []

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

        <AddTimeButton onPress={() => onAddTimeSlot(day)} />
      </View>
    </HStack>
  )
}

const MemoizedDayTimeSlots = memo(DayTimeSlots)

interface TimeSlotSelectorProps {
  data: TimeSlot[]
  selectedDays: number[]
  selectedTimeSlots: SelectedTimeSlots[]
  toggleTimeSlot: (day: number, time: string) => void
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
      {selectedDays.map((day, index) => (
        <MemoizedDayTimeSlots
          key={day}
          data={data}
          day={day}
          selectedTimeSlots={selectedTimeSlots}
          toggleTimeSlot={toggleTimeSlot}
          isLastDay={index === selectedDays.length - 1}
          onAddTimeSlot={onOpenTimeSheet}
        />
      ))}
    </VStack>
  )
}
