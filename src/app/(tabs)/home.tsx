import React, { useState } from "react"

import {
  Container,
  Content,
  ScrollArea,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/global/atoms"

import {
  ActivityTab,
  HomeHeader,
  MealTab,
  WaterTab
} from "@/components/local/tabs/home"

import { useAuth } from "@/contexts/AuthContext"

import { LoadingOverlay, LoadingScreen } from "../loading"

function HomeScreen() {
  const { user } = useAuth()
  const userId = user?.userId

  const [activeTab, setActiveTab] = useState("meal")
  const [loading, setLoading] = useState(false)
  const [overlayLoading, setOverlayLoading] = useState(false)

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }

  console.log(userId)

  if (loading) <LoadingScreen />

  return (
    <Container>
      <LoadingOverlay visible={overlayLoading} />

      <HomeHeader fullName={user?.fullName} />

      <ScrollArea>
        <Content className="pb-12">
          <Tabs defaultValue={activeTab} contentMarginTop={8}>
            <TabsList center gap={32}>
              <TabsTrigger value="meal" onChange={handleTabChange}>
                Dinh dưỡng
              </TabsTrigger>
              <TabsTrigger value="water" onChange={handleTabChange}>
                Nước
              </TabsTrigger>
              <TabsTrigger value="activity" onChange={handleTabChange}>
                Bài tập
              </TabsTrigger>
            </TabsList>

            <TabsContent value="meal">
              <MealTab onLoading={setLoading} />
            </TabsContent>

            <TabsContent value="water">
              <WaterTab
                onLoading={setLoading}
                onOverlayLoading={setOverlayLoading}
              />
            </TabsContent>

            <TabsContent value="activity">
              <ActivityTab onLoading={setLoading} />
            </TabsContent>
          </Tabs>
        </Content>
      </ScrollArea>
    </Container>
  )
}

export default HomeScreen
