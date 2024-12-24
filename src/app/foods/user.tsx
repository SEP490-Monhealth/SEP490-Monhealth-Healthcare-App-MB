import React from "react"

import { Text } from "react-native"

import { Container, Content, VStack } from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

function FoodUserScreen() {
  return (
    <Container>
      <Header back label="Món ăn của tôi" />

      <Content margin={false}>
        <VStack center className="pb-12">
          <Text>Halo</Text>
        </VStack>
      </Content>
    </Container>
  )
}

export default FoodUserScreen
