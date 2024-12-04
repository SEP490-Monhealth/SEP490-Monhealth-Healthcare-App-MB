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
      <VStack>
        <Text className="font-dbold pt-8 text-8xl text-primary">404</Text>
        <Text className="font-dbold text-2xl text-primary">
          Không tìm thấy trang
        </Text>

        <Text className="font-tmedium text-lg text-accent">
          Trang bạn vừa truy cập không tồn tại hoặc đã bị xóa
        </Text>
      </VStack>

      <Button
        size="lg"
        onPress={handleBack}
        className="absolute bottom-0 left-5 right-5 w-full"
      >
        Quay lại
      </Button>
    </Container>
  )
}

export default NotFoundScreen
