import React from "react"

import { Text } from "react-native"

import { Container, Content, ScrollArea } from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

function HealthTrackingScreen() {
  return (
    <Container>
      <Header back label="Chỉ số sức khỏe" />

      <Content className="mt-2">
        <ScrollArea>
          <Text>Health Tracking</Text>
        </ScrollArea>
      </Content>
    </Container>
  )
}

export default HealthTrackingScreen
