import React, { useCallback, useState } from "react"

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
  const { user } = useAuth()
  const userId = user?.userId
  const fullName = user?.fullName

  const [activeTab, setActiveTab] = useState<string>("meal")
  const [overlayLoading, setOverlayLoading] = useState<boolean>(false)

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
              <MealTab
                userId={userId}
                onOverlayLoading={handleOverlayLoading}
              />
            </TabsContent>

            <TabsContent value="water">
              <WaterTab
                userId={userId}
                onOverlayLoading={handleOverlayLoading}
              />
            </TabsContent>

            <TabsContent value="workout">
              <ActivityTab
                userId={userId}
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
