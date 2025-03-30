import React, { useState } from "react"

import { useRouter } from "expo-router"

import { Ghost, SearchNormal1 } from "iconsax-react-native"

import {
  Container,
  Content,
  Input,
  ScrollArea,
  VStack
} from "@/components/global/atoms"
import { ChatCard } from "@/components/global/molecules"
import { Header } from "@/components/global/organisms"

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
      <Header
        label="Tin nhắn"
        action={{
          icon: <Ghost variant="Bold" size={20} color={COLORS.primary} />,
          href: "/chats/monai"
        }}
      />

      <Content className="mt-2 pb-12">
        <ScrollArea className="flex-1">
          <VStack gap={20}>
            <Input
              value={searchQuery}
              placeholder="Tìm kiếm người dùng..."
              onChangeText={(text) => setSearchQuery(text)}
              startIcon={<SearchNormal1 size={20} color={COLORS.primary} />}
              canClearText
            />

            <VStack gap={12}>
              {chatData.map((chat) => (
                <ChatCard
                  key={chat.chatId}
                  fullName={chat.member.fullName}
                  avatarUrl={chat.member.avatarUrl}
                  lastMessage={chat.lastMessage}
                  lastMessageAt={chat.updatedAt}
                  onPress={() => handleViewChat(chat.chatId)}
                />
              ))}
            </VStack>
          </VStack>
        </ScrollArea>
      </Content>
    </Container>
  )
}

export default ChatScreen
