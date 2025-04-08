import React, { useCallback, useEffect, useState } from "react"

import { useLocalSearchParams } from "expo-router"

import { LoadingOverlay, LoadingScreen } from "@/app/loading"

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
  BookingTab,
  ReviewTab,
  SpendingTab
} from "@/components/local/tabs/dashboard"
import { DashboardHeader } from "@/components/local/tabs/home/DashboardHeader"

import { useAuth } from "@/contexts/AuthContext"

import { useGetWalletByConsultantId } from "@/hooks/useWallet"

function DashboardScreen() {
  const { tab } = useLocalSearchParams<{ tab: string }>()

  const { user } = useAuth()
  const consultantId = user?.consultantId
  const fullName = user?.fullName

  const today = "2025-03-29"

  const [activeTab, setActiveTab] = useState(tab || "spending")
  const [loading, setLoading] = useState(false)
  const [overlayLoading, setOverlayLoading] = useState(false)

  const { data: walletData, isLoading: isWalletLoading } =
    useGetWalletByConsultantId(consultantId)

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

  if (!walletData || isWalletLoading) {
    return <LoadingScreen />
  }

  return (
    <Container>
      <LoadingOverlay visible={overlayLoading} />

      <DashboardHeader
        consultantId={consultantId}
        fullName={fullName}
        balance={walletData.balance}
      />

      <ScrollArea>
        <Content className="pb-12">
          <Tabs defaultValue={activeTab} contentMarginTop={8}>
            <TabsList center gap={32}>
              <TabsTrigger value="spending" onChange={handleTabChange}>
                Chi tiêu
              </TabsTrigger>

              <TabsTrigger value="bookings" onChange={handleTabChange}>
                Lịch hẹn
              </TabsTrigger>

              <TabsTrigger value="reviews" onChange={handleTabChange}>
                Đánh giá
              </TabsTrigger>
            </TabsList>

            <TabsContent value="spending">
              <SpendingTab
                onLoading={handleLoading}
                onOverlayLoading={handleOverlayLoading}
              />
            </TabsContent>

            <TabsContent value="bookings">
              <BookingTab
                onLoading={handleLoading}
                onOverlayLoading={handleOverlayLoading}
              />
            </TabsContent>

            <TabsContent value="reviews">
              <ReviewTab
                consultantId={consultantId}
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

export default DashboardScreen
