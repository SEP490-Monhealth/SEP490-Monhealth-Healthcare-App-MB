import { memo } from "react"

import { Text, TouchableOpacity, View } from "react-native"

import { HStack, VStack } from "@/components/global/atoms"

import { RecurringDayEnum } from "@/constants/enum/Schedule"

import { ScheduleType, TimeSlotType } from "@/schemas/scheduleSchema"

import { getDayLabel } from "@/utils/helpers"

interface TimeSlotButtonProps {
  timeSlot: TimeSlotType
}

const TimeSlotButton = ({ timeSlot }: TimeSlotButtonProps) => {
  const formatTime = (time: string) => {
    const [hour, minute] = time.split(":")
    const formattedHour = parseInt(hour, 10)
    return minute === "00" ? `${formattedHour}h` : `${formattedHour}h${minute}`
  }

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      className="items-center justify-center rounded-xl border border-border bg-card px-3 py-1.5"
    >
      <Text className="font-tmedium text-base text-primary">
        {formatTime(timeSlot.startTime)} - {formatTime(timeSlot.endTime)}
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
      activeOpacity={0.8}
      onPress={onPress}
      className="items-center justify-center rounded-xl border border-none bg-primary px-3 py-1.5"
    >
      <Text className="font-tmedium text-base text-white">Thêm</Text>
    </TouchableOpacity>
  )
}

interface DayTimeSlotsProps {
  scheduleData: ScheduleType[]
  day: number
  isLastDay: boolean
  onAddTimeSlot: (scheduleId: string | null, day: number) => void
}

const DayTimeSlots = ({
  scheduleData,
  day,
  isLastDay,
  onAddTimeSlot
}: DayTimeSlotsProps) => {
  const scheduleForDay = scheduleData.find(
    (schedule) => schedule.recurringDay === (day as RecurringDayEnum)
  )

  const timeSlotsForDay = scheduleForDay?.timeSlots || []
  const timeSlotsCount = timeSlotsForDay.length || 0

  return (
    <HStack
      center
      gap={20}
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
        <Text className="text-tregular text-center text-sm text-secondary">
          {timeSlotsCount} khung giờ
        </Text>
      </View>

      <View className="flex-1 flex-row flex-wrap gap-2">
        {timeSlotsForDay.map((timeSlot) => (
          <TimeSlotButton
            key={`${timeSlot.startTime}-${timeSlot.endTime}`}
            timeSlot={timeSlot}
          />
        ))}

        <AddTimeButton
          onPress={() =>
            onAddTimeSlot(
              scheduleForDay ? scheduleForDay.scheduleId : null,
              day
            )
          }
        />
      </View>
    </HStack>
  )
}

const MemoizedDayTimeSlots = memo(DayTimeSlots)

interface ScheduleTimeSlotsProps {
  data: ScheduleType[]
  onOpenTimeSheet: (scheduleId: string | null, day: number) => void
}

export const ScheduleTimeSlots = ({
  data,
  onOpenTimeSheet
}: ScheduleTimeSlotsProps) => {
  const allDays = [0, 1, 2, 3, 4, 5, 6]

  return (
    <VStack gap={8}>
      {allDays.map((day, index) => (
        <MemoizedDayTimeSlots
          key={day}
          scheduleData={data}
          day={day}
          isLastDay={index === allDays.length - 1}
          onAddTimeSlot={(scheduleId, day) => onOpenTimeSheet(scheduleId, day)}
        />
      ))}
    </VStack>
  )
}
