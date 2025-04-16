import React from "react"

import { Linking, View } from "react-native"

import { useLocalSearchParams } from "expo-router"

import { LoadingScreen } from "@/app/loading"

import {
  Container,
  Content,
  ScrollArea,
  VStack
} from "@/components/global/atoms"
import { MeetingCard, MetricCard } from "@/components/global/molecules"
import { Header, Section } from "@/components/global/organisms"

import { useAuth } from "@/contexts/AuthContext"

import { useGetBookingsByUserIdAndConsultantId } from "@/hooks/useBooking"
import { useGetChatById } from "@/hooks/useChat"
import { useGetGoalsByUserId } from "@/hooks/useGoal"
import { useGetMetricsByUserId } from "@/hooks/useMetric"

const ChatInformationScreen = () => {
  const { chatId } = useLocalSearchParams<{ chatId: string }>()

  const { user } = useAuth()
  const userId = user?.userId
  const consultantId = user?.consultantId

  const meetUrl = "https://meet.google.com/abc-defg-hij"

  const { data: chatData, isLoading: isChatLoading } = useGetChatById(chatId)
  const { data: bookingsData, isLoading: isBookingsLoading } =
    useGetBookingsByUserIdAndConsultantId(
      chatData?.userId,
      chatData?.consultantId
    )
  const { data: metricsData, isLoading: isMetricsLoading } =
    useGetMetricsByUserId(chatData?.userId)
  const { data: goalsData, isLoading: isGoalsLoading } = useGetGoalsByUserId(
    chatData?.userId
  )

  // console.log(JSON.stringify(bookingsData, null, 2))

  const handleViewMeetUrl = () => {
    Linking.openURL(meetUrl)
  }

  if (
    !chatData ||
    isChatLoading ||
    !bookingsData ||
    isBookingsLoading ||
    !metricsData ||
    isMetricsLoading ||
    !goalsData ||
    isGoalsLoading
  )
    return <LoadingScreen />

  const metricUser = metricsData[0]
  const goalUser = goalsData[0]

  return (
    <Container>
      <Header back label="Thông tin" />

      <Content className="mt-2">
        <ScrollArea>
          <View className="pb-12">
            <Section label="Link phòng họp" margin={false} />

            <MeetingCard meetUrl={meetUrl} onPress={handleViewMeetUrl} />

            {userId !== chatData?.userId && (
              <>
                <VStack gap={12}>
                  <Section label="Thông tin người dùng" />

                  {metricUser && goalUser && (
                    <MetricCard
                      variant="chat"
                      key={metricUser.metricId}
                      metric={metricUser}
                      goal={goalUser}
                    />
                  )}
                </VStack>
              </>
            )}

            <Section label="Lịch sử đặt lịch" />
          </View>
        </ScrollArea>
      </Content>
    </Container>
  )
}

export default ChatInformationScreen
