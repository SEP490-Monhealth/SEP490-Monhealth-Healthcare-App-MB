import React from "react"

import { Text } from "react-native"

import { useLocalSearchParams } from "expo-router"

import { Container, Content } from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

function ChatDetailsScreen() {
  const { chatId, nameConsultant } = useLocalSearchParams() as {
    chatId: string
    nameConsultant: string
  }

  console.log(chatId, nameConsultant)
  return (
    <Container>
      <Header back label={nameConsultant} />
      <Content className="mt-2">
        <Text>{chatId}</Text>
      </Content>
    </Container>
  )
}

export default ChatDetailsScreen
