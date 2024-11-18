import React from "react"

import { Image, Text, View } from "react-native"

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
      <Image
        source={require("../../public/images/Monhealth-Logo.png")}
        resizeMode="cover"
        style={{ width: 120, height: 120 }}
      />

      <Text className="text-4xl font-bold text-black">
        Mon<Text className="text-primary">Health</Text>
      </Text>
    </View>
  )
}

export default AppIndex
