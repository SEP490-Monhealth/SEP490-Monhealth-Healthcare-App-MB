import React, { useEffect, useMemo } from "react"

import { Text, View } from "react-native"

import { useIsFetching, useIsMutating } from "@tanstack/react-query"

import { HStack, VStack } from "@/components/global/atoms"
import { Section } from "@/components/global/organisms"

import { useGetWeeklyWeightByUserId } from "@/hooks/useTracker"

import { toFixed } from "@/utils/formatters"

import { LineChart } from "../dashboard"

const weightData = [
  { date: "2025-01-01", weight: 75.5 },
  { date: "2025-01-08", weight: 74.8 },
  { date: "2025-01-15", weight: 73.2 },
  { date: "2025-01-22", weight: 73.9 },
  { date: "2025-01-29", weight: 72.6 },
  { date: "2025-02-05", weight: 71.8 },
  { date: "2025-02-12", weight: 71.3 }
]

const createVietnameseDateRangeLabel = (
  startDate: string,
  endDate: string
): string => {
  const startYear = startDate.split("-")[0]
  const endYear = endDate.split("-")[0]

  const [startY, startM, startD] = startDate.split("-").map(Number)
  const [endY, endM, endD] = endDate.split("-").map(Number)

  const startDayString = startD.toString()
  const startMonthString = startM.toString()
  const endDayString = endD.toString()
  const endMonthString = endM.toString()

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
    const dataLength = weightData.length
    return dataLength <= 6 ? [...weightData] : weightData.slice(dataLength - 6)
  }, [])

  const selectedDate = recentWeightData[recentWeightData.length - 1].date

  const dateRangeLabel = useMemo(() => {
    const startDate = recentWeightData[0].date
    const endDate = recentWeightData[recentWeightData.length - 1].date
    return createVietnameseDateRangeLabel(startDate, endDate)
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

      <Section label="" />

      {/* <VStack gap={12}>
        {weightsData.weights.map((weight) => (
          <WeightCard key={weight.weightId} />
        ))}
      </VStack> */}
    </View>
  )
}
