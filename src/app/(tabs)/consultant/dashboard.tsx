import React, { useCallback, useEffect, useState } from "react"

import { useLocalSearchParams } from "expo-router"

import { LoadingOverlay, LoadingScreen } from "@/app/loading"

import {
  Container,
  Content,
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

  const [activeTab, setActiveTab] = useState(tab || "spending")
  const [initialLoading, setInitialLoading] = useState(true)
  const [overlayLoading, setOverlayLoading] = useState(false)

  const { data: walletData, isLoading: isWalletLoading } =
    useGetWalletByConsultantId(consultantId)

  useEffect(() => {
    if (!isWalletLoading) {
      setInitialLoading(false)
    }
  }, [isWalletLoading])

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }

  const handleOverlayLoading = useCallback((isLoading: boolean) => {
    setOverlayLoading(isLoading)
  }, [])

  if (initialLoading) {
    return <LoadingScreen />
  }

  return (
    <Container>
      <LoadingOverlay visible={overlayLoading} />

      <DashboardHeader
        consultantId={consultantId}
        fullName={fullName}
        balance={walletData?.balance || 0}
      />

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
            <SpendingTab onOverlayLoading={handleOverlayLoading} />
          </TabsContent>

          <TabsContent value="bookings">
            <BookingTab onOverlayLoading={handleOverlayLoading} />
          </TabsContent>

          <TabsContent value="reviews">
            <ReviewTab
              consultantId={consultantId}
              onOverlayLoading={handleOverlayLoading}
            />
          </TabsContent>
        </Tabs>
      </Content>
    </Container>
  )
}

export default DashboardScreen
