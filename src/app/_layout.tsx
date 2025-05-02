import React, { useEffect, useState } from "react"

import { GestureHandlerRootView } from "react-native-gesture-handler"
import {
  ReanimatedLogLevel,
  configureReanimatedLogger
} from "react-native-reanimated"
import { SafeAreaProvider } from "react-native-safe-area-context"

import { useFonts } from "expo-font"
import * as Notifications from "expo-notifications"
import { SplashScreen, Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"

import { setupNotifications } from "@/configs/notification"
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

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: true,
//     shouldSetBadge: true
//   })
// })

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: true
  })
})

function AppLayout() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        refetchOnWindowFocus: false
      }
    }
  })

  const [expoPushToken, setExpoPushToken] = useState<string>("")
  const [fontsLoaded, fontError] = useFonts(MonFonts)

  // console.log(expoPushToken)

  useEffect(() => {
    if (fontError) {
      console.error("Lỗi khi tải font:", fontError)
    } else if (fontsLoaded) {
      SplashScreen.hideAsync()
    }
  }, [fontsLoaded, fontError])

  useEffect(() => {
    const unsubscribeNotifications = setupNotifications(setExpoPushToken)

    return () => {
      if (unsubscribeNotifications) {
        unsubscribeNotifications()
      }
    }
  }, [])

  if (!fontsLoaded) {
    return null
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ModalProvider>
        <ErrorProvider>
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
        </ErrorProvider>
      </ModalProvider>
    </QueryClientProvider>
  )
}

export default AppLayout
