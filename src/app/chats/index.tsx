import React, { useState } from "react"

import { View } from "react-native"

import { useRouter } from "expo-router"

import { SearchNormal1 } from "iconsax-react-native"

import {
  Container,
  Content,
  Input,
  ScrollArea,
  VStack
} from "@/components/global/atoms"
import { ChatCard, CustomHeader } from "@/components/global/molecules"
import { Header, Section } from "@/components/global/organisms"

import { sampleChatsData } from "@/constants/chats"
import { COLORS } from "@/constants/color"

function ChatScreen() {
  const router = useRouter()

  const chatData = sampleChatsData

  const [searchQuery, setSearchQuery] = useState<string>("")

  const handleViewChat = (chatId: string) => {
    router.push(`/chats/${chatId}`)
  }

  return (
    <Container>
      <CustomHeader
        content={
          <Input
            value={searchQuery}
            placeholder="Tìm kiếm chuyên viên tư vấn..."
            onChangeText={(text) => setSearchQuery(text)}
            startIcon={<SearchNormal1 size={20} color={COLORS.primary} />}
            canClearText
          />
        }
      />

      <Content className="mt-2">
        <ScrollArea>
          <Section label="Tin nhắn gần đây" margin={false} />

          <VStack gap={12}>
            {chatData.map((chat) => (
              <ChatCard
                key={chat.chatId}
                name={chat.consultantName}
                avatarUrl={chat.consultantAvatarUrl}
                lastMessage={chat.lastMessage}
                lastMessageAt={chat.updatedAt}
                onPress={() => handleViewChat(chat.chatId)}
              />
            ))}
          </VStack>
        </ScrollArea>
      </Content>
    </Container>
  )
}

export default ChatScreen
