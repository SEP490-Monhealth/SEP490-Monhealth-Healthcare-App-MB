import React, { useState } from "react"

import { Image, Text, View } from "react-native"

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

import { useGetConsultantById } from "@/hooks/useConsultant"

function ConsultantDetailsScreen() {
  const { tab } = useLocalSearchParams<{ tab: string }>()
  const { consultantId } = useLocalSearchParams() as { consultantId: string }

  const { data: consultantData, isLoading } = useGetConsultantById(consultantId)

  const [activeTab, setActiveTab] = useState(tab || "info")

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }

  if (!consultantData || isLoading) return <LoadingScreen />

  return (
    <Container>
      <Header back label={consultantData.fullName} />

      <Content className="mt-2">
        <ScrollArea className="flex-1">
          <View className="pb-12">
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

                  <RatingStars
                    rating={consultantData.averageRating}
                    count={consultantData.ratingCount}
                    showCount
                  />
                </VStack>
              </HStack>

              <ConsultantOverview
                experience={consultantData.experience}
                patients={0}
                rating={consultantData.averageRating}
              />
            </VStack>

            <Button className="mt-4">Gửi tin nhắn</Button>

            <Tabs
              defaultValue={activeTab}
              contentMarginTop={8}
              className="mt-6"
            >
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
          </View>
        </ScrollArea>
      </Content>
    </Container>
  )
}

export default ConsultantDetailsScreen
