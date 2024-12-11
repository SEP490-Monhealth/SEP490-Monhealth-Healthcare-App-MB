import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"

import { FlatList, Text, TouchableOpacity, View } from "react-native"

import { Calendar } from "iconsax-react-native"

import { Card, HStack } from "@/components/global/atoms"

import { COLORS } from "@/constants/appConstants"

interface DateOfMonthListProps {
  date: Date
}

interface DayItem {
  date: Date
  day: string
  fullDate: string
}

const DateOfMonthList = ({ date }: DateOfMonthListProps) => {
  const [days, setDays] = useState<DayItem[]>([])
  const [selectedDate, setSelectedDate] = useState(date)

  const flatListRef = useRef<FlatList<DayItem>>(null)

  const generateDays = useMemo(() => {
    const date = selectedDate
    if (!date) return []

    const year = date.getFullYear()
    const month = date.getMonth()

    const dayInMonth = new Date(year, month + 1, 0).getDate()

    const daysArr: DayItem[] = []

    for (let i = 1; i <= dayInMonth; i++) {
      const date = new Date(Date.UTC(year, month, i))
      daysArr.push({
        date,
        day: date.toLocaleString("vi-VN", { weekday: "narrow" }),
        fullDate: date?.toLocaleDateString()
      })
    }

    setDays(daysArr)
    return daysArr
  }, [selectedDate])

  const handleScroll = useCallback(() => {
    const index = days.findIndex(
      (day) => day?.date?.toDateString() === selectedDate.toDateString()
    )
    if (flatListRef?.current && index >= 0) {
      flatListRef?.current?.scrollToIndex({ index, animated: true })
    }
  }, [selectedDate, days])

  useEffect(() => {
    setSelectedDate(date)
  }, [date])

  useEffect(() => {
    if (days.length > 0) {
      handleScroll()
    }
  }, [days, selectedDate, handleScroll])

  const DateItemView = ({ date, day }: DayItem) => {
    const isSelected = date?.toDateString() === selectedDate.toDateString()
    return (
      <TouchableOpacity
        className={`h-20 w-[45px] items-center justify-center gap-2 rounded-lg px-2 py-4 ${isSelected ? "bg-primary" : ""}`}
        onPress={() => {
          setSelectedDate(date)
          console.log("Ngày chọn nè tòn cưng:", date)
        }}
      >
        <Text
          className={`font-tbold ${isSelected ? "text-white" : "text-secondary-foreground"}`}
        >
          {day}
        </Text>
        <Text
          className={`${isSelected ? "text-white" : "text-typography"}`}
        >
          {date?.getDate()}
        </Text>
      </TouchableOpacity>
    )
  }

  const monthName = date.toLocaleString("vi-VN", { month: "short" })
  const YearName = date.toLocaleString("vi-VN", { year: "numeric" })

  return (
    <Card>
      <HStack className="justify-between">
        <Text className="mb-4 font-tmedium text-xl text-typography">
          {monthName}, {YearName}
        </Text>
        <Calendar variant="Bold" size={24} color={COLORS.primary} />
      </HStack>

      <FlatList
        ref={flatListRef}
        data={days}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        renderItem={({ item }) => <DateItemView {...item} />}
        showsHorizontalScrollIndicator={false}
        onScrollToIndexFailed={(info) => {
          const promise = new Promise((resolve) => setTimeout(resolve, 500))
          promise.then(() => {
            if (flatListRef.current) {
              flatListRef?.current?.scrollToIndex({
                index: info?.index,
                animated: true
              })
            }
          })
        }}
      />
    </Card>
  )
}

export default DateOfMonthList
