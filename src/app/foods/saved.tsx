import React from "react"

import { Text } from "react-native"

import { Edit } from "iconsax-react-native"

import { Container, Content, VStack } from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

import { COLORS } from "@/constants/app"

function FoodSavedScreen() {
  return (
    <Container>
      <Header
        back
        label="Món ăn đã lưu"
        action={{
          icon: <Edit size={24} color={COLORS.primary} />
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

export default FoodSavedScreen
