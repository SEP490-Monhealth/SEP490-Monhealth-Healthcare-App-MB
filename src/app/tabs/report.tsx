import React from "react"

import { Text } from "react-native"

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

import { COLORS } from "@/constants/app"

function ReportScreen() {
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
              <Text>asd</Text>
            </TabsContent>
            <TabsContent value="water">
              <Text>asd</Text>
            </TabsContent>
            <TabsContent value="activity">
              <Text>asd</Text>
            </TabsContent>
          </Tabs>
        </VStack>
      </Content>
    </Container>
  )
}

export default ReportScreen
