import React, { useState } from "react"

import { FlatList, Text, View } from "react-native"

import { Button, Container, Content, VStack } from "@/components/global/atoms"
import { IntroHeader, ListHeader } from "@/components/global/molecules"
import { SubscriptionCard } from "@/components/global/molecules/SubscriptionCard"
import { Header } from "@/components/global/organisms"

import { sampleSubscriptionData } from "@/constants/subscriptions"

function SubscriptionScreen() {
  const subscriptionData = sampleSubscriptionData
  const [selectedSubscriptionId, setSelectedSubscriptionId] = useState<
    string | null
  >(null)

  const handleSubscriptionPress = (subscriptionId: string) => {
    setSelectedSubscriptionId(subscriptionId)
  }

  const handleCompletePress = () => {
    if (selectedSubscriptionId) {
      console.log("Selected Subscription ID:", selectedSubscriptionId)
    }
  }

  return (
    <Container>
      <Header back label="Gói đăng kí" />

      <Content className="mt-2">
        <VStack>
          <Text className="font-tregular text-lg text-accent">
            Đặt lịch với chuyên gia dinh dưỡng & sức khỏe
          </Text>
          <Text className="font-tregular text-lg text-accent">
            Lập kế hoạch cá nhân hóa về dinh dưỡng & bài tập
          </Text>
          <Text className="font-tregular text-lg text-accent">
            Theo dõi mục tiêu sức khỏe với công cụ phân tích chi tiết
          </Text>
        </VStack>

        <FlatList
          data={subscriptionData || []}
          keyExtractor={(item) => item.subscriptionId}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={<ListHeader />}
          renderItem={({ item }) => (
            <SubscriptionCard
              key={item.subscriptionId}
              name={item.name}
              price={item.price}
              discount={item.discount}
              time={item.time}
              isSelected={item.subscriptionId === selectedSubscriptionId}
              onPress={() => handleSubscriptionPress(item.subscriptionId)}
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
