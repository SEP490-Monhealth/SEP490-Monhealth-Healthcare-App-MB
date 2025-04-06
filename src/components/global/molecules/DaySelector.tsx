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
  visibleDays?: number
  disablePastDates?: boolean
  futureMonths?: number
}

interface DayProps {
  date: Date
  dayOfWeek: string
  itemWidth: number
  isDisabled?: boolean
}

export const DaySelector = ({
  initialDate,
  onDateSelect,
  visibleDays = 6,
  disablePastDates = true,
  futureMonths = 3
}: DateProps) => {
  const today = useMemo(() => {
    const date = new Date()
    date.setHours(0, 0, 0, 0)
    return date
  }, [])

  const validInitialDate = useMemo(() => {
    const isValidDate =
      initialDate instanceof Date && !isNaN(initialDate.getTime())
    if (!isValidDate) return today

    if (disablePastDates && initialDate < today) return today

    return initialDate
  }, [initialDate, today, disablePastDates])

  const [selectedDay, setSelectedDay] = useState<Date>(validInitialDate)
  const FlatListRef = useRef<FlatList<DayProps>>(null)

  useEffect(() => {
    setSelectedDay((prev) =>
      prev.toDateString() !== validInitialDate.toDateString()
        ? validInitialDate
        : prev
    )
  }, [validInitialDate])

  const daysInFuturePeriod = useMemo(() => {
    const endDate = new Date(today)
    endDate.setMonth(today.getMonth() + futureMonths)

    const days: DayProps[] = []
    const startDate = disablePastDates
      ? today
      : new Date(validInitialDate.getFullYear(), validInitialDate.getMonth(), 1)
    const currentDate = new Date(startDate)

    while (currentDate <= endDate) {
      const isDisabled = disablePastDates && currentDate < today

      days.push({
        date: new Date(currentDate),
        dayOfWeek: currentDate.toLocaleString("vi-VN", { weekday: "narrow" }),
        itemWidth: visibleDays === 6 ? 51.5 : 43,
        isDisabled
      })

      currentDate.setDate(currentDate.getDate() + 1)
    }

    return days
  }, [today, validInitialDate, disablePastDates, futureMonths, visibleDays])

  const scrollToSelectedDate = useCallback(() => {
    const index = daysInFuturePeriod.findIndex(
      (day) => day.date.toDateString() === selectedDay.toDateString()
    )
    if (FlatListRef.current && index >= 0) {
      FlatListRef.current.scrollToIndex({ index, animated: true })
    }
  }, [selectedDay, daysInFuturePeriod])

  useEffect(() => {
    if (daysInFuturePeriod.length > 0) scrollToSelectedDate()
  }, [selectedDay, scrollToSelectedDate])

  const handleSelectedDay = (date: Date, isDisabled: boolean | undefined) => {
    if (isDisabled) return

    if (date.toDateString() !== selectedDay.toDateString()) {
      setSelectedDay(date)
      onDateSelect(formatUTCDate(date))
    }
  }

  const itemWidth = useMemo(
    () => (visibleDays === 6 ? 51.5 : 43),
    [visibleDays]
  )

  return (
    <TouchableOpacity activeOpacity={1}>
      <FlatList
        horizontal
        ref={FlatListRef}
        data={daysInFuturePeriod}
        keyExtractor={(item) => item.date.toISOString()}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <DayItem
            date={item.date}
            dayOfWeek={item.dayOfWeek}
            selectedDay={selectedDay}
            onSelect={handleSelectedDay}
            itemWidth={itemWidth}
            isDisabled={item.isDisabled}
          />
        )}
        ItemSeparatorComponent={() => <View style={{ width: 8 }} />}
        onScrollToIndexFailed={(info) => {
          setTimeout(
            () =>
              FlatListRef.current?.scrollToIndex({
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
    onSelect,
    itemWidth,
    isDisabled
  }: DayProps & {
    selectedDay: Date
    onSelect: (date: Date, isDisabled?: boolean) => void
  }) => {
    const isSelected = date.toDateString() === selectedDay.toDateString()

    return (
      <TouchableOpacity
        activeOpacity={isDisabled ? 1 : 0.8}
        className={`h-20 items-center justify-center gap-1 rounded-xl border border-border px-2 py-4 ${
          isSelected ? "bg-primary" : "bg-card"
        } ${isDisabled ? "opacity-40" : ""}`}
        style={{ width: itemWidth }}
        onPress={() => onSelect(date, isDisabled)}
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
