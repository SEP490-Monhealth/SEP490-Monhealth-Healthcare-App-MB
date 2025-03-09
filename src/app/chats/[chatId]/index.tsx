import React from "react"

import { Text } from "react-native"

import { useLocalSearchParams } from "expo-router"

import { Container, Content } from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

function ChatDetailsScreen() {
  const { chatId, consultantName } = useLocalSearchParams() as {
    chatId: string
    consultantName: string
  }

  console.log(chatId, consultantName)
  return (
    <Container>
      <Header back label={consultantName} />

      <Content className="mt-2">
        <Text>{chatId}</Text>
      </Content>
    </Container>
  )
}

export default ChatDetailsScreen
