import React from "react"

import { useLocalSearchParams } from "expo-router"

import { LoadingScreen } from "@/app/loading"

import {
  Container,
  Content,
  ScrollArea,
  VStack
} from "@/components/global/atoms"
import { MetricCard } from "@/components/global/molecules"
import { Header } from "@/components/global/organisms"

import { useGetGoalsByUserId } from "@/hooks/useGoal"
import { useGetMetricsByUserId } from "@/hooks/useMetric"

function HealthTrackingScreen() {
  const { userId } = useLocalSearchParams<{ userId: string }>()

  const { data: metricsData, isLoading: isMetricsLoading } =
    useGetMetricsByUserId(userId)
  const { data: goalsData, isLoading: isGoalsLoading } =
    useGetGoalsByUserId(userId)

  if (!metricsData || isMetricsLoading || !goalsData || isGoalsLoading)
    return <LoadingScreen />

  return (
    <Container>
      <Header back label="Chỉ số sức khỏe" />

      <Content className="mt-2">
        <ScrollArea>
          <VStack gap={20}>
            {metricsData.map((metric, index) => {
              const goal = goalsData[index]
              if (!goal) return null

              return (
                <MetricCard
                  key={metric.metricId}
                  height={metric.height}
                  weight={metric.weight}
                  activityLevel={metric.activityLevel}
                  bmi={metric.bmi}
                  bmr={metric.bmr}
                  tdee={metric.tdee}
                  ibw={metric.ibw}
                  type={goal.type}
                  caloriesRatio={goal.caloriesRatio}
                  weightGoal={goal.weightGoal ?? 0}
                  caloriesGoal={goal.caloriesGoal ?? 0}
                  proteinGoal={goal.proteinGoal ?? 0}
                  carbsGoal={goal.carbsGoal ?? 0}
                  fatGoal={goal.fatGoal ?? 0}
                  fiberGoal={goal.fiberGoal ?? 0}
                  sugarGoal={goal.sugarGoal ?? 0}
                  waterIntakesGoal={goal.waterIntakesGoal ?? 0}
                  workoutDurationGoal={goal.workoutDurationGoal ?? 0}
                  caloriesBurnedGoal={goal.caloriesBurnedGoal ?? 0}
                  status={goal.status ?? 0}
                  createdAt={metric.createdAt}
                />
              )
            })}
          </VStack>
        </ScrollArea>
      </Content>
    </Container>
  )
}

export default HealthTrackingScreen
