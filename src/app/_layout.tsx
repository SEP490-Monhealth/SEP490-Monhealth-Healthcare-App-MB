import React, { useEffect } from "react"

import { SafeAreaProvider } from "react-native-safe-area-context"

import { useFonts } from "expo-font"
import { SplashScreen, Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import { Poppins } from "@/styles/typography"

import "../styles/globals.css"

SplashScreen.preventAutoHideAsync()

function AppLayout() {
  const queryClient = new QueryClient()

  const [fontsLoaded, error] = useFonts(Poppins)

  useEffect(() => {
    if (error) throw error

    if (fontsLoaded) {
      SplashScreen.hideAsync()
    }
  }, [fontsLoaded, error])

  if (!fontsLoaded) {
    return null
  }

  if (!fontsLoaded && !error) {
    return null
  }

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" options={{ animation: "none" }} />

          <Stack.Screen
            name="(onboarding)/welcome"
            options={{ animation: "fade" }}
          />
        </Stack>
        <StatusBar style="auto" />
      </SafeAreaProvider>
    </QueryClientProvider>
  )
}

export default AppLayout
