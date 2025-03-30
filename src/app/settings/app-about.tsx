import React from "react"

import { Text, View } from "react-native"

import { Container, Content, ScrollArea } from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

function AppAboutScreen() {
  return (
    <Container>
      <Header back label="Thông tin ứng dụng" />

      <Content className="mt-2">
        <ScrollArea>
          <Text>ahihi e nứng</Text>
        </ScrollArea>
      </Content>
    </Container>
  )
}

export default AppAboutScreen
