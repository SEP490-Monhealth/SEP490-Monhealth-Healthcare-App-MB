import React, { useState } from "react"

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
import { Header } from "@/components/global/organisms"

import {
  CancelledTab,
  CompletedTab,
  ConfirmedTab,
  PendingTab
} from "@/components/local/bookings"

function BookingConsultantScreen() {
  const { tab } = useLocalSearchParams()

  const [activeTab, setActiveTab] = useState(tab || "pending")
  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }

  return (
    <Container>
      <Header back label="Quản lý lịch hẹn" />
      <Content className="mt-2">
        <ScrollArea className="flex-1">
          <Tabs defaultValue={activeTab} contentMarginTop={8}>
            <TabsList gap={32}>
              <TabsTrigger value="pending" onChange={handleTabChange}>
                Yêu cầu
              </TabsTrigger>

              <TabsTrigger value="confirmed" onChange={handleTabChange}>
                Xác nhận
              </TabsTrigger>

              <TabsTrigger value="completed" onChange={handleTabChange}>
                Hoàn thành
              </TabsTrigger>

              <TabsTrigger value="cancelled" onChange={handleTabChange}>
                Đã hủy
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pending">
              <PendingTab />
            </TabsContent>

            <TabsContent value="confirmed">
              <ConfirmedTab />
            </TabsContent>

            <TabsContent value="completed">
              <CompletedTab />
            </TabsContent>

            <TabsContent value="cancelled">
              <CancelledTab />
            </TabsContent>
          </Tabs>
        </ScrollArea>
      </Content>
    </Container>
  )
}

export default BookingConsultantScreen
