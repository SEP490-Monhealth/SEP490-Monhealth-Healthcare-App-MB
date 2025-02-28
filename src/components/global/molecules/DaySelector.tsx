import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react"

import { FlatList, Text, TouchableOpacity, View } from "react-native"

import { formatUTCDate } from "@/utils/formatters"

interface DateProps {
  initialDate: Date
  onDateSelect: (date: string) => void
}

interface DayProps {
  date: Date
  dayOfWeek: string
}

export const DaySelector = ({ initialDate, onDateSelect }: DateProps) => {
  const validInitialDate = useMemo(
    () =>
      initialDate instanceof Date && !isNaN(initialDate.getTime())
        ? initialDate
        : new Date(),
    [initialDate]
  )

  const [selectedDay, setSelectedDay] = useState<Date>(validInitialDate)
  const flatListScrollRef = useRef<FlatList<DayProps>>(null)

  useEffect(() => {
    setSelectedDay((prev) =>
      prev.toDateString() !== validInitialDate.toDateString()
        ? validInitialDate
        : prev
    )
  }, [validInitialDate])

  const daysInMonth = useMemo(() => {
    const totalDays = new Date(
      validInitialDate.getFullYear(),
      validInitialDate.getMonth() + 1,
      0
    ).getDate()

    return Array.from({ length: totalDays }, (_, i) => {
      const date = new Date(
        validInitialDate.getFullYear(),
        validInitialDate.getMonth(),
        i + 1
      )
      return {
        date,
        dayOfWeek: date.toLocaleString("vi-VN", { weekday: "narrow" })
      }
    })
  }, [validInitialDate])

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
  }, [selectedDay, scrollToSelectedDate])

  const handleSelectedDay = (date: Date) => {
    if (date.toDateString() !== selectedDay.toDateString()) {
      setSelectedDay(date)
      onDateSelect(formatUTCDate(date))
    }
  }

  return (
    <TouchableOpacity activeOpacity={1}>
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
        ItemSeparatorComponent={() => <View style={{ width: 8 }} />}
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

const DayItem = memo(
  ({
    date,
    dayOfWeek,
    selectedDay,
    onSelect
  }: DayProps & { selectedDay: Date; onSelect: (date: Date) => void }) => {
    const isSelected = date.toDateString() === selectedDay.toDateString()

    return (
      <TouchableOpacity
        activeOpacity={0.7}
        className={`h-20 items-center justify-center gap-1 rounded-xl border border-border px-2 py-4 ${
          isSelected ? "bg-primary" : "bg-card"
        }`}
        style={{ width: 50 }}
        onPress={() => onSelect(date)}
      >
        <Text
          className={`font-tbold text-base ${
            isSelected ? "text-white" : "text-primary"
          }`}
        >
          {dayOfWeek}
        </Text>

        <Text
          className={`font-tmedium text-base ${
            isSelected ? "text-white" : "text-accent"
          }`}
        >
          {date.getDate()}
        </Text>
      </TouchableOpacity>
    )
  }
)
