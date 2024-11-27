import { Stack } from "expo-router"

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, animation: "none" }}>
      <Stack.Screen name="sign-in" />
      <Stack.Screen name="sign-up" />
      <Stack.Screen name="forgot-password" />
      <Stack.Screen name="otp-verification" />
      <Stack.Screen name="reset-password" />
    </Stack>
  )
}
