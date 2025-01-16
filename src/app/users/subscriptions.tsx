import React, { useState } from "react"

import { Text, View } from "react-native"

import { Award } from "iconsax-react-native"

import {
  Button,
  Container,
  Content,
  HStack,
  VStack
} from "@/components/global/atoms"
import { StepHeader } from "@/components/global/molecules"
import { SubscriptionCard } from "@/components/global/molecules/SubscriptionCard"
import { Header } from "@/components/global/organisms"

import { COLORS } from "@/constants/app"
import { sampleSubscriptionsData } from "@/constants/subscriptions"

import { useAuth } from "@/contexts/AuthContext"

function SubscriptionScreen() {
  const { user } = useAuth()
  const userId = user?.userId

  const premiumSubscription = sampleSubscriptionsData[1]

  const [selectedPlan, setSelectedPlan] = useState(3)

  const handlePlanSelect = (duration: number) => {
    setSelectedPlan(duration)
  }

  const handlePayment = () => {
    if (selectedPlan) {
      const paymentDetails = {
        userId: userId,
        subscriptionId: premiumSubscription.subscriptionId,
        duration: selectedPlan * 30
      }

      console.log("Selected subscription:", paymentDetails)
    }
  }

  return (
    <Container>
      <Header back label="Gói đăng ký" />

      <Content className="mt-2">
        <StepHeader
          title={premiumSubscription.name}
          description="Nâng cấp trải nghiệm của bạn"
        />

        <View className="flex-1 gap-1">
          {premiumSubscription.features.map((feature, index) => (
            <HStack key={index} center gap={6}>
              <Award variant="Bold" size={20} color={COLORS.PRIMARY.lemon} />
              <Text className="flex-1 font-tmedium text-base text-secondary">
                {feature}
              </Text>
            </HStack>
          ))}

          <VStack gap={12} className="mt-6">
            {premiumSubscription.plans.map((item, index) => (
              <SubscriptionCard
                key={index}
                duration={item.duration}
                price={item.price}
                discount={item.discount}
                isSelected={item.duration === selectedPlan}
                onPress={() => handlePlanSelect(item.duration)}
              />
            ))}
          </VStack>

          <Text className="mt-2 text-center font-tregular text-secondary">
            Chọn gói 6 tháng để tiết kiệm 20% và nhận trọn vẹn các tính năng cao
            cấp!
          </Text>
        </View>
      </Content>

      <Button size="lg" className="mb-4" onPress={handlePayment}>
        Thanh toán
      </Button>
    </Container>
  )
}

export default SubscriptionScreen
