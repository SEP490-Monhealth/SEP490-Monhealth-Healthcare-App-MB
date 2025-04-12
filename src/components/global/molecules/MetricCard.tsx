import React, { useState } from "react"

import { Text, TouchableOpacity, View } from "react-native"

import { ArrowDown2, ArrowUp2, HeartTick } from "iconsax-react-native"

import { COLORS } from "@/constants/color"
import { DATA } from "@/constants/data"
import {
  GoalStatusEnum,
  GoalTypeEnum,
  getGoalStatusMeta
} from "@/constants/enum/Goal"

import { formatDate, formatDateTime, toFixed } from "@/utils/formatters"

import { Badge, Card, HStack, VStack } from "../atoms"
import { MetricItem } from "./MetricItem"

interface MetricCardProps {
  height: number
  weight: number
  activityLevel: number
  bmi: number
  bmr: number
  tdee: number
  ibw: number
  type: GoalTypeEnum
  caloriesRatio: number
  weightGoal: number
  caloriesGoal: number
  proteinGoal: number
  carbsGoal: number
  fatGoal: number
  fiberGoal: number
  sugarGoal: number
  waterIntakesGoal: number
  workoutDurationGoal: number
  caloriesBurnedGoal: number
  status: GoalStatusEnum
  createdAt: string
}

export const MetricCard = ({
  height,
  weight,
  activityLevel,
  bmi,
  bmr,
  tdee,
  ibw,
  type,
  caloriesRatio,
  weightGoal,
  caloriesGoal,
  proteinGoal,
  carbsGoal,
  fatGoal,
  fiberGoal,
  sugarGoal,
  waterIntakesGoal,
  workoutDurationGoal,
  caloriesBurnedGoal,
  status,
  createdAt
}: MetricCardProps) => {
  const [isReadMore, setIsReadMore] = useState<boolean>(false)

  const statusGoal = getGoalStatusMeta(status)

  const activityLevelLabel =
    DATA.ACTIVITY_LEVELS.find((level) => level.value === activityLevel)
      ?.label || ""
  const goalTypeLabel =
    DATA.GOALS.find((goalType) => goalType.value === type)?.label || ""
  const caloriesRatioLabel =
    DATA.CALORIES_RATIO.find((ratio) => ratio.value === caloriesRatio)?.label ||
    ""

  const nutritionItems = [
    {
      label: "Năng lượng hấp thu (Calories)",
      value: caloriesGoal,
      unit: "kcal"
    },
    {
      label: "Chất đạm (Protein)",
      value: proteinGoal,
      unit: "g"
    },
    {
      label: "Tinh bột (Carbs)",
      value: carbsGoal,
      unit: "g"
    },
    {
      label: "Chất béo (Fat)",
      value: fatGoal,
      unit: "g"
    },
    {
      label: "Chất xơ (Fiber)",
      value: fiberGoal,
      unit: "g"
    },
    {
      label: "Đường (Sugar)",
      value: sugarGoal,
      unit: "g"
    }
  ]

  const healthMetricItems = [
    {
      label: "Chỉ số khối cơ thể (Bmi)",
      value: toFixed(bmi)
    },
    {
      label: "Tỷ lệ trao đổi chất cơ bản (Bmr)",
      value: toFixed(bmr)
    },
    {
      label: "Năng lượng tiêu hao mỗi ngày (Tdee)",
      value: toFixed(tdee)
    },
    {
      label: "Cân nặng lý tưởng (Ibw)",
      value: toFixed(ibw)
    }
  ]

  const activityItems = [
    {
      label: "Lượng nước cần nạp (Water)",
      value: waterIntakesGoal,
      unit: "ml"
    },
    {
      label: "Năng lượng tiêu thụ (Calories)",
      value: caloriesBurnedGoal,
      unit: "kcal"
    },
    {
      label: "Thời gian vận động (Activity)",
      value: workoutDurationGoal,
      unit: "phút"
    }
  ]

  const handleReadMore = () => {
    setIsReadMore(true)
  }

  const handleHidden = () => {
    setIsReadMore(false)
  }

  return (
    <Card>
      <VStack gap={10}>
        <HStack center className="justify-between">
          <View className="rounded-xl border bg-muted p-2">
            <HeartTick variant="Linear" size={24} color={COLORS.primary} />
          </View>

          <VStack className="items-end">
            <Badge
              label={statusGoal.label}
              background={statusGoal.color}
              color="#fff"
              rounded
            />

            <Text className="font-tmedium text-sm text-accent">
              Ngày tạo: {formatDate(createdAt)}
            </Text>
          </VStack>
        </HStack>

        <VStack>
          <Text className="font-tmedium text-base text-primary">
            Chỉ số cơ thể
          </Text>

          <Text className="font-tmedium text-sm text-accent">
            {height} cm • {weight} kg
          </Text>
        </VStack>

        <VStack>
          <Text className="font-tmedium text-base text-primary">
            Mục tiêu bản thân
          </Text>

          <Text className="font-tmedium text-sm text-accent">
            {goalTypeLabel} • {caloriesRatioLabel} • {activityLevelLabel} •{" "}
            {weightGoal} kg
          </Text>
        </VStack>

        <VStack>
          <Text className="font-tmedium text-base text-primary">
            Chỉ số sinh lý
          </Text>

          {healthMetricItems.map((item, index) => (
            <MetricItem key={index} label={item.label} value={item.value} />
          ))}
        </VStack>
        {isReadMore ? (
          <VStack>
            <VStack>
              <Text className="font-tmedium text-base text-primary">
                Dinh dưỡng hấp thu hằng ngày
              </Text>

              {nutritionItems.map((item, index) => (
                <MetricItem
                  key={index}
                  label={item.label}
                  value={item.value}
                  unit={item.unit}
                />
              ))}
            </VStack>

            <Text className="font-tmedium text-base text-primary">
              Năng lượng tiêu hao hằng ngày
            </Text>

            {activityItems.map((item, index) => (
              <MetricItem
                key={index}
                label={item.label}
                value={item.value}
                unit={item.unit}
              />
            ))}

            <View
              className="mt-2"
              style={{
                alignSelf: "flex-end"
              }}
            >
              <TouchableOpacity onPress={handleHidden}>
                <HStack center>
                  <Text className="font-tregular text-sm text-accent">
                    Ẩn bớt
                  </Text>
                  <ArrowUp2 variant="Bold" size="16" color={COLORS.accent} />
                </HStack>
              </TouchableOpacity>
            </View>
          </VStack>
        ) : (
          <View
            style={{
              alignSelf: "flex-end"
            }}
          >
            <TouchableOpacity onPress={handleReadMore}>
              <HStack center>
                <Text className="font-tregular text-sm text-accent">
                  Xem thêm
                </Text>
                <ArrowDown2 variant="Bold" size="16" color={COLORS.accent} />
              </HStack>
            </TouchableOpacity>
          </View>
        )}
      </VStack>
    </Card>
  )
}
