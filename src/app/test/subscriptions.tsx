import React, { useState } from "react"

import { Text, View } from "react-native"

import { Star } from "iconsax-react-native"

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

  const subscriptionData = sampleSubscriptionsData[1]

  const [selectedPlan, setSelectedPlan] = useState(3)

  const handlePlanPress = (duration: number) => {
    setSelectedPlan(duration)
  }

  const handlePaymentPress = () => {
    if (selectedPlan) {
      const selectedDetails = {
        userId: userId,
        subscriptionId: subscriptionData.subscriptionId,
        duration: selectedPlan * 30
      }

      console.log("Selected subscription:", selectedDetails)
    }
  }

  return (
    <Container>
      <Header back label="Gói đăng ký" />

      <Content className="mt-2">
        <StepHeader
          title={subscriptionData.name}
          description="Nâng cấp trải nghiệm của bạn"
        />

        <View className="flex-1">
          {subscriptionData.features.map((feature, index) => (
            <HStack key={index} center>
              <Star variant="Bold" size={28} color={COLORS.lemon} />
              <Text className="flex-1 font-tregular text-base text-secondary">
                {feature}
              </Text>
            </HStack>
          ))}

          <VStack gap={12} className="mt-6">
            {subscriptionData?.plans.map((item, index) => (
              <SubscriptionCard
                key={index}
                duration={item.duration}
                price={item.price}
                discount={item.discount}
                isSelected={item.duration === selectedPlan}
                onPress={() => handlePlanPress(item.duration)}
              />
            ))}
          </VStack>

          <Text className="mt-8 text-center font-tregular text-secondary">
            Chọn gói 6 tháng để tiết kiệm 20% và nhận trọn vẹn các tính năng cao
            cấp!
          </Text>
        </View>
      </Content>

      <Button size="lg" className="mb-4" onPress={handlePaymentPress}>
        Thanh toán
      </Button>
    </Container>
  )
}

export default SubscriptionScreen
