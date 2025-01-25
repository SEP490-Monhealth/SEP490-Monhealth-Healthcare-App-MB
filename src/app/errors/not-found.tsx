import React from "react"

import { View } from "react-native"

import { useRouter } from "expo-router"

import { Button, Container } from "@/components/global/atoms"
import { ErrorDisplay } from "@/components/global/molecules"

function NotFoundScreen() {
  const router = useRouter()

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back()
    } else {
      router.replace("/")
    }
  }

  return (
    <Container>
      <View className="flex-1 justify-center">
        <ErrorDisplay
          imageSource={require("../../../public/images/monhealth-not-found-image.png")}
          title="Không tìm thấy trang"
          description="Trang bạn vừa truy cập không tồn tại hoặc đã bị xóa"
        />
      </View>

      <Button size="lg" onPress={handleBack} className="mb-4">
        Quay lại
      </Button>
    </Container>
  )
}

export default NotFoundScreen
