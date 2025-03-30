import React from "react"

import { useLocalSearchParams } from "expo-router"

import {
  Container,
  Content,
  ScrollArea,
  VStack
} from "@/components/global/atoms"
import { MessageCard } from "@/components/global/molecules/MessageCard"
import { Header } from "@/components/global/organisms"

function ChatDetailsScreen() {
  const { chatId } = useLocalSearchParams() as {
    chatId: string
  }

  console.log(chatId)

  return (
    <Container>
      <Header back label="Van Huu Toan Con" />

      <Content className="mt-2">
        <ScrollArea className="flex-1">
          <VStack gap={12}>
            <MessageCard
              type="sent"
              message="Mấy giờ bắt đầu bạng"
              timestamp="2025-03-30T19:06:00Z"
            />

            <MessageCard
              type="sent"
              message="Làm sớm sủi sớm"
              timestamp="2025-03-30T19:07:00Z"
            />

            <MessageCard
              type="received"
              avatarUrl="https://firebasestorage.googleapis.com/v0/b/diamoondb-1412.appspot.com/o/Monhealth%2Fusers%2Fef00731b-724a-4e80-8930-36b2abffbec6.jpg?alt=media&token=408e26ce-b249-4139-a919-5cac9082c35c"
              message="Chắc 8h di bạng tui đang làm"
              timestamp="2025-03-30T19:19:00Z"
            />

            <MessageCard
              type="sent"
              message="Ghê vậy"
              timestamp="2025-03-30T19:23:00Z"
            />

            <MessageCard
              type="sent"
              message="Phi vụ hả"
              timestamp="2025-03-30T19:23:00Z"
            />

            <MessageCard
              type="received"
              avatarUrl="https://firebasestorage.googleapis.com/v0/b/diamoondb-1412.appspot.com/o/Monhealth%2Fusers%2Fef00731b-724a-4e80-8930-36b2abffbec6.jpg?alt=media&token=408e26ce-b249-4139-a919-5cac9082c35c"
              message="Đúng r đang làm phi vụ"
              timestamp="2025-03-30T19:06:00Z"
            />
          </VStack>
        </ScrollArea>
      </Content>
    </Container>
  )
}

export default ChatDetailsScreen
