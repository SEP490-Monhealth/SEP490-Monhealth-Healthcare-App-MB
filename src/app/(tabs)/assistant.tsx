import React, { useState } from "react"

import { Text } from "react-native"
import { View } from "react-native"

import { useRouter } from "expo-router"

import { Button, Container, Content, VStack } from "@/components/global/atoms"
import { Dialog } from "@/components/global/atoms/Dialog"

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
        </VStack>
      </Content>
    </Container>
  )
}
export default AssistantScreen
