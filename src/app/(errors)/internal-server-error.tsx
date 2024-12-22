import React from "react"

import { Text } from "react-native"
import { Image } from "react-native"
import { View } from "react-native"

import { useRouter } from "expo-router"

import { Button, Container, VStack } from "@/components/global/atoms"

function InternalServerErrorScreen() {
  const router = useRouter()

  const handleBack = () => {
    router.back()
  }

  return (
    <Container className="flex-1 justify-center pb-40">
      <VStack center gap={20}>
        <View className="w-full items-center">
          <Image
            source={require("../../../public/images/no-data-image.png")}
            style={{
              width: 320,
              height: 320,
              resizeMode: "cover"
            }}
          />
        </View>

        <VStack>
          <Text className="text-center font-tbold text-3xl text-primary">
            Có lỗi từ hệ thống
          </Text>

          <Text className="text-center font-tmedium text-lg text-secondary">
            Đã xảy ra lỗi, chúng tôi đang cố gắng khắc phục. Vui lòng thử lại
            sau
          </Text>
        </VStack>
      </VStack>

      <Button
        size="lg"
        onPress={handleBack}
        className="absolute bottom-4 left-6 right-6 w-full"
      >
        Quay lại
      </Button>
    </Container>
  )
}

export default InternalServerErrorScreen
