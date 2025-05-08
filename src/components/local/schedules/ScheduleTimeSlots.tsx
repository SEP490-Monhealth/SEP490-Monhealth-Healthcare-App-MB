import { memo } from "react"

import { Text, TouchableOpacity, View } from "react-native"

import { Feather } from "@expo/vector-icons"

import { HStack, VStack } from "@/components/global/atoms"

import { COLORS } from "@/constants/color"
import { ScheduleTypeEnum } from "@/constants/enum/Schedule"

import { useDeleteScheduleTimeSlot } from "@/hooks/useSchedule"

import { ScheduleType, TimeSlotType } from "@/schemas/scheduleSchema"

import { getDayLabel } from "@/utils/helpers"

interface TimeSlotButtonProps {
  timeSlot: TimeSlotType
  onDeletePress?: () => void
}

const TimeSlotButton = ({ timeSlot, onDeletePress }: TimeSlotButtonProps) => {
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
      <HStack center>
        <Text className="font-tmedium text-base text-primary">
          {formatTime(timeSlot.startTime)} - {formatTime(timeSlot.endTime)}
        </Text>

        <Feather
          name="x"
          size={18}
          color={COLORS.accent}
          onPress={onDeletePress}
        />
      </HStack>
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
  onAddTimeSlot: (scheduleId: string | null, day: number) => void
}

const DayTimeSlots = ({
  scheduleData,
  day,
  onAddTimeSlot
}: DayTimeSlotsProps) => {
  const { mutate: deleteScheduleTimeSlot } = useDeleteScheduleTimeSlot()

  const scheduleForDay = scheduleData.find(
    (schedule) => schedule.recurringDay === day
  )

  const timeSlotsForDay = scheduleForDay?.timeSlots || []
  const timeSlotsCount = timeSlotsForDay.length || 0

  return (
    <HStack
      center
      gap={20}
      className={`pb-2 ${scheduleForDay ? "border-b border-border" : ""}`}
    >
      <View className="items-center" style={{ width: 64 }}>
        <Text className="font-tmedium text-base text-primary">
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
            onDeletePress={() =>
              deleteScheduleTimeSlot(timeSlot.scheduleTimeSlotId)
            }
          />
        ))}

        {scheduleForDay ? (
          <AddTimeButton
            onPress={() =>
              onAddTimeSlot(
                scheduleForDay ? scheduleForDay.scheduleId : null,
                day
              )
            }
          />
        ) : (
          <AddTimeButton onPress={() => onAddTimeSlot(null, day)} />
        )}
      </View>
    </HStack>
  )
}

const MemoizedDayTimeSlots = memo(DayTimeSlots)

interface ScheduleTimeSlotsProps {
  data: ScheduleType[]
  scheduleType: ScheduleTypeEnum
  onOpenTimeSheet: (scheduleId: string | null, day: number) => void
}

export const ScheduleTimeSlots = ({
  data,
  onOpenTimeSheet,
  scheduleType
}: ScheduleTimeSlotsProps) => {
  const { mutate: deleteScheduleTimeSlot } = useDeleteScheduleTimeSlot()

  if (scheduleType === ScheduleTypeEnum.Recurring) {
    const daysWithData = data.map((schedule) => schedule.recurringDay as number)

    return (
      <VStack gap={8}>
        {daysWithData.map((day) => (
          <MemoizedDayTimeSlots
            key={`recurring-${day}`}
            scheduleData={data}
            day={day}
            onAddTimeSlot={(scheduleId, day) =>
              onOpenTimeSheet(scheduleId, day)
            }
          />
        ))}
      </VStack>
    )
  }

  return (
    <VStack gap={8}>
      {data.map((schedule) => (
        <HStack
          key={schedule.scheduleId}
          center
          gap={20}
          className="border-b border-border pb-2"
        >
          <View className="items-center" style={{ width: 64 }}>
            <Text className="font-tmedium text-sm text-primary">
              {new Date(schedule.specificDate!).toLocaleDateString("vi-VN", {
                weekday: "narrow",
                day: "2-digit",
                month: "2-digit"
              })}
            </Text>
            <Text className="text-tregular text-center text-sm text-secondary">
              {schedule.timeSlots.length} khung giờ
            </Text>
          </View>

          <View className="flex-1 flex-row flex-wrap gap-2">
            {schedule.timeSlots.map((timeSlot) => (
              <TimeSlotButton
                key={`${timeSlot.startTime}-${timeSlot.endTime}`}
                timeSlot={timeSlot}
                onDeletePress={() =>
                  deleteScheduleTimeSlot(timeSlot.scheduleTimeSlotId)
                }
              />
            ))}

            <AddTimeButton
              onPress={() => onOpenTimeSheet(schedule.scheduleId, -1)}
            />
          </View>
        </HStack>
      ))}
    </VStack>
  )
}
