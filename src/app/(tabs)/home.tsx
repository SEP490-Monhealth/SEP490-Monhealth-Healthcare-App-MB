import React, { useEffect, useState } from "react"

import { useLocalSearchParams } from "expo-router"

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
  HomeHeader,
  MealTab,
  WaterTab,
  WorkoutTab
} from "@/components/local/tabs/home"

import { useAuth } from "@/contexts/AuthContext"

import { LoadingOverlay, LoadingScreen } from "../loading"

function HomeScreen() {
  const { user } = useAuth()
  const userId = user?.userId

  console.log(user)

  const { tab } = useLocalSearchParams()
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
                onLoading={setLoading}
                onOverlayLoading={setOverlayLoading}
              />
            </TabsContent>

            <TabsContent value="water">
              <WaterTab
                onLoading={setLoading}
                onOverlayLoading={setOverlayLoading}
              />
            </TabsContent>

            <TabsContent value="workout">
              <WorkoutTab onLoading={setLoading} />
            </TabsContent>
          </Tabs>
        </Content>
      </ScrollArea>
    </Container>
  )
}

export default HomeScreen
