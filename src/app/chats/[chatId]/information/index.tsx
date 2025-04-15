import React from "react"

import { Linking, View } from "react-native"

import { useLocalSearchParams } from "expo-router"

import { Container, Content, ScrollArea } from "@/components/global/atoms"
import { MeetingCard } from "@/components/global/molecules"
import { Header, Section } from "@/components/global/organisms"

import { useAuth } from "@/contexts/AuthContext"

import { useGetBookingsByUserIdAndConsultantId } from "@/hooks/useBooking"
import { useGetChatById } from "@/hooks/useChat"

const ChatInformationScreen = () => {
  const { chatId } = useLocalSearchParams<{ chatId: string }>()

  const { user } = useAuth()
  const userId = user?.userId
  const consultantId = user?.consultantId

  const meetUrl = "https://meet.google.com/abc-defg-hij"

  const { data: chatData } = useGetChatById(chatId)
  const { data: bookingsData } = useGetBookingsByUserIdAndConsultantId(
    chatData?.userId,
    chatData?.consultantId
  )

  console.log(JSON.stringify(bookingsData, null, 2))

  const handleViewMeetUrl = () => {
    Linking.openURL(meetUrl)
  }

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
                <Section label="Thông tin người dùng" />
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
