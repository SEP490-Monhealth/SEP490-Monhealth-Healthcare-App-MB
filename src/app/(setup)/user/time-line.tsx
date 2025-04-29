import React, { useMemo } from "react"

import { Text, View } from "react-native"

import { Card, HStack, VStack } from "@/components/global/atoms"
import { Section } from "@/components/global/organisms"

import { LineChart } from "@/components/local/setup"

import { GoalTypeEnum } from "@/constants/enum/Goal"

import { useSetupStore } from "@/stores/setupStore"

import { formatDate, toFixed } from "@/utils/formatters"
import { calculateTimeline } from "@/utils/timeline"

function SetupTimeLine() {
  const { weight, goalType, weightGoal, caloriesRatio } = useSetupStore()

  const timelineData = useMemo(() => {
    return calculateTimeline({
      weight,
      weightGoal,
      goalType: goalType!,
      caloriesRatio
    })
  }, [weight, weightGoal, goalType, caloriesRatio])

  const absWeeklyChange = Math.abs(timelineData.weeklyChange)
  const isWeightLoss = timelineData.weeklyChange < 0
  const isMaintenance = goalType === GoalTypeEnum.Maintenance

  return (
    <View>
      <LineChart date={timelineData.labels[0]} data={timelineData.chartData} />

      <Section label="Chi tiết lộ trình" className="mt-2" />

      <Card>
        <VStack gap={12}>
          <HStack center className="justify-between">
            <Text className="font-tregular text-base text-secondary">
              Cân nặng hiện tại
            </Text>
            <Text className="font-tmedium text-base text-primary">
              {toFixed(weight)} kg
            </Text>
          </HStack>

          <HStack center className="justify-between">
            <Text className="font-tregular text-base text-secondary">
              Mục tiêu cân nặng
            </Text>
            <Text className="font-tmedium text-base text-primary">
              {toFixed(weightGoal)} kg
            </Text>
          </HStack>

          {!isMaintenance && (
            <HStack center className="justify-between">
              <Text className="font-tregular text-base text-secondary">
                {isWeightLoss ? "Giảm" : "Tăng"} mỗi tuần
              </Text>
              <Text className="font-tmedium text-base text-primary">
                {toFixed(absWeeklyChange, 2)} kg
              </Text>
            </HStack>
          )}

          {!isMaintenance && (
            <HStack center className="justify-between">
              <Text className="font-tregular text-base text-secondary">
                Thời gian dự kiến
              </Text>
              <Text className="font-tmedium text-base text-primary">
                {timelineData.weeksToGoal} tuần
              </Text>
            </HStack>
          )}

          <HStack
            center
            className="justify-between border-t border-border pt-4"
          >
            <Text className="font-tsemibold text-base text-secondary">
              {isMaintenance ? "Mục tiêu" : "Ngày đạt mục tiêu"}
            </Text>
            <Text className="font-tbold text-lg text-primary">
              {isMaintenance
                ? "Duy trì cân nặng hiện tại"
                : timelineData.targetDate
                  ? formatDate(timelineData.targetDate)
                  : "N/A"}
            </Text>
          </HStack>
        </VStack>
      </Card>
    </View>
  )
}

export default SetupTimeLine
