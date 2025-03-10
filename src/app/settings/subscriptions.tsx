import React, { useState } from "react"

import { Text, View } from "react-native"

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
import { sampleSubscriptionsData } from "@/constants/subscriptions"

import { useAuth } from "@/contexts/AuthContext"

import { useUpgradeSubscription } from "@/hooks/useSubscription"

import { LoadingScreen } from "../loading"

function SubscriptionScreen() {
  const { user } = useAuth()
  const userId = user?.userId
  const userSubscription = user?.subscription

  const { mutate: upgradeSubscription } = useUpgradeSubscription()

  const subscriptionData = sampleSubscriptionsData
  const [selectedSubscription, setSelectedSubscription] = useState<string>(
    subscriptionData[0].name
  )
  const [selectedSubscriptionId, setSelectedSubscriptionId] =
    useState<string>("")
  const [isModalVisible, setIsModalVisible] = useState(false)

  const hasSubscription = userSubscription === subscriptionData[0].name

  const selectedPlan = subscriptionData.find(
    (item) => item.name === selectedSubscription
  )

  const handleSelectPlan = (subscriptionId: string, name: string) => {
    setSelectedSubscription(name)
    setSelectedSubscriptionId(subscriptionId)
  }

  const handleAction = () => {
    setIsModalVisible(true)
  }

  const handleUpgrade = () => {
    if (userId) {
      const upgradeData = {
        userId: userId,
        subscriptionId: selectedSubscriptionId
      }
      console.log("Final Data:", JSON.stringify(upgradeData, null, 2))
      // upgradeSubscription(upgradeData)
    }
  }

  if (!subscriptionData) return <LoadingScreen />

  return (
    <>
      <Container>
        <Header back label="Gói đăng kí" />
        <Content className="mt-2 pb-12">
          <View className="flex-1 justify-between">
            <VStack>
              {selectedPlan && (
                <VStack gap={10}>
                  <VStack>
                    <Text className="font-tbold text-2xl text-primary">
                      {selectedPlan.name}
                    </Text>
                    <Text className="-mt-2 font-tregular text-xl text-accent">
                      Nâng cấp trải nghiệm của bạn
                    </Text>
                  </VStack>
                  <VStack>
                    {selectedPlan.features.map((feature, idx) => (
                      <HStack key={idx} center>
                        <Award
                          variant="Bold"
                          size={26}
                          color={COLORS.NUTRITION.protein}
                        />
                        <Text
                          key={idx}
                          className="font-tregular text-base text-accent"
                        >
                          {feature}
                        </Text>
                      </HStack>
                    ))}
                  </VStack>
                </VStack>
              )}
            </VStack>

            <VStack gap={12}>
              {subscriptionData.map((item, index) => (
                <SubscriptionCard
                  key={index}
                  name={item.name}
                  price={item.price}
                  durationDays={item.durationDays}
                  maxBookings={item.maxBookings}
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
          disabled={selectedSubscription === "Gói Cơ Bản" || hasSubscription}
          size="lg"
          className="mb-4"
          onPress={handleAction}
        >
          Thanh toán
        </Button>
      </Container>

      <Modal
        isVisible={isModalVisible}
        title="Nâng cấp"
        description="Bạn có chắc chắn muốn nâng cấp gói không?"
        confirmText="Đồng ý"
        cancelText="Hủy"
        onConfirm={handleUpgrade}
        onClose={() => setIsModalVisible(false)}
      />
    </>
  )
}

export default SubscriptionScreen
