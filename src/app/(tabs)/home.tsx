import React from "react"

import { Text } from "react-native"

import { COLORS } from "@/constants/appConstants"
import { Notification } from "iconsax-react-native"

import { Container, HStack, VStack } from "@/components/global/atoms"
import { IconButton } from "@/components/global/molecules"

function HomeScreen() {
  return (
    <Container>
      <HStack className="mb-4 items-center justify-between">
        <VStack>
          <Text className="-mb-1 font-pregular text-lg text-accent">
            Chào buổi sáng,
          </Text>
          <Text className="font-nbold text-2xl text-primary">Van Huu Toan</Text>
        </VStack>

        <IconButton
          icon={
            <Notification variant="Bold" size={24} color={COLORS.primary} />
          }
        />
      </HStack>
    </Container>
  )
}

export default HomeScreen
