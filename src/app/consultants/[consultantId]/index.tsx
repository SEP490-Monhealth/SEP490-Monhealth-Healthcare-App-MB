import React, { useCallback, useState } from "react"

import { Image, Text, View } from "react-native"

import { useLocalSearchParams, useRouter } from "expo-router"

import { LoadingOverlay, LoadingScreen } from "@/app/loading"

import {
  Button,
  Container,
  Content,
  HStack,
  Modal,
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

import { useAuth } from "@/contexts/AuthContext"

import { useGetConsultantById } from "@/hooks/useConsultant"

import { useBookingStore } from "@/stores/bookingStore"

function ConsultantDetailsScreen() {
  const router = useRouter()

  const { user } = useAuth()
  const userId = user?.userId

  const { tab } = useLocalSearchParams<{ tab: string }>()
  const { consultantId } = useLocalSearchParams() as { consultantId: string }

  const { date } = useBookingStore()

  const { data: consultantData, isLoading: isConsultantLoading } =
    useGetConsultantById(consultantId)
  // const { data: userSubscriptionData, isLoading: isUserSubscriptionLoading } =
  //   useGetUserSubscriptionByUserId(userId)

  const [activeTab, setActiveTab] = useState<string>(tab || "info")
  const [loading, setLoading] = useState<boolean>(false)
  const [overlayLoading, setOverlayLoading] = useState<boolean>(false)
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }

  const handleLoading = useCallback((isLoading: boolean) => {
    setLoading(isLoading)
  }, [])

  const handleOverlayLoading = useCallback((isLoading: boolean) => {
    setOverlayLoading(isLoading)
  }, [])

  const handleBooking = () => {
    console.log(date)

    const dateTime =
      (date && /^\d{4}-\d{2}-\d{2}$/.test(date)) ||
      new Date(date).toTimeString().split(" ")[0] === "00:00:00"

    if (dateTime) {
      setIsModalVisible(true)
      return
    }

    router.push({
      pathname: "/bookings",
      params: { consultantId, bookingDate: date }
    })
  }

  if (!consultantData || isConsultantLoading) return <LoadingScreen />

  return (
    <>
      <Container>
        <LoadingOverlay visible={overlayLoading} />

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

              <Button onPress={handleBooking} className="mt-4">
                Đặt lịch hẹn
              </Button>

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
                  <InformationTab
                    onLoading={handleLoading}
                    onOverlayLoading={handleOverlayLoading}
                  />
                </TabsContent>

                <TabsContent value="certificate">
                  <CertificateTab
                    onLoading={handleLoading}
                    onOverlayLoading={handleOverlayLoading}
                  />
                </TabsContent>

                <TabsContent value="review">
                  <ReviewTab />
                </TabsContent>
              </Tabs>
            </View>
          </ScrollArea>
        </Content>
      </Container>

      <Modal
        isVisible={isModalVisible}
        title="Cảnh báo"
        description="Vui lòng chọn thời gian để đặt lịch hẹn"
        confirmText="Đồng ý"
        onClose={() => setIsModalVisible(false)}
      />
    </>
  )
}

export default ConsultantDetailsScreen
