import React from "react"

import { View } from "react-native"

import { useRouter } from "expo-router"

import { Button, Container, HStack } from "@/components/global/atoms"
import { ErrorDisplay } from "@/components/global/molecules"

function SetupCompleted() {
  const router = useRouter()

  const handleDone = () => {
    router.replace("/(tabs)/home")
  }

  return (
    <Container>
      <View className="flex-1 justify-center">
        <ErrorDisplay
          imageSource={require("../../../public/images/monhealth-congratulations.png")}
          title="Chúc mừng bạn đã hoàn thành bước đầu tiên"
          description="Các chỉ số sẽ giúp đề xuất chế độ dinh dưỡng, hoạt động thể chất,
              và các mục tiêu phù hợp"
        />
      </View>

      <HStack gap={12} className="mb-4">
        <Button variant="secondary" className="flex-1">
          Chia sẻ
        </Button>
        <Button onPress={handleDone} className="flex-1">
          Trang chủ
        </Button>
      </HStack>
    </Container>
  )
}

export default SetupCompleted
