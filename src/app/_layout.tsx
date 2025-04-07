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

// Ngăn không cho màn hình splash tự động ẩn
SplashScreen.preventAutoHideAsync()

// Cấu hình logger cho Reanimated
configureReanimatedLogger({
  strict: false,
  level: ReanimatedLogLevel.warn
})

// Cấu hình xử lý thông báo
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true, // Hiển thị cảnh báo khi nhận thông báo
    shouldPlaySound: true, // Phát âm thanh khi nhận thông báo
    shouldSetBadge: true // Hiển thị badge trên icon ứng dụng
  })
})

function AppLayout() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1, // Thử lại yêu cầu 1 lần nếu thất bại
        refetchOnWindowFocus: false // Không tải lại dữ liệu khi cửa sổ được focus
      }
    }
  })

  const [expoPushToken, setExpoPushToken] = useState<string>("")
  const [fontsLoaded, fontError] = useFonts(MonFonts)

  // console.log(expoPushToken)

  // Xử lý việc tải font
  useEffect(() => {
    if (fontError) {
      console.error("Lỗi khi tải font:", fontError)
    } else if (fontsLoaded) {
      SplashScreen.hideAsync()
    }
  }, [fontsLoaded, fontError])

  // Thiết lập thông báo
  useEffect(() => {
    // Thiết lập thông báo và lưu hàm giải phóng
    const unsubscribeNotifications = setupNotifications(setExpoPushToken)

    // Trả về hàm giải phóng cho useEffect
    return () => {
      // Gọi hàm giải phóng được trả về từ setupNotifications
      if (unsubscribeNotifications) {
        unsubscribeNotifications()
      }
    }
  }, [])

  // Không hiển thị gì khi font đang tải
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
