import React, { useState } from "react"

import { Image, Text } from "react-native"

import { useLocalSearchParams } from "expo-router"

import { LoadingScreen } from "@/app/loading"

import {
  Button,
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
import { RatingStars } from "@/components/global/molecules"
import { Header } from "@/components/global/organisms"

import {
  CertificateTab,
  ConsultantOverview,
  InformationTab,
  ReviewTab
} from "@/components/local/consultants"

import { sampleConsultantsData } from "@/constants/consultants"

function ConsultantDetailsScreen() {
  const { consultantId } = useLocalSearchParams() as { consultantId: string }

  const consultantData = sampleConsultantsData.find(
    (c) => c.consultantId === consultantId
  )

  const { tab } = useLocalSearchParams<{ tab: string }>()
  const [activeTab, setActiveTab] = useState(tab || "info")

  const rating = 5
  const count = 100

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }

  if (!consultantData) return <LoadingScreen />

  return (
    <Container>
      <Header back label={consultantData.fullName} />

      <Content className="mt-2">
        <ScrollArea className="flex-1">
          <VStack gap={20}>
            <HStack center gap={20}>
              <Image
                source={{ uri: consultantData.avatarUrl }}
                className="h-24 w-24 rounded-2xl border border-border"
              />

              <VStack gap={8}>
                <VStack gap={0}>
                  <Text className="font-tbold text-2xl text-primary">
                    {consultantData.fullName}
                  </Text>

                  <Text className="font-tmedium text-base text-accent">
                    {consultantData.expertise}
                  </Text>
                </VStack>

                <RatingStars rating={rating} count={count} showCount />
              </VStack>
            </HStack>

            <ConsultantOverview
              experience={consultantData.experience}
              rating={consultantData.rating}
              patients={consultantData.patient}
            />
          </VStack>

          <Button className="mt-4">Gửi tin nhắn</Button>

          <Tabs defaultValue={activeTab} contentMarginTop={8} className="mt-6">
            <TabsList>
              <TabsTrigger value="info" onChange={handleTabChange}>
                Thông tin
              </TabsTrigger>

              <TabsTrigger value="certificate" onChange={handleTabChange}>
                Chứng chỉ
              </TabsTrigger>

              <TabsTrigger value="review" onChange={handleTabChange}>
                Đánh giá
              </TabsTrigger>
            </TabsList>

            <TabsContent value="info">
              <InformationTab />
            </TabsContent>

            <TabsContent value="certificate">
              <CertificateTab />
            </TabsContent>

            <TabsContent value="review">
              <ReviewTab />
            </TabsContent>
          </Tabs>
        </ScrollArea>
      </Content>
    </Container>
  )
}

export default ConsultantDetailsScreen
