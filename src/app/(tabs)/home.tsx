import React from "react"

import { Text } from "react-native"

import { Notification } from "iconsax-react-native"

import { Container, HStack, VStack } from "@/components/global/atoms"
import { IconButton } from "@/components/global/molecules"

import { COLORS } from "@/constants/appConstants"

function HomeScreen() {
  const greeting = () => {
    const date = new Date()
    const hours = date.getHours()

    if (hours < 12) {
      return "Chào buổi sáng,"
    } else if (hours < 18) {
      return "Chào buổi chiều,"
    } else {
      return "Chào buổi tối,"
    }
  }

  return (
    <Container>
      <HStack className="mb-4 items-center justify-between">
        <VStack>
          <Text className="-mb-1 font-pregular text-lg text-muted">
            {greeting()}
          </Text>
          <Text className="font-nbold text-2xl text-typography">
            Van Huu Toan
          </Text>
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
