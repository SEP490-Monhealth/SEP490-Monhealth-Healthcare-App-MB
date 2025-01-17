import React from "react"

import { Profile } from "iconsax-react-native"

import {
  Container,
  Content,
  TabsList,
  TabsTrigger,
  VStack
} from "@/components/global/atoms"
import { Tabs, TabsContent } from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

import { MealTab } from "@/components/local/tabs/report"

import { COLORS } from "@/constants/app"
import { sampleFoodsData } from "@/constants/foods"

function ReportScreen() {
  const foodsData = sampleFoodsData

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
