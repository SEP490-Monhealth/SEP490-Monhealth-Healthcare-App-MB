import React, { useEffect } from "react"

import { Image, Text, View } from "react-native"

import { useRouter } from "expo-router"

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
    }, 2000)
  }, [])

  return (
    <View className="flex h-screen items-center justify-center">
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

      <Text className="font-nbold text-4xl text-typography">
        Mon<Text className="text-primary">Health</Text>
      </Text>
    </View>
  )
}

export default AppIndex
