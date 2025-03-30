import React from "react"

import { Text } from "react-native"

import { Container, Content } from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

function UpdateConsultantScreen() {
  return (
    <Container>
      <Header back label="Cập nhập thông tin" />

      <Content className="mt-2">
        <Text>Địt e đi</Text>
      </Content>
    </Container>
  )
}

export default UpdateConsultantScreen
