import React, { useCallback, useState } from "react"

import { LoadingOverlay } from "@/app/loading"
import { Profile } from "iconsax-react-native"

import {
  Container,
  Content,
  ScrollArea,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

import { MealTab } from "@/components/local/tabs/report/MealTab"
import { WeightTab } from "@/components/local/tabs/report/WeightTab"

import { COLORS } from "@/constants/color"

import { useAuth } from "@/contexts/AuthContext"

function ReportScreen() {
  const { user } = useAuth()
  const userId = user?.userId

  const [activeTab, setActiveTab] = useState<string>("meal")
  const [overlayLoading, setOverlayLoading] = useState<boolean>(false)

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }

  const handleOverlayLoading = useCallback((isLoading: boolean) => {
    setOverlayLoading(isLoading)
  }, [])

  // if (overlayLoading) {
  //   return <LoadingScreen />
  // }

  return (
    <Container>
      <LoadingOverlay visible={overlayLoading} />

      <Header
        label="Báo cáo"
        action={{
          icon: <Profile variant="Bold" size={20} color={COLORS.primary} />,
          href: `/settings/user/${userId}/information`
        }}
      />

      <ScrollArea>
        <Content className="pb-12">
          <Tabs defaultValue={activeTab} contentMarginTop={8}>
            <TabsList gap={32}>
              <TabsTrigger value="meal" onChange={handleTabChange}>
                Bữa ăn
              </TabsTrigger>

              <TabsTrigger value="weight" onChange={handleTabChange}>
                Cân nặng
              </TabsTrigger>
            </TabsList>

            <TabsContent value="meal">
              <MealTab
                userId={userId}
                onOverlayLoading={handleOverlayLoading}
              />
            </TabsContent>

            <TabsContent value="weight">
              <WeightTab
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

export default ReportScreen
