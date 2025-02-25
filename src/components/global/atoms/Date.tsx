import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"

import { FlatList, Text, TouchableOpacity } from "react-native"

import { useRouter } from "expo-router"

import { Calendar } from "iconsax-react-native"

import { COLORS } from "@/constants/color"

import { formatUTCDate } from "@/utils/formatters"

import { HStack } from "./Stack"

interface DateProps {
  initialDate: Date
  onDateSelect: (date: string) => void
}

interface DayDetails {
  date: Date
  dayOfWeek: string
}

export const DatePicker = ({ initialDate, onDateSelect }: DateProps) => {
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
    onDateSelect(formatUTCDate(date))
  }

  const DayItem = ({ date, dayOfWeek }: DayDetails) => {
    const isSelected = date.toDateString() === selectedDay.toDateString()

    return (
      <TouchableOpacity
        activeOpacity={0.7}
        className={`mr-2 h-20 w-[59px] items-center justify-center gap-1 rounded-xl border border-border px-2 py-4 ${isSelected ? "bg-primary" : "bg-card"}`}
        onPress={() => handleSelectedDay(date)}
      >
        <Text
          className={`font-tbold text-base ${isSelected ? "text-white" : "text-primary"}`}
        >
          {dayOfWeek}
        </Text>

        <Text
          className={`font-tmedium text-base ${isSelected ? "text-white" : "text-accent"}`}
        >
          {date.getDate()}
        </Text>
      </TouchableOpacity>
    )
  }

  const month = selectedDay.toLocaleString("vi-VN", { month: "short" })
  const year = selectedDay.toLocaleString("vi-VN", { year: "numeric" })

  const handleCalendarPress = () => {
    router.push("/Calendar")
  }

  return (
    <TouchableOpacity activeOpacity={1}>
      <HStack center className="mb-4 justify-between">
        <Text className="font-tmedium text-lg text-primary">
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
    </TouchableOpacity>
  )
}
