import React from "react"

import { Text } from "react-native"

import { useRouter } from "expo-router"

import { Button, Container, VStack } from "@/components/global/atoms"

function NotFoundScreen() {
  const router = useRouter()

  const handleBack = () => {
    router.back()
  }

  return (
    <Container>
      <VStack className="mt-12">
        <Text className="font-tbold text-8xl text-typography">404</Text>
        <Text className="font-tbold text-2xl text-typography">
          Không tìm thấy trang
        </Text>

        <Text className="font-tmedium text-lg text-secondary">
          Trang bạn vừa truy cập không tồn tại hoặc đã bị xóa
        </Text>
      </VStack>

      <Button
        size="lg"
        onPress={handleBack}
        className="absolute bottom-16 left-5 right-5 w-full"
      >
        Quay lại
      </Button>
    </Container>
  )
}

export default NotFoundScreen
