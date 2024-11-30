import { Stack } from "expo-router"

function OnboardingLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, animation: "none" }}>
      <Stack.Screen name="onboarding" />
      <Stack.Screen name="welcome" />
    </Stack>
  )
}

export default OnboardingLayout
