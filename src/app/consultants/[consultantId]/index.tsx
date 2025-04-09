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

import { UserSubscriptionStatus } from "@/constants/enum/UserSubscription"

import { useAuth } from "@/contexts/AuthContext"

import { useGetConsultantById } from "@/hooks/useConsultant"
import { useGetUserSubscriptionByUserId } from "@/hooks/useUserSubscription"

import { useBookingStore } from "@/stores/bookingStore"

import { getInitials } from "@/utils/helpers"

function ConsultantDetailsScreen() {
  const router = useRouter()

  const { user } = useAuth()
  const userId = user?.userId

  const { tab } = useLocalSearchParams<{ tab: string }>()
  const { consultantId } = useLocalSearchParams() as { consultantId: string }

  const { date: storedDate, startTime, endTime } = useBookingStore()

  const { data: consultantData, isLoading: isConsultantLoading } =
    useGetConsultantById(consultantId)
  const { data: userSubscriptionData } = useGetUserSubscriptionByUserId(userId)

  const currentSubscription = userSubscriptionData?.find(
    (subscription) => subscription.status === UserSubscriptionStatus.Active
  )

  const [activeTab, setActiveTab] = useState<string>(tab || "info")
  const [loading, setLoading] = useState<boolean>(false)
  const [overlayLoading, setOverlayLoading] = useState<boolean>(false)
  const [isTimeModalVisible, setIsTimeModalVisible] = useState<boolean>(false)
  const [isSubscriptionModalVisible, setIsSubscriptionModalVisible] =
    useState<boolean>(false)
  const [isNoBookingsLeftModalVisible, setIsNoBookingsLeftModalVisible] =
    useState<boolean>(false)
  const [isPackageUpgradeModalVisible, setIsPackageUpgradeModalVisible] =
    useState<boolean>(false)

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }

  const handleLoading = useCallback((isLoading: boolean) => {
    setLoading(isLoading)
  }, [])

  const handleOverlayLoading = useCallback((isLoading: boolean) => {
    setOverlayLoading(isLoading)
  }, [])

  const handleViewSubscriptions = () => {
    setIsSubscriptionModalVisible(false)
    setIsNoBookingsLeftModalVisible(false)
    setIsPackageUpgradeModalVisible(false)
    router.push("/settings/user/[userId]/subscriptions")
  }

  const handleBooking = () => {
    // Kiểm tra có gói đăng ký hay không
    if (!currentSubscription) {
      setIsSubscriptionModalVisible(true)
      return
    }

    // Kiểm tra có phải là gói Cao Cấp hay không
    if (currentSubscription.subscription !== "Gói Cao Cấp") {
      setIsPackageUpgradeModalVisible(true)
      return
    }

    // Kiểm tra số lượng lịch hẹn còn lại
    if (currentSubscription.remainingBookings <= 0) {
      setIsNoBookingsLeftModalVisible(true)
      return
    }

    // Kiểm tra thời gian đặt lịch
    if (!startTime || !endTime) {
      setIsTimeModalVisible(true)
      return
    }

    router.push({
      pathname: "/bookings",
      params: { consultantId, bookingDate: storedDate }
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
                  {consultantData.avatarUrl ? (
                    <Image
                      source={{ uri: consultantData.avatarUrl }}
                      className="h-24 w-24 rounded-2xl border border-border"
                    />
                  ) : (
                    <View className="flex h-24 w-24 items-center justify-center rounded-xl border border-muted bg-border">
                      <Text className="font-tbold text-lg text-primary">
                        {getInitials(consultantData.fullName)}
                      </Text>
                    </View>
                  )}

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
                  patients={consultantData.bookingCount}
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
        isVisible={isTimeModalVisible}
        title="Cảnh báo"
        description="Vui lòng chọn thời gian để đặt lịch hẹn"
        confirmText="Đồng ý"
        onClose={() => setIsTimeModalVisible(false)}
        onConfirm={() => setIsTimeModalVisible(false)}
      />

      <Modal
        isVisible={isSubscriptionModalVisible}
        title="Thông báo"
        description="Bạn cần nâng cấp Gói Cao Cấp để được đặt lịch hẹn"
        cancelText="Hủy"
        confirmText="Đồng ý"
        onClose={() => setIsSubscriptionModalVisible(false)}
        onConfirm={handleViewSubscriptions}
      />

      <Modal
        isVisible={isNoBookingsLeftModalVisible}
        title="Thông báo"
        description="Bạn đã sử dụng hết lượt đặt lịch hẹn trong gói."
        confirmText="Đồng ý"
        onClose={() => setIsNoBookingsLeftModalVisible(false)}
        onConfirm={() => setIsNoBookingsLeftModalVisible(false)}
      />

      <Modal
        isVisible={isPackageUpgradeModalVisible}
        title="Thông báo"
        description="Chức năng đặt lịch hẹn chỉ có sẵn trong Gói Cao Cấp."
        confirmText="Đồng ý"
        onClose={() => setIsPackageUpgradeModalVisible(false)}
        onConfirm={handleViewSubscriptions}
      />
    </>
  )
}

export default ConsultantDetailsScreen
