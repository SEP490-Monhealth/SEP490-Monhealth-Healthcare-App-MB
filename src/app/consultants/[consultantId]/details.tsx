import React, { useState } from "react"

import { Image, Text, View } from "react-native"

import { useLocalSearchParams } from "expo-router"

import { LoadingScreen } from "@/app/loading"

import {
  Container,
  Content,
  HStack,
  ScrollArea,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  VStack
} from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

import { ConsultantOverview } from "@/components/local/consultants"
import { CertificateTab } from "@/components/local/tabs/consultant"
import { BookingTab } from "@/components/local/tabs/consultant/BookingTab"
import { InfoTab } from "@/components/local/tabs/consultant/InfoTab"

import { sampleConsultantsData } from "@/constants/consultants"

const ConsultantDetailsScreen = () => {
  const { consultantId } = useLocalSearchParams() as { consultantId: string }

  const consultantData = sampleConsultantsData.find(
    (c) => c.consultantId === consultantId
  )

  const { tab } = useLocalSearchParams()
  const [activeTab, setActiveTab] = useState(tab || "info")

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }

  if (!consultantData) return <LoadingScreen />

  return (
    <Container>
      <Header back label="Chuyên viên tư vấn" />

      <Content className="mt-2">
        <ScrollArea className="flex-1">
          <VStack>
            <HStack center gap={20}>
              <Image
                source={{ uri: consultantData.avatarUrl }}
                className="h-24 w-24 rounded-2xl border border-border"
              />

              <View className="flex-1 gap-1">
                <Text className="font-tbold text-2xl text-primary">
                  {consultantData.name}
                </Text>

                <Text className="font-tmedium text-base text-secondary">
                  {consultantData.expertise}
                </Text>
              </View>
            </HStack>

            <ConsultantOverview
              experience={consultantData.experience}
              rating={consultantData.rating}
              patients={consultantData.patient}
            />

            <Tabs defaultValue={activeTab} contentMarginTop={8}>
              <TabsList gap={32}>
                <TabsTrigger value="info" onChange={handleTabChange}>
                  Thông tin
                </TabsTrigger>

                <TabsTrigger value="certificate" onChange={handleTabChange}>
                  Chứng chỉ
                </TabsTrigger>

                <TabsTrigger value="booking" onChange={handleTabChange}>
                  Đặt lịch
                </TabsTrigger>
              </TabsList>

              <TabsContent value="info">
                <InfoTab />
              </TabsContent>

              <TabsContent value="booking">
                <BookingTab />
              </TabsContent>

              <TabsContent value="certificate">
                <CertificateTab />
              </TabsContent>
            </Tabs>
          </VStack>
        </ScrollArea>
      </Content>
    </Container>
  )
}

export default ConsultantDetailsScreen
