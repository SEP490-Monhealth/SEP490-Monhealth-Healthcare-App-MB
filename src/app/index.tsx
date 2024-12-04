import React, { useEffect } from "react"

import { Image, Text } from "react-native"

import { useRouter } from "expo-router"

import { Container } from "@/components/global/atoms"

function AppIndex() {
  const router = useRouter()

  useEffect(() => {
    setTimeout(() => {
      const isLoggedIn = false
      if (isLoggedIn) {
        router.replace("/(tabs)/home")
      } else {
        router.replace("/(onboarding)/onboarding")
      }
    }, 500)
  }, [])

  return (
    <Container className="flex flex-col items-center justify-center bg-primary">
      <Image
        source={require("../../public/images/splash-background.png")}
        resizeMode="cover"
        className="absolute left-0 top-0 h-full w-full"
      />

      <Image
        source={require("../../public/images/monhealth-logo.png")}
        resizeMode="cover"
        style={{ width: 120, height: 120 }}
      />

      <Text className="font-dbold text-4xl text-white">
        Mon<Text className="text-white">Health</Text>
      </Text>
    </Container>
  )
}

export default AppIndex
