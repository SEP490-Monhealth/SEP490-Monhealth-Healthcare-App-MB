import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"

import { FlatList, Text, TouchableOpacity } from "react-native"

import { useRouter } from "expo-router"

import { Calendar } from "iconsax-react-native"

import { COLORS } from "@/constants/color"

import { formatUTCDate } from "@/utils/formatters"

import { HStack } from "../atoms/Stack"

interface DateProps {
  initialDate: Date
  onDateSelect: (date: string) => void
}

interface DayDetails {
  date: Date
  dayOfWeek: string
}

export const DaySelector = ({ initialDate, onDateSelect }: DateProps) => {
  const router = useRouter()

  const validInitialDate = useMemo(
    () =>
      initialDate instanceof Date && !isNaN(initialDate.getTime())
        ? initialDate
        : new Date(),
    [initialDate]
  )

  const [selectedDay, setSelectedDay] = useState<Date>(validInitialDate)
  const flatListScrollRef = useRef<FlatList<DayDetails>>(null)

  const daysInMonth = useMemo(() => {
    const totalDays = new Date(
      selectedDay.getFullYear(),
      selectedDay.getMonth() + 1,
      0
    ).getDate()
    return Array.from({ length: totalDays }, (_, i) => {
      const date = new Date(
        selectedDay.getFullYear(),
        selectedDay.getMonth(),
        i + 1
      )
      return {
        date,
        dayOfWeek: date.toLocaleString("vi-VN", { weekday: "narrow" })
      }
    })
  }, [selectedDay])

  const scrollToSelectedDate = useCallback(() => {
    const index = daysInMonth.findIndex(
      (day) => day.date.toDateString() === selectedDay.toDateString()
    )
    if (flatListScrollRef.current && index >= 0) {
      flatListScrollRef.current.scrollToIndex({ index, animated: true })
    }
  }, [selectedDay, daysInMonth])

  useEffect(() => {
    if (daysInMonth.length > 0) scrollToSelectedDate()
  }, [daysInMonth, selectedDay, scrollToSelectedDate])

  const handleSelectedDay = (date: Date) => {
    setSelectedDay(date)
    onDateSelect(formatUTCDate(date))
  }

  const handleCalendarPress = () => router.push("/Calendar")

  return (
    <TouchableOpacity activeOpacity={1}>
      <HStack center className="mb-4 justify-between">
        <Text className="font-tmedium text-lg text-primary">
          {selectedDay.toLocaleString("vi-VN", { month: "short" })},{" "}
          {selectedDay.getFullYear()}
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
          <DayItem
            date={item.date}
            dayOfWeek={item.dayOfWeek}
            selectedDay={selectedDay}
            onSelect={handleSelectedDay}
          />
        )}
        onScrollToIndexFailed={(info) => {
          setTimeout(
            () =>
              flatListScrollRef.current?.scrollToIndex({
                index: info.index,
                animated: true
              }),
            500
          )
        }}
      />
    </TouchableOpacity>
  )
}

const DayItem = React.memo(
  ({
    date,
    dayOfWeek,
    selectedDay,
    onSelect
  }: DayDetails & { selectedDay: Date; onSelect: (date: Date) => void }) => {
    const isSelected = date.toDateString() === selectedDay.toDateString()
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        className={`mr-2 h-20 w-[59px] items-center justify-center gap-1 rounded-xl border border-border px-2 py-4 ${isSelected ? "bg-primary" : "bg-card"}`}
        onPress={() => onSelect(date)}
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
)
