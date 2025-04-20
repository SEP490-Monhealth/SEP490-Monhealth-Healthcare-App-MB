import React, { useEffect, useState } from "react"

import { Linking, Text, View } from "react-native"

import { LoadingScreen } from "@/app/loading"
import { Award } from "iconsax-react-native"

import {
  Button,
  Container,
  Content,
  HStack,
  Modal,
  VStack
} from "@/components/global/atoms"
import { SubscriptionCard } from "@/components/global/molecules"
import { Header } from "@/components/global/organisms"

import { COLORS } from "@/constants/color"
import { UserSubscriptionStatus } from "@/constants/enum/UserSubscription"

import { useAuth } from "@/contexts/AuthContext"

import { useGetAllSubscriptions } from "@/hooks/useSubscription"
import { useCreateSubscriptionTransaction } from "@/hooks/useTransaction"
import { useGetUserSubscriptionByUserId } from "@/hooks/useUserSubscription"

import { parseJSON } from "@/utils/helpers"

const getRemainingDays = (expiresAt: string | undefined) => {
  if (!expiresAt) return 0
  const today = new Date()
  const expiryDate = new Date(expiresAt)
  const diffTime = expiryDate.getTime() - today.getTime()
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

const getRemainingDaysText = (expiresAt: string | undefined) => {
  const days = getRemainingDays(expiresAt)
  if (days <= 0) return ""
  if (days === 1) return "Còn 1 ngày"
  return `Còn ${days} ngày`
}

function SubscriptionsScreen() {
  const { user } = useAuth()
  const userId = user?.userId
  const userSubscription = user?.subscription

  const { mutate: createSubscriptionTransaction } =
    useCreateSubscriptionTransaction()

  const { data: subscriptionsData, isLoading } = useGetAllSubscriptions(
    1,
    3,
    "",
    true,
    true
  )
  const { data: userSubscriptionData } = useGetUserSubscriptionByUserId(userId)

  const currentSubscription = userSubscriptionData?.find(
    (item) => item.status === UserSubscriptionStatus.Active
  )

  const [selectedSubscription, setSelectedSubscription] = useState<string>("")
  const [selectedSubscriptionId, setSelectedSubscriptionId] = useState<
    string | null
  >(null)
  const [warningModalVisible, setWarningModalVisible] = useState<boolean>(false)
  const [downgradeModalVisible, setDowngradeModalVisible] =
    useState<boolean>(false)

  useEffect(() => {
    if (subscriptionsData?.subscriptions.length) {
      const currentUserSubscription = subscriptionsData.subscriptions.find(
        (sub) => sub.name === userSubscription
      )

      if (currentUserSubscription) {
        setSelectedSubscription(currentUserSubscription.name)
        setSelectedSubscriptionId(currentUserSubscription.subscriptionId)
      } else {
        const firstSub = subscriptionsData.subscriptions[0]
        setSelectedSubscription(firstSub.name)
        setSelectedSubscriptionId(firstSub.subscriptionId)
      }
    }
  }, [subscriptionsData, userSubscription])

  const selectedPlan = subscriptionsData?.subscriptions.find(
    (item) => item.name === selectedSubscription
  )

  const handleSelectPlan = (subscriptionId: string, name: string) => {
    setSelectedSubscription(name)
    setSelectedSubscriptionId(subscriptionId)
  }

  const handlePayment = () => {
    const transactionData = {
      userId: userId || "",
      subscriptionId: selectedSubscriptionId || "",
      description: `Thanh toán ${selectedPlan?.name}`,
      // amount: selectedPlan?.price
      amount: 10000
    }

    // console.log("Final Data:", JSON.stringify(transactionData, null, 2))

    createSubscriptionTransaction(transactionData, {
      onSuccess: async (response) => {
        const { paymentUrl } = response.data
        Linking.openURL(paymentUrl)
      }
    })
  }

  if (!subscriptionsData || isLoading) {
    return <LoadingScreen />
  }

  const handlePaymentPress = () => {
    const currentPlanIndex = subscriptionsData.subscriptions.findIndex(
      (sub) => sub.name === userSubscription
    )
    const selectedPlanIndex = subscriptionsData.subscriptions.findIndex(
      (sub) => sub.name === selectedSubscription
    )

    if (selectedPlanIndex < currentPlanIndex) {
      setDowngradeModalVisible(true)
    } else if (selectedPlanIndex > currentPlanIndex) {
      if (userSubscription === subscriptionsData.subscriptions[0].name) {
        handlePayment()
      } else {
        setWarningModalVisible(true)
      }
    } else {
      handlePayment()
    }
  }

  return (
    <>
      <Container>
        <Header back label="Gói đăng ký" />

        <Content className="mt-2 pb-12">
          <View className="flex-1 justify-between">
            {selectedPlan && (
              <VStack gap={20}>
                <VStack>
                  <Text className="font-tbold text-2xl text-primary">
                    {selectedPlan.name}
                  </Text>
                  <Text className="font-tregular text-xl text-accent">
                    Nâng cấp trải nghiệm của bạn
                  </Text>
                </VStack>

                <VStack gap={6}>
                  {parseJSON(selectedPlan.features).map((feature, index) => (
                    <HStack key={index} center>
                      <Award
                        variant="Bold"
                        size={24}
                        color={COLORS.NUTRITION.protein}
                      />
                      <Text
                        key={index}
                        className="font-tregular text-base text-primary"
                      >
                        {feature}
                      </Text>
                    </HStack>
                  ))}
                </VStack>
              </VStack>
            )}

            <VStack gap={12}>
              {userSubscription !== "Gói Cơ Bản" &&
                userSubscription === selectedSubscription && (
                  <View className="items-end">
                    <Text className="mr-2 font-tmedium text-base text-primary">
                      {getRemainingDaysText(currentSubscription?.expiresAt)}
                    </Text>
                  </View>
                )}

              {subscriptionsData.subscriptions.map((item, index) => (
                <SubscriptionCard
                  key={index}
                  name={item.name}
                  price={item.price}
                  durationDays={item.durationDays}
                  bookingAllowance={item.bookingAllowance}
                  isSelected={item.name === selectedSubscription}
                  onPress={() =>
                    handleSelectPlan(item.subscriptionId, item.name)
                  }
                />
              ))}
            </VStack>
          </View>
        </Content>

        <Button
          size="lg"
          disabled={selectedSubscription === userSubscription}
          onPress={handlePaymentPress}
          className="mb-4"
        >
          Thanh toán
        </Button>
      </Container>

      {/* <Modal
        isVisible={isModalVisible}
        title="Nâng cấp"
        description="Bạn có chắc chắn muốn nâng cấp gói không?"
        confirmText="Đồng ý"
        cancelText="Hủy"
        onConfirm={handlePayment}
        onClose={() => setIsModalVisible(false)}
      /> */}

      <Modal
        isVisible={warningModalVisible}
        title="Nâng cấp"
        description="Bạn có chắc chắn muốn nâng cấp gói không?"
        confirmText="Đồng ý"
        cancelText="Hủy"
        onConfirm={handlePayment}
        onClose={() => setWarningModalVisible(false)}
      />

      <Modal
        isVisible={downgradeModalVisible}
        title="Không thể hạ cấp"
        description="Bạn không thể hạ cấp xuống gói thấp hơn. Vui lòng chọn gói hiện tại hoặc nâng cấp."
        confirmText="Đồng ý"
        onConfirm={() => setDowngradeModalVisible(false)}
        onClose={() => setDowngradeModalVisible(false)}
      />
    </>
  )
}

export default SubscriptionsScreen
