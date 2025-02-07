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

  const [selectedPlan, setSelectedPlan] = useState(3)

  const premiumSubscription = sampleSubscriptionsData[1]

  const featuresData = [
    "Gợi ý bữa ăn cá nhân hóa theo tuần",
    "Xem báo cáo dinh dưỡng hàng tuần",
    "Tương tác với chuyên viên tư vấn sức khỏe"
  ]

  const plansData = [
    {
      duration: 30,
      price: premiumSubscription.price,
      discount: 0
    },
    {
      duration: 90,
      price: premiumSubscription.price,
      discount: 10
    },
    {
      duration: 180,
      price: premiumSubscription.price,
      discount: 20
    }
  ]

  const handleSelectPlan = (duration: number) => {
    setSelectedPlan(duration)
  }

  const handleUpgrade = () => {
    const upgradeData = {
      userId: userId,
      subscriptionId: premiumSubscription.subscriptionId,
      duration: selectedPlan
    }

    console.log("Selected subscription:", upgradeData)
  }

  return (
    <Container>
      <Header back label="Gói đăng ký" />

      <Content className="mt-2 pb-12">
        <StepHeader
          title={premiumSubscription.name}
          description="Nâng cấp trải nghiệm của bạn"
        />

        <View className="flex-1 justify-between gap-1">
          <VStack>
            {featuresData.map((feature, index) => (
              <HStack key={index} center gap={6}>
                <Award variant="Bold" size={20} color={COLORS.PRIMARY.lemon} />
                <Text className="flex-1 font-tregular text-lg text-secondary">
                  {feature}
                </Text>
              </HStack>
            ))}
          </VStack>

          <VStack gap={12}>
            {plansData.map((item, index) => (
              <SubscriptionCard
                key={index}
                duration={item.duration}
                price={item.price}
                discount={item.discount}
                isSelected={item.duration === selectedPlan}
                onPress={() => handleSelectPlan(item.duration)}
              />
            ))}

            <Text className="mt-2 text-center font-tregular text-secondary">
              Chọn gói 6 tháng để tiết kiệm 20% và nhận trọn vẹn các tính năng
              cao cấp!
            </Text>
          </VStack>
        </View>
      </Content>

      <Button size="lg" onPress={handleUpgrade} className="mb-4">
        Thanh toán
      </Button>
    </Container>
  )
}

export default SubscriptionScreen
