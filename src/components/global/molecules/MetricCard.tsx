import React, { useState } from "react"

import { Text, TouchableOpacity, View } from "react-native"

import { ArrowDown2, ArrowUp2, HeartTick } from "iconsax-react-native"

import { COLORS } from "@/constants/color"
import { getGenderMeta } from "@/constants/enum/Gender"
import { getGoalStatusMeta } from "@/constants/enum/Goal"

import { GoalType } from "@/schemas/goalSchema"
import { MetricType } from "@/schemas/metricSchema"

import { formatDate, toFixed } from "@/utils/formatters"

import { Badge, Card, HStack, VStack } from "../atoms"
import { BodyIndex } from "./BodyIndex"
import { MetricItem } from "./MetricItem"

interface MetricCardProps {
  metric: MetricType
  goal: GoalType
}

export const MetricCard = ({ metric, goal }: MetricCardProps) => {
  const [expanded, setExpanded] = useState(false)
  const toggleExpanded = () => setExpanded(!expanded)

  const { label: goalStatusLabel, color: goalStatusColor } = getGoalStatusMeta(
    goal.status
  )
  const { label: genderLabel } = getGenderMeta(metric.gender)

  const basicMetrics = [
    { label: "Chỉ số khối cơ thể (BMI)", value: toFixed(metric.bmi) },
    { label: "Tỷ lệ trao đổi chất (BMR)", value: toFixed(metric.bmr) }
  ]

  const advancedMetrics = [
    { label: "Năng lượng tiêu hao (TDEE)", value: toFixed(metric.tdee) },
    { label: "Cân nặng lý tưởng (IBW)", value: toFixed(metric.ibw) }
  ]

  const nutritionMetrics = [
    {
      label: "Năng lượng hấp thu",
      value: toFixed(goal.caloriesGoal, 0),
      unit: "kcal"
    },
    {
      label: "Chất đạm (Protein)",
      value: toFixed(goal.proteinGoal),
      unit: "g"
    },
    { label: "Tinh bột (Carbs)", value: toFixed(goal.carbsGoal), unit: "g" },
    { label: "Chất béo (Fat)", value: toFixed(goal.fatGoal), unit: "g" },
    { label: "Chất xơ (Fiber)", value: toFixed(goal.fiberGoal), unit: "g" },
    { label: "Đường (Sugar)", value: toFixed(goal.sugarGoal), unit: "g" }
  ]

  const activityMetrics = [
    { label: "Lượng nước cần nạp", value: goal.waterIntakesGoal, unit: "ml" },
    {
      label: "Năng lượng tiêu thụ",
      value: toFixed(goal.caloriesBurnedGoal, 0),
      unit: "kcal"
    },
    {
      label: "Thời gian vận động",
      value: goal.workoutDurationGoal,
      unit: "phút"
    }
  ]

  return (
    <Card activeOpacity={1}>
      <VStack gap={20}>
        <HStack center className="justify-between">
          <View className="rounded-xl border bg-muted p-2">
            <HeartTick size="24" color={COLORS.primary} />
          </View>

          <VStack className="items-end">
            <Badge
              label={goalStatusLabel}
              background={goalStatusColor}
              color="#fff"
              rounded
            />

            <Text className="font-tmedium text-sm text-secondary">
              {formatDate(metric.createdAt)}
            </Text>
          </VStack>
        </HStack>

        <BodyIndex
          height={metric.height}
          weight={metric.weight}
          gender={genderLabel}
        />

        <VStack className="gap-2">
          <Text className="font-tmedium text-base text-primary">
            Chỉ số sinh lý
          </Text>

          {basicMetrics.map((item, index) => (
            <MetricItem key={index} label={item.label} value={item.value} />
          ))}
        </VStack>

        {expanded && (
          <>
            <VStack className="gap-2">
              {advancedMetrics.map((item, index) => (
                <MetricItem key={index} label={item.label} value={item.value} />
              ))}
            </VStack>

            <VStack className="mt-2 gap-2">
              <Text className="font-tmedium text-base text-primary">
                Dinh dưỡng hằng ngày
              </Text>
              {nutritionMetrics.map((item, index) => (
                <MetricItem
                  key={index}
                  label={item.label}
                  value={item.value}
                  unit={item.unit}
                />
              ))}
            </VStack>

            <VStack className="mt-2 gap-2">
              <Text className="font-tmedium text-base text-primary">
                Hoạt động hằng ngày
              </Text>

              {activityMetrics.map((item, index) => (
                <MetricItem
                  key={index}
                  label={item.label}
                  value={item.value}
                  unit={item.unit}
                />
              ))}
            </VStack>
          </>
        )}

        <TouchableOpacity
          onPress={toggleExpanded}
          activeOpacity={0.8}
          className="self-end"
        >
          <Text className="font-tregular text-sm text-accent">
            {expanded ? "Ẩn bớt" : "Xem thêm"}
          </Text>
        </TouchableOpacity>
      </VStack>
    </Card>
  )
}
