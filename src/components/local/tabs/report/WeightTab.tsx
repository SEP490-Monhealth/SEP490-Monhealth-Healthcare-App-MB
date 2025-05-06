import React, { useEffect, useMemo } from "react"

import { Text, View } from "react-native"

import { useIsFetching, useIsMutating } from "@tanstack/react-query"

import { HStack, VStack } from "@/components/global/atoms"
import { WeightCard } from "@/components/global/molecules"
import { Section } from "@/components/global/organisms"

import { useGetWeeklyWeightByUserId } from "@/hooks/useTracker"

import { toFixed } from "@/utils/formatters"

import { LineChart } from "./LineChart"

const formatDateToYYYYMMDD = (dateString: string) => {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

const formattedDateRangeLabel = (startDate: string, endDate: string) => {
  const formattedStartDate = formatDateToYYYYMMDD(startDate)
  const formattedEndDate = formatDateToYYYYMMDD(endDate)

  const [startYear, startMonth, startDay] = formattedStartDate
    .split("-")
    .map(Number)
  const [endYear, endMonth, endDay] = formattedEndDate.split("-").map(Number)

  const startDayString = startDay.toString()
  const startMonthString = startMonth.toString()
  const endDayString = endDay.toString()
  const endMonthString = endMonth.toString()

  if (formattedStartDate === formattedEndDate) {
    return `${startDayString} tháng ${startMonthString} ${startYear}`
  }

  if (startYear === endYear) {
    return `${startDayString} tháng ${startMonthString} - ${endDayString} tháng ${endMonthString} ${startYear}`
  }

  return `${startDayString} tháng ${startMonthString} ${startYear} - ${endDayString} tháng ${endMonthString} ${endYear}`
}

const formatDateToLabel = (dateString: string) => {
  const formattedDate = formatDateToYYYYMMDD(dateString)
  const parts = formattedDate.split("-")
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

  const processedWeeklyWeights = useMemo(() => {
    if (!weeklyWeightsData) return []
    return weeklyWeightsData.map((item) => ({
      ...item,
      date: formatDateToYYYYMMDD(item.date)
    }))
  }, [weeklyWeightsData])

  const recentWeightData = useMemo(() => {
    if (processedWeeklyWeights.length === 0) return []
    const dataLength = processedWeeklyWeights.length
    return dataLength <= 6
      ? [...processedWeeklyWeights]
      : processedWeeklyWeights.slice(dataLength - 6)
  }, [processedWeeklyWeights])

  const selectedDate = useMemo(() => {
    if (recentWeightData.length === 0) return ""
    return recentWeightData[recentWeightData.length - 1].date
  }, [recentWeightData])

  const dateRangeLabel = useMemo(() => {
    if (recentWeightData.length === 0) return ""
    const startDate = recentWeightData[0].date
    const endDate = recentWeightData[recentWeightData.length - 1].date
    return formattedDateRangeLabel(startDate, endDate)
  }, [recentWeightData])

  const dateLabels = useMemo(() => {
    return recentWeightData.map((data) => formatDateToLabel(data.date))
  }, [recentWeightData])

  const currentWeight = useMemo(() => {
    if (recentWeightData.length === 0) return 0
    return recentWeightData[recentWeightData.length - 1].weight
  }, [recentWeightData])

  useEffect(() => {
    onOverlayLoading(isFetching > 0 || isMutating > 0)
  }, [isFetching, isMutating, onOverlayLoading])

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
        {processedWeeklyWeights.map((weight, index) => (
          <WeightCard
            key={index}
            date={weight.date}
            weight={weight.weight}
            height={weight.height}
          />
        ))}
      </VStack>
    </View>
  )
}
