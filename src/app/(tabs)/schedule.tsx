import React from "react"

import { Add } from "iconsax-react-native"

import { Container, Content, VStack } from "@/components/global/atoms"
import { Tabs, TabsContent } from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

import { MealTab } from "@/components/local/tabs/schedule"

import { COLORS } from "@/constants/app"
import { sampleFoodsData } from "@/constants/foods"

function ScheduleScreen() {
  const foodsData = sampleFoodsData

  return (
    <Container>
      <Header
        label="Thực đơn"
        action={{
          icon: <Add size={24} color={COLORS.primary} />,
          url: "/foods"
        }}
      />

      <Content marginBottom={false}>
        <VStack gap={20} className="mt-2">
          <Tabs
            defaultValue="breakfast"
            contentMarginTop={0}
            className="w-full"
          >
            <TabsContent value="breakfast">
              <MealTab foodsData={foodsData} />
            </TabsContent>
            <TabsContent value="lunch">
              <MealTab foodsData={foodsData} />
            </TabsContent>
            <TabsContent value="dinner">
              <MealTab foodsData={foodsData} />
            </TabsContent>
            <TabsContent value="snack">
              <MealTab foodsData={foodsData} />
            </TabsContent>
          </Tabs>
        </VStack>
      </Content>
    </Container>
  )
}

export default ScheduleScreen
