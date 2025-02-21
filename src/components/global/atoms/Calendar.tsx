import React, { useMemo, useState } from "react"

import { FlatList, Text, TouchableOpacity, View } from "react-native"

import { ChevronLeft, ChevronRight } from "lucide-react-native"

import { COLORS } from "@/constants/color"

import { formatUTCDate } from "@/utils/formatters"

import { HStack } from "./Stack"

const daysOfWeek = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"]

export const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())

  const daysInMonth = useMemo(() => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)

    const days = []
    const firstDayIndex = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1

    const prevMonthLastDay = new Date(year, month, 0)
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      days.push(new Date(year, month - 1, prevMonthLastDay.getDate() - i))
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i))
    }

    const remainingDays = 7 - (days.length % 7)
    if (remainingDays < 7) {
      for (let i = 1; i <= remainingDays; i++) {
        days.push(new Date(year, month + 1, i))
      }
    }

    return days
  }, [currentDate])

  const handlePrevMonth = () => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1))
    setSelectedDate(null)
  }

  const handleNextMonth = () => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1))
    setSelectedDate(null)
  }

  const handleDayPress = (date: Date) => {
    setSelectedDate(date)
    console.log("Selected Date:", formatUTCDate(date))
  }

  const renderDay = ({ item }: { item: Date | null }) => {
    const isToday = item && item.toDateString() === new Date().toDateString()

    const isActive =
      item &&
      selectedDate &&
      item.toDateString() === selectedDate.toDateString()

    const isCurrentMonth = item && item.getMonth() === currentDate.getMonth()

    return (
      <View className="flex-1 items-center p-1" style={{ aspectRatio: 1 }}>
        {item ? (
          <TouchableOpacity
            activeOpacity={isCurrentMonth ? 0.7 : 1}
            className={`h-full w-full items-center justify-center rounded-xl ${
              isActive
                ? "bg-primary text-white"
                : isToday
                  ? "bg-border text-primary"
                  : "bg-transparent"
            }`}
            onPress={() => isCurrentMonth && handleDayPress(item)}
          >
            <Text
              className={`text-base ${
                isActive
                  ? "font-tbold text-white"
                  : isCurrentMonth
                    ? "font-tregular text-primary"
                    : "font-tregular text-border"
              }`}
            >
              {item.getDate()}
            </Text>
          </TouchableOpacity>
        ) : (
          <View className="h-10 w-10" />
        )}
      </View>
    )
  }

  return (
    <View>
      <HStack center className="mb-6 justify-between">
        <Text className="font-tbold text-xl text-primary">
          {`Tháng ${currentDate.getMonth() + 1}, ${currentDate.getFullYear()}`}
        </Text>

        <HStack gap={0}>
          <TouchableOpacity
            activeOpacity={0.7}
            className="p-2"
            onPress={handlePrevMonth}
          >
            <ChevronLeft size={24} color={COLORS.primary} />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            className="p-2"
            onPress={handleNextMonth}
          >
            <ChevronRight size={24} color={COLORS.primary} />
          </TouchableOpacity>
        </HStack>
      </HStack>

      <HStack gap={0} className="mb-2 flex-row justify-between">
        {daysOfWeek.map((day, index) => (
          <Text
            key={index}
            className="w-[14.28%] text-center font-tbold text-base text-primary"
          >
            {day}
          </Text>
        ))}
      </HStack>

      <FlatList
        data={daysInMonth}
        numColumns={7}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderDay}
        scrollEnabled={false}
        contentContainerStyle={{ flexGrow: 1 }}
      />
    </View>
  )
}
