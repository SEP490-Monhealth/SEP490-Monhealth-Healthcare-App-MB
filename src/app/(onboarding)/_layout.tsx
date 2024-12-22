import React from "react"

import { Stack } from "expo-router"

function OnboardingLayout() {
  return <Stack screenOptions={{ headerShown: false, animation: "none" }} />
}

export default OnboardingLayout
