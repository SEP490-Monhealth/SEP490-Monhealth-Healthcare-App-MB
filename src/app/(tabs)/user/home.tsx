import React, { useCallback, useEffect, useState } from "react"

import { Text } from "react-native"

import { useLocalSearchParams } from "expo-router"

import { LoadingOverlay, LoadingScreen } from "@/app/loading"
import { registerForPushNotificationsAsync } from "@/configs/notification"

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

function HomeScreen() {
  const { user } = useAuth()
  const userId = user?.userId
  const fullName = user?.fullName

  // console.log(user)

  const { tab } = useLocalSearchParams<{ tab: string }>()

  const [activeTab, setActiveTab] = useState(tab || "meal")
  const [loading, setLoading] = useState(false)
  const [overlayLoading, setOverlayLoading] = useState(false)

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }

  // console.log(userId)

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

  // if (loading) return <LoadingScreen />

  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const getToken = async () => {
      const expoToken = await registerForPushNotificationsAsync()
      setToken(expoToken)
    }
    getToken()
  }, [])

  return (
    <Container>
      <LoadingOverlay visible={overlayLoading} />

      <HomeHeader userId={userId} fullName={fullName} />

      <Text>{token || "Chưa có token"}</Text>

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
