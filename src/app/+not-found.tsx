import React from "react"

import { View } from "react-native"

import { useRouter } from "expo-router"

import { Button, Container } from "@/components/global/atoms"
import { ErrorDisplay } from "@/components/global/molecules"

import { useAuth } from "@/contexts/AuthContext"

function NotFoundScreen() {
  const router = useRouter()

  const { user } = useAuth()

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back()
    } else {
      if (user) {
        router.push("/")
      } else {
        router.push("/auth/sign-in")
      }
    }
  }

  return (
    <Container>
      <View className="flex-1 justify-center">
        <ErrorDisplay
          imageSource={require("../../public/images/monhealth-not-found-image.png")}
          title="Không tìm thấy trang"
          description="Trang bạn đang tìm không tồn tại. Hãy kiểm tra lại đường dẫn!"
        />
      </View>

      <Button size="lg" onPress={handleBack} className="mb-4">
        Quay lại
      </Button>
    </Container>
  )
}

export default NotFoundScreen
