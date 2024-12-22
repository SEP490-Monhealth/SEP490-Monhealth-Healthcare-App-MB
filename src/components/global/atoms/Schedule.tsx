import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"

import { FlatList, Text, TouchableOpacity } from "react-native"

import { useRouter } from "expo-router"

import { Calendar } from "iconsax-react-native"

import { Card, HStack } from "@/components/global/atoms"

import { COLORS } from "@/constants/app"

import { formatUTCDate } from "@/utils/formatters"

interface ScheduleProps {
  initialDate: Date
}

interface DayDetails {
  date: Date
  dayOfWeek: string
}

export const Schedule = ({ initialDate }: ScheduleProps) => {
  const router = useRouter()

  const validInitialDate = useMemo(() => {
    if (initialDate instanceof Date && !isNaN(initialDate.getTime())) {
      return initialDate
    }
    return new Date()
  }, [initialDate])

  const [selectedDay, setSelectedDay] = useState<Date>(validInitialDate)

  const daysInMonth = useMemo(() => {
    const selectedDate = selectedDay
    const selectedMonth = selectedDate.getMonth()
    const selectedYear = selectedDate.getFullYear()

    const totalDaysInMonth = new Date(
      selectedYear,
      selectedMonth + 1,
      0
    ).getDate()

    return Array.from({ length: totalDaysInMonth }, (_, i) => {
      const dayDate = new Date(selectedYear, selectedMonth, i + 1)
      return {
        date: dayDate,
        dayOfWeek: dayDate.toLocaleString("vi-VN", { weekday: "narrow" })
      }
    })
  }, [selectedDay])

  const flatListScrollRef = useRef<FlatList<DayDetails>>(null)

  const scrollToSelectedDate = useCallback(() => {
    const index = daysInMonth.findIndex(
      (day) => day.date.toDateString() === selectedDay.toDateString()
    )
    if (flatListScrollRef.current && index >= 0) {
      flatListScrollRef.current.scrollToIndex({ index, animated: true })
    }
  }, [selectedDay, daysInMonth])

  useEffect(() => {
    if (daysInMonth.length > 0) {
      scrollToSelectedDate()
    }
  }, [daysInMonth, selectedDay, scrollToSelectedDate])

  const handleSelectedDay = (date: Date) => {
    setSelectedDay(date)
    console.log("Selected Date:", formatUTCDate(date))
  }

  const DayItem = ({ date, dayOfWeek }: DayDetails) => {
    const isSelected = date.toDateString() === selectedDay.toDateString()

    return (
      <TouchableOpacity
        activeOpacity={0.7}
        className={`h-20 w-[45px] items-center justify-center gap-3 rounded-xl px-2 py-4 ${isSelected ? "bg-primary" : ""}`}
        onPress={() => handleSelectedDay(date)}
      >
        <Text
          className={`font-tbold text-base ${isSelected ? "text-white" : "text-primary"}`}
        >
          {dayOfWeek}
        </Text>

        <Text
          className={`font-tmedium text-base leading-5 ${isSelected ? "text-white" : "text-accent"}`}
        >
          {date.getDate()}
        </Text>
      </TouchableOpacity>
    )
  }

  const month = selectedDay.toLocaleString("vi-VN", { month: "short" })
  const year = selectedDay.toLocaleString("vi-VN", { year: "numeric" })

  const handleCalendarPress = () => {
    router.push("/schedules/calendar")
  }

  return (
    <Card activeOpacity={1}>
      <HStack center className="mb-4 justify-between">
        <Text className="font-tbold text-xl text-primary">
          {month}, {year}
        </Text>

        <Calendar
          variant="Bold"
          size={24}
          color={COLORS.primary}
          onPress={handleCalendarPress}
        />
      </HStack>

      <FlatList
        horizontal
        ref={flatListScrollRef}
        data={daysInMonth}
        keyExtractor={(item) => item.date.toISOString()}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <DayItem date={item.date} dayOfWeek={item.dayOfWeek} />
        )}
        onScrollToIndexFailed={(info) => {
          setTimeout(() => {
            if (flatListScrollRef.current) {
              flatListScrollRef.current.scrollToIndex({
                index: info.index,
                animated: true
              })
            }
          }, 500)
        }}
      />
    </Card>
  )
}
