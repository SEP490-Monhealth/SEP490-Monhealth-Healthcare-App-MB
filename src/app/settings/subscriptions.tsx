import React, { useEffect, useState } from "react"

import { Text, View } from "react-native"

import { router } from "expo-router"

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

import {
  useGetAllSubscriptions,
  useUpgradeSubscription
} from "@/hooks/useSubscription"

import { whoIAm } from "@/services/authService"

import { parseJSON } from "@/utils/helpers"

import { LoadingScreen } from "../loading"

function SubscriptionScreen() {
  const { user, setUser } = useAuth()
  const userId = user?.userId
  const userSubscription = user?.subscription

  const { mutate: upgradeSubscription } = useUpgradeSubscription()
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
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)

  useEffect(() => {
    if (subscriptionsData?.subscriptions.length) {
      const firstSub = subscriptionsData.subscriptions[0]
      setSelectedSubscription(firstSub.name)
      setSelectedSubscriptionId(firstSub.subscriptionId)
    }
  }, [subscriptionsData])

  const selectedPlan = subscriptionsData?.subscriptions.find(
    (item) => item.name === selectedSubscription
  )

  const hasSubscription = userSubscription === selectedPlan?.name

  const handleSelectPlan = (subscriptionId: string, name: string) => {
    setSelectedSubscription(name)
    setSelectedSubscriptionId(subscriptionId)
  }

  const handleUpgrade = () => {
    if (userId && selectedSubscriptionId) {
      const upgradeData = {
        userId: userId,
        subscriptionId: selectedSubscriptionId
      }

      // console.log("Final Data:", JSON.stringify(upgradeData, null, 2))

      upgradeSubscription(upgradeData, {
        onSuccess: async () => {
          try {
            const updatedUser = await whoIAm()
            setUser(updatedUser)
            router.push("/user-information")
          } catch (error) {
            console.error("Lỗi cập nhật user sau upgrade:", error)
          }
        }
      })
    }
  }

  if (!subscriptionsData || isLoading) return <LoadingScreen />

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
          disabled={
            selectedSubscription === subscriptionsData.subscriptions[0].name ||
            hasSubscription
          }
          size="lg"
          onPress={() => setIsModalVisible(true)}
          className="mb-4"
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
