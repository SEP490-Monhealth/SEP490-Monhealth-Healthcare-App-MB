import React, { useCallback, useState } from "react"

import { useLocalSearchParams } from "expo-router"

import { LoadingOverlay } from "@/app/loading"

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
  const userId = user?.userId
  const consultantId = user?.consultantId
  const fullName = user?.fullName

  const today = new Date().toISOString().split("T")[0]

  const [activeTab, setActiveTab] = useState(tab || "spending")
  const [overlayLoading, setOverlayLoading] = useState(false)

  const { data: walletData, refetch: refetchWallet } =
    useGetWalletByConsultantId(consultantId)

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }

  const handleOverlayLoading = useCallback((isLoading: boolean) => {
    setOverlayLoading(isLoading)
  }, [])

  const handleRefresh = useCallback(() => {
    refetchWallet()
  }, [refetchWallet])

  return (
    <Container>
      <LoadingOverlay visible={overlayLoading} />

      <DashboardHeader
        userId={userId}
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
            <SpendingTab
              consultantId={consultantId}
              date={today}
              onOverlayLoading={handleOverlayLoading}
              onWalletRefresh={handleRefresh}
            />
          </TabsContent>

          <TabsContent value="bookings">
            <BookingTab
              consultantId={consultantId}
              date={today}
              onOverlayLoading={handleOverlayLoading}
            />
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
