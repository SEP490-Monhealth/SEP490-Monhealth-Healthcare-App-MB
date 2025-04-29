import React, { useEffect, useMemo } from "react"

import { Text, View } from "react-native"

import { useIsFetching, useIsMutating } from "@tanstack/react-query"

import { HStack, VStack } from "@/components/global/atoms"
import { WeightCard } from "@/components/global/molecules"
import { Section } from "@/components/global/organisms"

import { useGetWeeklyWeightByUserId } from "@/hooks/useTracker"

import { toFixed } from "@/utils/formatters"

import { LineChart } from "./LineChart"

const weightsData = [
  { date: "2025-01-01", weight: 75.5, height: 170 },
  { date: "2025-01-08", weight: 74.8, height: 170 },
  { date: "2025-01-15", weight: 73.2, height: 170 },
  { date: "2025-01-22", weight: 73.9, height: 170 },
  { date: "2025-01-29", weight: 72.6, height: 170 },
  { date: "2025-02-05", weight: 71.8, height: 170 },
  { date: "2025-02-12", weight: 71.3, height: 170 }
]

const formattedDateRangeLabel = (
  startDate: string,
  endDate: string
): string => {
  const [startYear, startMonth, startDay] = startDate.split("-").map(Number)
  const [endYear, endMonth, endDay] = endDate.split("-").map(Number)

  const startDayString = startDay.toString()
  const startMonthString = startMonth.toString()
  const endDayString = endDay.toString()
  const endMonthString = endMonth.toString()

  if (startDate === endDate) {
    return `${startDayString} tháng ${startMonthString} ${startYear}`
  }

  if (startYear === endYear) {
    return `${startDayString} tháng ${startMonthString} - ${endDayString} tháng ${endMonthString} ${startYear}`
  }

  return `${startDayString} tháng ${startMonthString} ${startYear} - ${endDayString} tháng ${endMonthString} ${endYear}`
}

const formatDateToLabel = (dateString: string): string => {
  const parts = dateString.split("-")
  return `${parts[2]}/${parts[1]}`
}

interface WeightTabProps {
  userId?: string
  onOverlayLoading: (isLoading: boolean) => void
}

export const WeightTab = ({ userId, onOverlayLoading }: WeightTabProps) => {
  const { data: weeklyWeightsData } = useGetWeeklyWeightByUserId(userId)

  const isFetching = useIsFetching()
  const isMutating = useIsMutating()

  useEffect(() => {
    onOverlayLoading(isFetching > 0 || isMutating > 0)
  }, [isFetching, isMutating, onOverlayLoading])

  const recentWeightData = useMemo(() => {
    const dataLength = weightsData.length
    return dataLength <= 6
      ? [...weightsData]
      : weightsData.slice(dataLength - 6)
  }, [])

  const selectedDate = recentWeightData[recentWeightData.length - 1].date

  const dateRangeLabel = useMemo(() => {
    const startDate = recentWeightData[0].date
    const endDate = recentWeightData[recentWeightData.length - 1].date
    return formattedDateRangeLabel(startDate, endDate)
  }, [recentWeightData])

  const dateLabels = useMemo(() => {
    return recentWeightData.map((data) => formatDateToLabel(data.date))
  }, [recentWeightData])

  const currentWeight = recentWeightData[recentWeightData.length - 1].weight

  return (
    <View className="mt-4">
      <VStack className="px-2">
        <Text className="font-tbold text-xl text-secondary">Tổng quan</Text>

        <HStack className="items-center justify-between">
          <HStack className="items-end">
            <Text className="font-tbold text-3xl text-primary">
              {toFixed(currentWeight)}
            </Text>
            <Text className="mb-1 font-tmedium text-base text-secondary">
              kg
            </Text>
          </HStack>

          <Text className="font-tmedium text-primary">{dateRangeLabel}</Text>
        </HStack>
      </VStack>

      <LineChart
        data={recentWeightData}
        labels={dateLabels}
        date={selectedDate}
      />

      <Section label="Lịch sử cân nặng" />

      <VStack gap={12}>
        {weightsData.map((weight, index) => (
          <WeightCard
            key={index}
            date={weight.date}
            weight={weight.weight}
            height={weight.height}
            onPress={() => {}}
          />
        ))}
      </VStack>
    </View>
  )
}
