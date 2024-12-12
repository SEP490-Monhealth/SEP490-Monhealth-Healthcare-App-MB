import React from "react"

import { Stack } from "expo-router"

function UserLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, animation: "none" }}>
      <Stack.Screen name="user-information" />
    </Stack>
  )
}

export default UserLayout
