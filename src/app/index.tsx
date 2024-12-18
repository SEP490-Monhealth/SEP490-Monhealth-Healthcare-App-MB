import React, { useEffect } from "react"

import { Text } from "react-native"

import { useRouter } from "expo-router"

import { Container } from "@/components/global/atoms"

function AppIndex() {
  const router = useRouter()

  useEffect(() => {
    setTimeout(() => {
      const isLoggedIn = true
      if (isLoggedIn) {
        router.replace("/(tabs)/home")
      } else {
        router.replace("/(onboarding)/welcome")
      }
    }, 2000)
  }, [])

  return (
    <Container className="flex flex-col items-center justify-center bg-background">
      <Text className="font-tbold text-4xl text-secondary">
        Mon<Text className="font-tbold text-primary">Health</Text>
      </Text>
    </Container>
  )
}

export default AppIndex
