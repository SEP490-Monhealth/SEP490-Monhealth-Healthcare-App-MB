import React, { useCallback, useState } from "react"

import { useLocalSearchParams } from "expo-router"

import { LoadingOverlay } from "@/app/loading"

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
  const { tab } = useLocalSearchParams<{ tab: string }>()

  const { user } = useAuth()
  const userId = user?.userId
  const fullName = user?.fullName

  const [activeTab, setActiveTab] = useState(tab || "meal")
  const [overlayLoading, setOverlayLoading] = useState(false)

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }

  const handleOverlayLoading = useCallback((isLoading: boolean) => {
    setOverlayLoading(isLoading)
  }, [])

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
              <MealTab onOverlayLoading={handleOverlayLoading} />
            </TabsContent>

            <TabsContent value="water">
              <WaterTab onOverlayLoading={handleOverlayLoading} />
            </TabsContent>

            <TabsContent value="workout">
              <ActivityTab onOverlayLoading={handleOverlayLoading} />
            </TabsContent>
          </Tabs>
        </Content>
      </ScrollArea>
    </Container>
  )
}

export default HomeScreen
