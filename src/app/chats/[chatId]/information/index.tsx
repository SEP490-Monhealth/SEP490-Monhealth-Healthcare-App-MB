import React from "react"

import { Text, View } from "react-native"

import { Container, Content } from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

const ChatInformationScreen = () => {
  return (
    <Container>
      <Header back label="Thông tin" />

      <Content className="mt-2">
        <Text>ChatInformationScreen</Text>
      </Content>
    </Container>
  )
}

export default ChatInformationScreen
