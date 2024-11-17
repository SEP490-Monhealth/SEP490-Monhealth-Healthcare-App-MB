import React from "react"

import { SafeAreaProvider } from "react-native-safe-area-context"

import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"

function OnboardingLayout() {
  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }} />
      <StatusBar style="auto" />
    </SafeAreaProvider>
  )
}
export default OnboardingLayout
