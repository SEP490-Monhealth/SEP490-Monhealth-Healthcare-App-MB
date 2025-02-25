import React from "react"

import { View } from "react-native"

import { useRouter } from "expo-router"

import { Button, Container } from "@/components/global/atoms"
import { ErrorDisplay } from "@/components/global/molecules"

function InternalServerErrorScreen() {
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
          imageSource={require("../../../public/images/monhealth-internal-server-error-image.png")}
          title="Lỗi hệ thống"
          description="Đã xảy ra lỗi. Vui lòng thử lại sau!"
        />
      </View>

      <Button size="lg" onPress={handleBack} className="mb-4">
        Quay lại
      </Button>
    </Container>
  )
}

export default InternalServerErrorScreen
