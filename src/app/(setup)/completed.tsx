import React from "react"

import { Image, Text, View } from "react-native"

import { router } from "expo-router"

import { Button, Container, HStack, VStack } from "@/components/global/atoms"

const handleDone = () => {
  router.replace("/(tabs)/home")
}

function SetupCompleted() {
  return (
    <Container className="flex-1">
      <View className="flex-1 justify-center">
        <VStack gap={32} center>
          <Image
            source={require("../../../public/images/monheal-setup-completed.png")}
            className="object-cover"
            style={{ width: 320, height: 320 }}
          />

          <VStack gap={12}>
            <Text className="text-center font-tbold text-3xl text-primary">
              Chúc mừng bạn đã hoàn thành bước đầu tiên
            </Text>

            <Text className="text-center font-tmedium text-base text-accent">
              Các chỉ số sẽ giúp đề xuất chế độ dinh dưỡng, hoạt động thể chất,
              và các mục tiêu phù hợp
            </Text>
          </VStack>
        </VStack>
      </View>

      <HStack gap={20}>
        <Button variant="secondary" size="lg" className="flex-1">
          Chia sẻ
        </Button>

        <Button size="lg" className="flex-1" onPress={handleDone}>
          Trang Home
        </Button>
      </HStack>
    </Container>
  )
}

export default SetupCompleted
