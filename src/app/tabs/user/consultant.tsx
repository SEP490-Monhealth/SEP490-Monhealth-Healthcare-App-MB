import React from "react"

import { useRouter } from "expo-router"

import { Container, Content, Schedule, VStack } from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

function AssistantScreen() {
  const router = useRouter()

  const today = new Date()

  return (
    <Container>
      <Header label="Chuyên viên" />

      <Content className="mt-2 pb-12">
        <VStack gap={20}>
          <Schedule initialDate={today} />
        </VStack>
      </Content>
    </Container>
  )
}
export default AssistantScreen
