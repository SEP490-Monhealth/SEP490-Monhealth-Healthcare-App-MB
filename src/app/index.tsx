import React, { useEffect } from "react"

import { ImageBackground, Text } from "react-native"

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
        router.replace("/(onboarding)/welcome")
      }
    }, 2000)
  }, [])

  return (
    <Container className="flex flex-col items-center justify-center bg-primary">
      <ImageBackground
        source={require("../../public/images/splash-background.png")}
        resizeMode="cover"
      >
        {/* <Image
        source={require("../../public/images/monhealth-logo.png")}
        resizeMode="cover"
        style={{ width: 120, height: 120 }}
      /> */}

        <Text className="font-tbold text-4xl text-white">
          Mon<Text className="text-white">Health</Text>
        </Text>
      </ImageBackground>
    </Container>
  )
}

export default AppIndex
