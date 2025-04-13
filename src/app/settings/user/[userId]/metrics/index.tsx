import React from "react"

import { useLocalSearchParams } from "expo-router"

import { LoadingScreen } from "@/app/loading"

import { Container, Content, ScrollArea } from "@/components/global/atoms"
import { MetricCard } from "@/components/global/molecules"
import { Header } from "@/components/global/organisms"

import { useGetGoalsByUserId } from "@/hooks/useGoal"
import { useGetMetricsByUserId } from "@/hooks/useMetric"

function MetricsScreen() {
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

      <Content className="mt-4">
        <ScrollArea className="pb-4">
          {metricsData.map((metric, index) => {
            const goal = goalsData[index]
            if (!goal) return null

            return (
              <MetricCard key={metric.metricId} metric={metric} goal={goal} />
            )
          })}
        </ScrollArea>
      </Content>
    </Container>
  )
}

export default MetricsScreen
