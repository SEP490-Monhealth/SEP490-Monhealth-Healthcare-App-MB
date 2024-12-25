import React from "react"

import { Text } from "react-native"

import { Add } from "iconsax-react-native"

import { Container, Content, VStack } from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

import { COLORS } from "@/constants/app"

function FoodUserScreen() {
  return (
    <Container>
      <Header
        back
        label="Món ăn của tôi"
        action={{
          icon: <Add size={24} color={COLORS.primary} />,
          url: "/foods/create"
        }}
      />

      <Content margin={false}>
        <VStack center className="pb-12">
          <Text>Halo</Text>
        </VStack>
      </Content>
    </Container>
  )
}

export default FoodUserScreen
