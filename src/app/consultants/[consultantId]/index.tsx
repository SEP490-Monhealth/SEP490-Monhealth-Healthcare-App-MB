import React, { useCallback, useState } from "react"

import { Image, Text, View } from "react-native"

import { useLocalSearchParams, useRouter } from "expo-router"

import { LoadingOverlay, LoadingScreen } from "@/app/loading"
import { Message } from "iconsax-react-native"

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

import { COLORS } from "@/constants/color"
import { UserSubscriptionStatus } from "@/constants/enum/UserSubscription"

import { useAuth } from "@/contexts/AuthContext"

import { useCreateChat } from "@/hooks/useChat"
import { useGetConsultantById } from "@/hooks/useConsultant"
import { useCreateBookingTransaction } from "@/hooks/useTransaction"
import { useGetUserSubscriptionByUserId } from "@/hooks/useUserSubscription"

import { useBookingStore } from "@/stores/bookingStore"

import { getInitials } from "@/utils/helpers"

function ConsultantDetailsScreen() {
  const router = useRouter()
  const { tab } = useLocalSearchParams<{ tab: string }>()
  const { consultantId } = useLocalSearchParams<{ consultantId: string }>()

  const { user } = useAuth()
  const userId = user?.userId

  const { date: storedDate, startTime, endTime } = useBookingStore()

  const { mutate: createChat } = useCreateChat()
  const { mutate: createBookingTransaction } = useCreateBookingTransaction()

  const { data: consultantData } = useGetConsultantById(consultantId)
  const { data: userSubscriptionData } = useGetUserSubscriptionByUserId(userId)

  const currentSubscription = userSubscriptionData?.find(
    (subscription) => subscription.status === UserSubscriptionStatus.Active
  )

  const [activeTab, setActiveTab] = useState<string>(tab || "info")
  const [overlayLoading, setOverlayLoading] = useState<boolean>(false)
  const [isTimeModalVisible, setIsTimeModalVisible] = useState<boolean>(false)
  const [isNoBookingsLeftModalVisible, setIsNoBookingsLeftModalVisible] =
    useState<boolean>(false)

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }

  const handleOverlayLoading = useCallback((isLoading: boolean) => {
    setOverlayLoading(isLoading)
  }, [])

  const handlePayment = () => {
    setIsNoBookingsLeftModalVisible(false)

    const transactionData = {
      userId: userId || "",
      description: "Thanh toán mua thêm lượt",
      // amount: 230000,
      amount: 10000
    }

    createBookingTransaction(transactionData, {
      onSuccess: async (response) => {
        const { transactionId, qrCode } = response.data

        router.replace({
          pathname: "/transactions/payment",
          params: { transactionId: transactionId, qrCode: qrCode }
        })
      }
    })
  }

  const handleChat = async () => {
    const data = { userId, consultantId }

    // @ts-ignore
    await createChat(data, {
      onSuccess: (response) => {
        router.push(`/chats/${response.data.chatId}`)
      }
    })
  }

  const handleBooking = () => {
    if (currentSubscription && currentSubscription.remainingBookings <= 0) {
      setIsNoBookingsLeftModalVisible(true)
      return
    }

    if (!startTime || !endTime) {
      setIsTimeModalVisible(true)
      return
    }

    router.push({
      pathname: "/bookings",
      params: { consultantId, bookingDate: storedDate }
    })
  }

  if (!consultantData || !userSubscriptionData) {
    return <LoadingScreen />
  }

  return (
    <>
      <Container>
        <LoadingOverlay visible={overlayLoading} />

        <Header
          back
          label={consultantData.fullName}
          action={{
            icon: <Message variant="Bold" size={20} color={COLORS.primary} />
          }}
          onActionPress={handleChat}
        />

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
                    <View>
                      <Text className="font-tbold text-2xl text-primary">
                        {consultantData.fullName}
                      </Text>

                      <Text className="font-tmedium text-base text-accent">
                        Chuyên môn: {consultantData.expertise}
                      </Text>
                    </View>

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

              <Button onPress={handleBooking} className="mt-6">
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
                  <InformationTab onOverlayLoading={handleOverlayLoading} />
                </TabsContent>

                <TabsContent value="certificate">
                  <CertificateTab onOverlayLoading={handleOverlayLoading} />
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
        description="Vui lòng chọn thời gian để đặt lịch hẹn trước!"
        confirmText="Đồng ý"
        onClose={() => setIsTimeModalVisible(false)}
        onConfirm={() => setIsTimeModalVisible(false)}
      />

      <Modal
        isVisible={isNoBookingsLeftModalVisible}
        title="Thông báo"
        description="Bạn không có lượt đặt lịch hẹn nào. Bạn có muốn mua thêm không?"
        cancelText="Hủy"
        confirmText="Đồng ý"
        onClose={() => setIsNoBookingsLeftModalVisible(false)}
        onConfirm={handlePayment}
      />
    </>
  )
}

export default ConsultantDetailsScreen
