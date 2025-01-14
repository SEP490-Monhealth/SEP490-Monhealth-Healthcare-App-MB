import React, { useState } from "react"

import { FlatList, Text, View } from "react-native"

import { Button, Container, Content, VStack } from "@/components/global/atoms"
import { ListHeader } from "@/components/global/molecules"
import { SubscriptionCard } from "@/components/global/molecules/SubscriptionCard"
import { Header } from "@/components/global/organisms"

import { sampleSubscriptionsData } from "@/constants/subscriptions"

import { useAuth } from "@/contexts/AuthContext"

function SubscriptionScreen() {
  const { user } = useAuth()
  const userId = user?.userId

  const [selectedSubscription, setSelectedSubscription] = useState<{
    duration: number | 0
  }>({
    duration: 0
  })

  const subscriptionData = sampleSubscriptionsData[1]

  const handleSubscriptionPress = (duration: number) => {
    setSelectedSubscription({
      duration
    })
  }

  const handleCompletePress = () => {
    if (selectedSubscription.duration) {
      const selectedDetails = {
        subscriptionId: subscriptionData.subscriptionId,
        duration: selectedSubscription.duration * 30,
        userId: userId
      }
      console.log("Selected subscription:", selectedDetails)
    }
  }

  return (
    <Container>
      <Header back label="Gói đăng kí" />

      <Content className="mt-2">
        <VStack gap={20}>
          {subscriptionData && subscriptionData.features && (
            <VStack>
              <Text className="font-tbold text-2xl text-primary">
                Nâng cấp trải nghiệm của bạn
              </Text>
              {subscriptionData.features.map((feature, index) => (
                <Text key={index} className="font-tregular text-lg text-accent">
                  {feature}
                </Text>
              ))}
            </VStack>
          )}

          <FlatList
            data={subscriptionData?.plans || []}
            keyExtractor={(item) => item.duration.toString()}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={<ListHeader />}
            renderItem={({ item }) => (
              <SubscriptionCard
                key={item.duration}
                duration={item.duration}
                price={item.price}
                discount={item.discount}
                isSelected={item.duration === selectedSubscription.duration}
                onPress={() => handleSubscriptionPress(item.duration)}
              />
            )}
            ListFooterComponent={
              <Text className="mt-10 text-center font-tregular text-accent">
                Chọn gói 6 tháng để tiết kiệm 20% và nhận trọn vẹn các tính năng
                cao cấp!
              </Text>
            }
            ItemSeparatorComponent={() => <View className="h-3" />}
          />
        </VStack>
      </Content>

      <Button
        size="lg"
        className="absolute bottom-0 left-6 right-6"
        onPress={handleCompletePress}
      >
        Thanh toán
      </Button>
    </Container>
  )
}

export default SubscriptionScreen
