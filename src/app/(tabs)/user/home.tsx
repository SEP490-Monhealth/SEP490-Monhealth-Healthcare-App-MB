import React, { useCallback, useEffect, useState } from "react"

import { Platform } from "react-native"

import Constants from "expo-constants"
import * as Device from "expo-device"
import { useLocalSearchParams } from "expo-router"

import { LoadingOverlay } from "@/app/loading"
import { setupNotifications } from "@/configs/notification"

import {
  Container,
  Content,
  ScrollArea,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/global/atoms"

import { HomeHeader } from "@/components/local/tabs/home"
import { ActivityTab } from "@/components/local/tabs/home/ActivityTab"
import { MealTab } from "@/components/local/tabs/home/MealTab"
import { WaterTab } from "@/components/local/tabs/home/WaterTab"

import { useAuth } from "@/contexts/AuthContext"

import { useCreateDevice } from "@/hooks/useDevice"

function HomeScreen() {
  const { tab } = useLocalSearchParams<{ tab: string }>()

  const { user } = useAuth()
  const userId = user?.userId
  const fullName = user?.fullName

  const [activeTab, setActiveTab] = useState(tab || "meal")
  const [loading, setLoading] = useState(false)
  const [overlayLoading, setOverlayLoading] = useState(false)

  const [expoPushToken, setExpoPushToken] = useState<string>("")

  const { mutate: createDevice } = useCreateDevice()

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }

  useEffect(() => {
    if (tab) {
      setActiveTab(tab)
    }
  }, [tab])

  const handleLoading = useCallback((isLoading: boolean) => {
    setLoading(isLoading)
  }, [])

  const handleOverlayLoading = useCallback((isLoading: boolean) => {
    setOverlayLoading(isLoading)
  }, [])

  useEffect(() => {
    if (!userId) return

    const cleanup = setupNotifications(setExpoPushToken)
    return cleanup
  }, [userId])

  useEffect(() => {
    if (expoPushToken && userId) {
      const osMapping: Record<
        string,
        "iOS" | "Android" | "Windows" | "macOS" | "Linux"
      > = {
        ios: "iOS",
        android: "Android"
      }

      const finalData = {
        userId: userId,
        expoPushToken: expoPushToken,
        deviceModel: Device.modelName || "Unknown Device",
        os: osMapping[Platform.OS] || "iOS",
        osVersion: Platform.Version.toString(),
        appVersion: Constants.expoConfig?.version || "1.0.0"
      }

      // console.log(JSON.stringify(finalData, null, 2))

      createDevice(finalData)
    }
  }, [expoPushToken, userId, createDevice])

  // if (loading) return <LoadingScreen />

  return (
    <Container>
      <LoadingOverlay visible={overlayLoading} />

      <HomeHeader userId={userId} fullName={fullName} />

      <ScrollArea>
        <Content className="pb-12">
          <Tabs defaultValue={activeTab} contentMarginTop={8}>
            <TabsList center gap={32}>
              <TabsTrigger value="meal" onChange={handleTabChange}>
                Bữa ăn
              </TabsTrigger>

              <TabsTrigger value="water" onChange={handleTabChange}>
                Nước
              </TabsTrigger>

              <TabsTrigger value="workout" onChange={handleTabChange}>
                Luyện tập
              </TabsTrigger>
            </TabsList>

            <TabsContent value="meal">
              <MealTab
                onLoading={handleLoading}
                onOverlayLoading={handleOverlayLoading}
              />
            </TabsContent>

            <TabsContent value="water">
              <WaterTab
                onLoading={handleLoading}
                onOverlayLoading={handleOverlayLoading}
              />
            </TabsContent>

            <TabsContent value="workout">
              <ActivityTab
                onLoading={handleLoading}
                onOverlayLoading={handleOverlayLoading}
              />
            </TabsContent>
          </Tabs>
        </Content>
      </ScrollArea>
    </Container>
  )
}

export default HomeScreen
