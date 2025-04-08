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

import { useAuth } from "@/contexts/AuthContext"

import { useCreatePayment } from "@/hooks/usePayment"
import { useGetAllSubscriptions } from "@/hooks/useSubscription"

import { parseJSON } from "@/utils/helpers"

function SubscriptionScreen() {
  const { user } = useAuth()
  const userId = user?.userId
  const userSubscription = user?.subscription

  const { mutate: createPayment } = useCreatePayment()

  const { data: subscriptionsData, isLoading } = useGetAllSubscriptions(
    1,
    3,
    "",
    true,
    true
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
    if (userId && selectedSubscriptionId) {
      const paymentData = {
        userId: userId,
        subscriptionId: selectedSubscriptionId,
        description: `Thanh toán nâng cấp gói ${selectedPlan?.name}`,
        // amount: selectedPlan?.price
        amount: 2000
      }

      // console.log("Final Data:", JSON.stringify(paymentData, null, 2))

      createPayment(paymentData, {
        onSuccess: async (response) => {
          const { paymentUrl } = response.data
          Linking.openURL(paymentUrl)
        }
      })
    }
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

export default SubscriptionScreen
