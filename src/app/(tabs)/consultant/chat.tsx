import React from "react"

import { Text } from "react-native"

import { useRouter } from "expo-router"

import { Microphone } from "iconsax-react-native"

import { Container, Content, VStack } from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

import { COLORS } from "@/constants/color"

function ChatScreen() {
  const router = useRouter()

  return (
    <Container>
      <Header
        label="Chatbox"
        action={{
          icon: <Microphone variant="Bold" size={20} color={COLORS.primary} />,
          href: "/(tabs)/home"
        }}
      />

      <Content className="mt-2 pb-12">
        <VStack gap={20}>
          <Text>asd</Text>
        </VStack>
      </Content>
    </Container>
  )
}

export default ChatScreen
