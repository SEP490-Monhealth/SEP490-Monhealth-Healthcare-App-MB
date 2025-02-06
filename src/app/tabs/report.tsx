import React from "react"

import { Text } from "react-native"

import { Profile } from "iconsax-react-native"

import {
  Container,
  Content,
  HStack,
  TabsList,
  TabsTrigger,
  VStack
} from "@/components/global/atoms"
import { Tabs, TabsContent } from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

import { BarChart } from "@/components/local/tabs/report"

import { COLORS } from "@/constants/app"

const data = [
  { label: "Mon", date: "2024-04-29", calories: 500 },
  { label: "Tue", date: "2024-04-30", calories: 1500 },
  { label: "Wed", date: "2024-05-01", calories: 2500 },
  { label: "Thu", date: "2024-05-02", calories: 1000 },
  { label: "Fri", date: "2024-05-03", calories: 700 },
  { label: "Sat", date: "2024-05-04", calories: 800 },
  { label: "Sun", date: "2024-05-05", calories: 2000 }
]

function ReportScreen() {
  const dayOfWeek = new Date().getDay()

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  const today = days[dayOfWeek]

  const labels = data.map((item) => item.label)
  const caloriesData = data.map((item) => item.calories)

  const totalCalories = caloriesData.reduce((a, b) => a + b, 0)

  return (
    <Container>
      <Header
        label="Báo cáo"
        action={{
          icon: <Profile variant="Bold" size={20} color={COLORS.primary} />,
          href: "/settings/user-information"
        }}
      />

      <Content className="mt-2 pb-12">
        <VStack gap={20}>
          <Tabs defaultValue="meal" contentMarginTop={12}>
            <VStack gap={20}>
              <TabsList>
                <TabsTrigger value="meal">Bữa ăn</TabsTrigger>
                <TabsTrigger value="water">Nước</TabsTrigger>
                <TabsTrigger value="activity">Luyện tập</TabsTrigger>
              </TabsList>
            </VStack>

            <TabsContent value="meal" contentMarginTop={12}>
              <VStack gap={20}>
                <VStack className="px-2">
                  <Text className="font-tbold text-xl text-primary">
                    Tổng quan
                  </Text>

                  <HStack className="-mb-2 items-center justify-between">
                    <HStack className="items-end">
                      <Text className="font-tbold text-3xl text-primary">
                        {totalCalories}
                      </Text>
                      <Text className="mb-1 font-tmedium text-base text-secondary">
                        tổng kcal
                      </Text>
                    </HStack>

                    <Text className="font-tmedium text-primary">
                      1 - 7 Tháng 2 2025
                    </Text>
                  </HStack>
                </VStack>

                <BarChart date={today} labels={labels} data={caloriesData} />
              </VStack>
            </TabsContent>
            <TabsContent value="water" contentMarginTop={12}>
              <Text>asd</Text>
            </TabsContent>
            <TabsContent value="activity" contentMarginTop={12}>
              <Text>asd</Text>
            </TabsContent>
          </Tabs>
        </VStack>
      </Content>
    </Container>
  )
}

export default ReportScreen
