import React, { useEffect } from "react"

import { Text, View } from "react-native"

import { useRouter } from "expo-router"

function AppIndex() {
  // const router = useRouter()

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     router.push("/(onboarding)/welcome")
  //   }, 2000)

  //   return () => clearTimeout(timer)
  // }, [router])

  return (
    <View className="flex h-screen items-center justify-center bg-[#fef3c7]">
      <Text className="text-3xl font-bold text-black">
        Mon<Text className="text-primary">Health</Text>
      </Text>
    </View>
  )
}

export default AppIndex
