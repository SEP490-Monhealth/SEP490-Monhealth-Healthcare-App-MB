import React from "react"

import { View } from "react-native"

import LottieView from "lottie-react-native"

export default function LoadingScreen() {
  return (
    <View className="flex h-full min-h-screen items-center justify-center bg-background">
      <LottieView
        source={require("../../public/videos/monhealth-loading.json")}
        autoPlay
        loop
        style={{ width: 120, height: 120 }}
      />
    </View>
  )
}
