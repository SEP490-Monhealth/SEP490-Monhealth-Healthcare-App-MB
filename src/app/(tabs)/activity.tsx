import React from "react"

import { useRouter } from "expo-router"

import { Button, Container, Content, VStack } from "@/components/global/atoms"

function ActivityScreen() {
  const router = useRouter()

  const handleSetup = () => {
    router.push("/(setup)")
  }

  const handleViewIntroSetup = () => {
    router.push("/(onboarding)")
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
        </VStack>
      </Content>
    </Container>
  )
}
export default ActivityScreen
