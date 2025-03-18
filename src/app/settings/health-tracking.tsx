import React from "react"

import { Text } from "react-native"

import { Setting2 } from "iconsax-react-native"

import { Container, Content, ScrollArea } from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

import { COLORS } from "@/constants/color"

function HealthTrackingScreen() {
  return (
    <Container>
      <Header
        back
        label="Chỉ số sức khỏe"
        action={{
          icon: <Setting2 size={24} color={COLORS.primary} />,
          href: "/user/metric"
        }}
      />

      <Content className="mt-2">
        <ScrollArea>
          <Text>Health Tracking</Text>
        </ScrollArea>
      </Content>
    </Container>
  )
}

export default HealthTrackingScreen
