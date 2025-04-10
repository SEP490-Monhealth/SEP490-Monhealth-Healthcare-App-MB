import React, { memo, useEffect } from "react"

import { Text, TouchableOpacity } from "react-native"

import { HStack } from "@/components/global/atoms"

import { DATA } from "@/constants/data"
import { RecurringDayEnum, ScheduleTypeEnum } from "@/constants/enum/Schedule"

import { ScheduleType } from "@/schemas/scheduleSchema"

interface DayButtonProps {
  day: { shortLabel: string; value: RecurringDayEnum }
  isSelected: boolean
  scheduleType: ScheduleTypeEnum
  onPress: () => void
}

const DayButton = ({
  day,
  isSelected,
  scheduleType,
  onPress
}: DayButtonProps) => {
  const today = new Date()
  const currentDay = today.getDay()
  const diff = (day.value - currentDay + 7) % 7
  const targetDate = new Date(today)
  targetDate.setDate(today.getDate() + diff)

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      className={`h-20 flex-1 items-center justify-center rounded-xl border ${
        isSelected ? "border-none bg-primary" : "border-border bg-card"
      } px-3 py-2`}
    >
      <Text
        className={`font-tmedium ${
          isSelected ? "text-white" : "text-primary"
        } ${scheduleType === ScheduleTypeEnum.Recurring ? "text-base" : "text-sm"}`}
      >
        {day.shortLabel}
      </Text>

      {scheduleType === ScheduleTypeEnum.OneTime && (
        <Text
          className={`font-tmedium text-lg ${
            isSelected ? "text-white" : "text-primary"
          }`}
        >
          {targetDate.getDate()}
        </Text>
      )}
    </TouchableOpacity>
  )
}

const MemoizedDayButton = memo(DayButton)

interface DaySelectorProps {
  selectedDays: RecurringDayEnum[]
  toggleDay: (day: RecurringDayEnum) => void
  scheduleType: ScheduleTypeEnum
  existingSchedules?: ScheduleType[] | null
  setSelectedDays?: (days: RecurringDayEnum[]) => void
}

export const DaySelector = ({
  selectedDays,
  toggleDay,
  scheduleType,
  existingSchedules = [],
  setSelectedDays
}: DaySelectorProps) => {
  useEffect(() => {
    if (!existingSchedules?.length || !setSelectedDays) return

    const daysWithSchedules = (existingSchedules || [])
      .filter((schedule) =>
        scheduleType === ScheduleTypeEnum.Recurring
          ? schedule.recurringDay !== null
          : schedule.specificDate !== null
      )
      .map((schedule) => schedule.recurringDay)
      .filter(
        (day): day is number => day !== null && day !== undefined
      ) as RecurringDayEnum[]

    if (daysWithSchedules.length > 0) {
      const allDays = Array.from(
        new Set([...selectedDays, ...daysWithSchedules])
      )
      setSelectedDays(allDays)
    }
  }, [existingSchedules, scheduleType, setSelectedDays])

  return (
    <HStack gap={8}>
      {DATA.DAY_OF_WEEK.map((day) => (
        <MemoizedDayButton
          key={day.value}
          day={day}
          isSelected={selectedDays.includes(day.value)}
          scheduleType={scheduleType}
          onPress={() => toggleDay(day.value)}
        />
      ))}
    </HStack>
  )
}
