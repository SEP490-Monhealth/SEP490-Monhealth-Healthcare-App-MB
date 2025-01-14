import React from "react"

import { useRouter } from "expo-router"

import { Button, Container, Content, VStack } from "@/components/global/atoms"

function AssistantScreen() {
  const router = useRouter()

  const handleSetup = () => {
    router.push("/(setup)")
  }

  const handleViewIntroSetup = () => {
    router.push("/(onboarding)")
  }

  const handleViewCompletedSetup = () => {
    router.push("/(setup)/completed")
  }

  const handleViewGoalSetup = () => {
    router.push("/(setup)/summary")
  }

  const handleViewSubscription = () => {
    router.push("/(setup)/subscriptions")
  }

  const handleViewSignUp = () => {
    router.push("/(setup)/sign-up")
  }

  const handleViewCertificate = () => {
    router.push("/(setup)/certification")
  }

  const handleViewService = () => {
    router.push("/(setup)/service")
  }

  return (
    <Container>
      <Content className="mt-2 pb-12">
        <VStack gap={20}>
          <Button size="lg" onPress={handleSetup}>
            Setup Hehe
          </Button>

          <Button size="lg" onPress={handleViewIntroSetup}>
            Onboarding
          </Button>

          <Button size="lg" onPress={handleViewCompletedSetup}>
            Hoàn thành
          </Button>

          <Button size="lg" onPress={handleViewGoalSetup}>
            Mục tiêu
          </Button>

          <Button size="lg" onPress={handleViewSubscription}>
            Gói đăng kí
          </Button>

          <Button size="lg" onPress={handleViewSignUp}>
            Đăng kí consultant
          </Button>

          <Button size="lg" onPress={handleViewCertificate}>
            Chứng chỉ
          </Button>

          <Button size="lg" onPress={handleViewService}>
            Dịch vụ
          </Button>
        </VStack>
      </Content>
    </Container>
  )
}
export default AssistantScreen
