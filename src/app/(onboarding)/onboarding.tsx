import React from "react"

import { Text, View } from "react-native"

import { useRouter } from "expo-router"

import { Button, Container } from "@/components/global/atoms"

function OnboardingScreen() {
  const router = useRouter()

  return (
    <Container>
      <Text>OnboardingScreen</Text>

      <Button className="w-full">Đăng nhập</Button>
      <Text className="w-full text-center">Bỏ qua</Text>
    </Container>
  )
}

export default OnboardingScreen
