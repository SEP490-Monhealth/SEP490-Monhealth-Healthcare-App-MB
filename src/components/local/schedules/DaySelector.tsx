import React, { memo, useEffect, useMemo, useRef } from "react"

import { Text, TouchableOpacity } from "react-native"

import { HStack } from "@/components/global/atoms"

import { DATA } from "@/constants/data"
import { RecurringDayEnum, ScheduleTypeEnum } from "@/constants/enum/Schedule"

import { ScheduleType } from "@/schemas/scheduleSchema"

interface DayButtonProps {
  day: { shortLabel: string; value: RecurringDayEnum; isNextWeek?: boolean }
  isSelected: boolean
  scheduleType: ScheduleTypeEnum
  onPress: () => void
  date?: Date
}

const DayButton = ({
  day,
  isSelected,
  scheduleType,
  onPress,
  date
}: DayButtonProps) => {
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

      {scheduleType === ScheduleTypeEnum.OneTime && date && (
        <Text
          className={`font-tmedium text-lg ${
            isSelected ? "text-white" : "text-primary"
          }`}
        >
          {date.getDate()}
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
  const processedInitially = useRef(false)
  const previousScheduleType = useRef<ScheduleTypeEnum | null>(null)

  useEffect(() => {
    if (
      previousScheduleType.current !== null &&
      previousScheduleType.current !== scheduleType &&
      setSelectedDays
    ) {
      setSelectedDays([])
      processedInitially.current = false
    }

    previousScheduleType.current = scheduleType

    if (
      !processedInitially.current &&
      existingSchedules?.length &&
      setSelectedDays
    ) {
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
        const allDaysSet = new Set([...selectedDays, ...daysWithSchedules])
        const allDays = Array.from(allDaysSet)

        if (allDays.length !== selectedDays.length) {
          setSelectedDays(allDays)
        }
      }

      processedInitially.current = true
    }
  }, [scheduleType, existingSchedules, setSelectedDays])

  const displayDaysWithDates = useMemo(() => {
    if (scheduleType === ScheduleTypeEnum.Recurring) {
      return {
        days: DATA.DAY_OF_WEEK,
        dates: null
      }
    } else {
      const now = new Date()
      const currentHour = now.getHours()

      const startDate = new Date(now)
      if (currentHour >= 18) {
        startDate.setDate(startDate.getDate() + 1)
      }

      const startDayOfWeek = startDate.getDay()

      const days = []
      const dates = []

      for (let i = 0; i < 7; i++) {
        const dayIndex = (startDayOfWeek + i) % 7
        const targetDate = new Date(startDate)
        targetDate.setDate(startDate.getDate() + i)

        const day = DATA.DAY_OF_WEEK.find((d) => d.value === dayIndex)
        if (day) {
          days.push({
            ...day,
            isNextWeek: i > 7 - startDayOfWeek
          })
          dates.push(targetDate)
        }
      }

      return {
        days,
        dates
      }
    }
  }, [scheduleType])

  return (
    <HStack gap={8}>
      {displayDaysWithDates.days?.map((day, index) => (
        <MemoizedDayButton
          key={day.value}
          day={day}
          isSelected={selectedDays.includes(day.value)}
          scheduleType={scheduleType}
          onPress={() => toggleDay(day.value)}
          date={
            displayDaysWithDates.dates
              ? displayDaysWithDates.dates[index]
              : undefined
          }
        />
      ))}
    </HStack>
  )
}
