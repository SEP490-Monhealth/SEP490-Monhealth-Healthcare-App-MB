import React from "react"

import { FlatList, Text, View } from "react-native"

import { Setting2 } from "iconsax-react-native"

import {
  Card,
  Container,
  Content,
  ScrollArea,
  VStack
} from "@/components/global/atoms"
import { Header, Section } from "@/components/global/organisms"

import { COLORS } from "@/constants/color"
import { DATA } from "@/constants/data"

import { useAuth } from "@/contexts/AuthContext"

import { useGetGoalByUserId } from "@/hooks/useGoal"
import { useGetMetricsByUserId } from "@/hooks/useMetric"

import { toFixed } from "@/utils/formatters"

import { LoadingScreen } from "../loading"

function HealthTrackingScreen() {
  const { user } = useAuth()
  const userId = user?.userId

  const { data: metricData, isLoading: isMetricLoading } =
    useGetMetricsByUserId(userId)
  const { data: goalData, isLoading: isGoalLoading } =
    useGetGoalByUserId(userId)

  if (!metricData || isMetricLoading || !goalData || isGoalLoading)
    return <LoadingScreen />

  const healthIndex = [
    { label: "Cân nặng", value: `${metricData[0].weight} kg` },
    { label: "Chiều cao", value: `${metricData[0].height} cm` },
    { label: "Calo", value: `${toFixed(goalData[0].caloriesGoal || 0)} kcal` },
    {
      label: "Lượng nước",
      value: `${toFixed(goalData[0].waterIntakesGoal || 0)} ml`
    },
    { label: "Protein", value: `${toFixed(goalData[0].proteinGoal || 0)} g` },
    { label: "Carbs", value: `${toFixed(goalData[0].carbsGoal || 0)} g` },
    { label: "Fat", value: `${toFixed(goalData[0].fatGoal || 0)} g` },
    { label: "Fiber", value: `${toFixed(goalData[0].fiberGoal || 0)} g` },
    { label: "Sugar", value: `${toFixed(goalData[0].sugarGoal || 0)} g` }
  ]

  const userGoal = DATA.GOALS.find((g) => g.value === goalData?.[0].goalType)

  return (
    <Container>
      <Header
        back
        label="Theo dõi sức khỏe"
        action={{
          icon: <Setting2 size={24} color={COLORS.primary} />,
          href: "/user/metric"
        }}
      />

      <Content className="mt-2">
        <ScrollArea>
          <VStack gap={20} className="pb-20">
            <VStack>
              <Section label="Chỉ số cá nhân" margin={false} />
              <FlatList
                data={healthIndex}
                horizontal
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <View className="mr-4 rounded-2xl border border-border bg-card px-6 py-4">
                    <VStack gap={5}>
                      <Text className="font-tmedium text-lg text-secondary">
                        {item.label}
                      </Text>
                      <Text className="font-tmedium text-xl text-primary">
                        {item.value}
                      </Text>
                    </VStack>
                  </View>
                )}
                showsHorizontalScrollIndicator={false}
              />
            </VStack>

            <VStack>
              <Section label="Mục tiêu bản thân" margin={false} />
              <Card className="bg-primary">
                <VStack center className="my-4">
                  <Text className="font-tbold text-2xl text-white">
                    {userGoal?.label}
                  </Text>
                  <Text className="font-tmedium text-base text-white">
                    {userGoal?.description}
                  </Text>
                </VStack>
              </Card>
            </VStack>
          </VStack>
        </ScrollArea>
      </Content>
    </Container>
  )
}

export default HealthTrackingScreen
