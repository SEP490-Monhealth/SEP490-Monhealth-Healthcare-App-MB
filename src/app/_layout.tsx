import React, { useEffect } from "react"

import { GestureHandlerRootView } from "react-native-gesture-handler"
import {
  ReanimatedLogLevel,
  configureReanimatedLogger
} from "react-native-reanimated"
import { SafeAreaProvider } from "react-native-safe-area-context"

import { useFonts } from "expo-font"
import { SplashScreen, Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import { AuthProvider } from "@/providers/AuthProvider"
import { ErrorProvider } from "@/providers/ErrorProvider"
import { ModalProvider } from "@/providers/ModalProvider"
import { SearchProvider } from "@/providers/SearchProvider"
import { StorageProvider } from "@/providers/StorageProvider"

import { MonFonts } from "@/styles/typography"

import "../styles/globals.css"

SplashScreen.preventAutoHideAsync()

configureReanimatedLogger({
  strict: false,
  level: ReanimatedLogLevel.warn
})

function AppLayout() {
  const queryClient = new QueryClient()

  const [fontsLoaded, error] = useFonts(MonFonts)

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
      <ErrorProvider>
        <ModalProvider>
          <AuthProvider>
            <StorageProvider>
              <SearchProvider>
                <GestureHandlerRootView style={{ flex: 1 }}>
                  <SafeAreaProvider>
                    <Stack screenOptions={{ headerShown: false }} />
                    <StatusBar style="auto" backgroundColor="#fff" />
                  </SafeAreaProvider>
                </GestureHandlerRootView>
              </SearchProvider>
            </StorageProvider>
          </AuthProvider>
        </ModalProvider>
      </ErrorProvider>
    </QueryClientProvider>
  )
}

export default AppLayout
