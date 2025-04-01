import React from "react"

import { Text, View } from "react-native"

import { Container, Content } from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

const BankCreateScreen = () => {
  return (
    <Container>
      <Header back label="Thêm ngân hàng" />

      <Content className="mt-2">
        <Text>BankCreateScreen</Text>
      </Content>
    </Container>
  )
}

export default BankCreateScreen
