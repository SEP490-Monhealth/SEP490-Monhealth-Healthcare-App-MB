import React from "react"

import {
  Container,
  Content,
  Schedule,
  TabsList,
  TabsTrigger,
  VStack
} from "@/components/global/atoms"
import { Tabs, TabsContent } from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

import { MealTab } from "@/components/local/tabs/report"

import { sampleFoodsData } from "@/constants/foods"

function ReportScreen() {
  const today = new Date()

  const foodsData = sampleFoodsData

  return (
    <Container>
      <Header label="Báo cáo" />

      <Content className="mt-2 pb-12">
        <VStack gap={20}>
          <Tabs defaultValue="meal" contentMarginTop={12}>
            <VStack gap={20}>
              <Schedule initialDate={today} />

              <TabsList>
                <TabsTrigger value="meal">Dinh dưỡng</TabsTrigger>
                <TabsTrigger value="water">Nước</TabsTrigger>
                <TabsTrigger value="activity">Bài tập</TabsTrigger>
              </TabsList>
            </VStack>

            <TabsContent value="meal">
              <MealTab foodsData={foodsData} />
            </TabsContent>
            <TabsContent value="water">
              <MealTab foodsData={foodsData} />
            </TabsContent>
            <TabsContent value="activity">
              <MealTab foodsData={foodsData} />
            </TabsContent>
          </Tabs>
        </VStack>
      </Content>
    </Container>
  )
}

export default ReportScreen
