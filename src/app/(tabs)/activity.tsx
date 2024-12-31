import React from "react"

import { useRouter } from "expo-router"

import { Button, Container, Content, VStack } from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

function ActivityScreen() {
  const router = useRouter()

  const handleSetup = () => {
    router.push("/(setup)")
  }

  const handleViewIntroSetup = () => {
    router.push("/(onboarding)")
  }

  const handleViewForgotPassword = () => {
    router.push("/(onboarding)/otp-confirm")
  }

  const handleViewCompletedSetup = () => {
    router.push("/(setup)/completed")
  }

  const handleViewGoalSetup = () => {
    router.push("/(setup)/goal")
  }

  return (
    <Container>
      <Header label="Tạo khẩu phần" />

      <Content>
        <VStack gap={20}>
          <Button size="lg" onPress={handleSetup}>
            Setup Hehe
          </Button>

          <Button size="lg" onPress={handleViewIntroSetup}>
            Onboarding
          </Button>

          <Button size="lg" onPress={handleViewForgotPassword}>
            Forgot Password
          </Button>

          <Button size="lg" onPress={handleViewCompletedSetup}>
            Hoàn thành
          </Button>

          <Button size="lg" onPress={handleViewGoalSetup}>
            Mục tiêu
          </Button>
        </VStack>
      </Content>
    </Container>
  )
}
export default ActivityScreen
