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

function HomeScreen() {
  const { user } = useAuth()
  const userId = user?.userId

  const [activeTab, setActiveTab] = useState("meal")

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }

  console.log(userId)

  return (
    <Container>
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
              <MealTab />
            </TabsContent>

            <TabsContent value="water">
              <WaterTab />
            </TabsContent>

            <TabsContent value="activity">
              <ActivityTab />
            </TabsContent>
          </Tabs>
        </Content>
      </ScrollArea>
    </Container>
  )
}

export default HomeScreen
