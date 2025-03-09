import React, { useState } from "react"

import { View } from "react-native"

import { useRouter } from "expo-router"

import { SearchNormal1 } from "iconsax-react-native"

import {
  Container,
  Content,
  Input,
  ScrollArea
} from "@/components/global/atoms"
import { ChatCard, CustomHeader } from "@/components/global/molecules"

import { sampleChatsData } from "@/constants/chats"
import { COLORS } from "@/constants/color"

function ChatScreen() {
  const router = useRouter()
  const chatData = sampleChatsData

  const [searchQuery, setSearchQuery] = useState<string>("")

  const handleViewChat = (chatId: string, nameConsultant: string) => {
    router.push(
      `/chats/user/${chatId}/details?nameConsultant=${nameConsultant}`
    )
  }

  return (
    <Container>
      <CustomHeader
        content={
          <Input
            value={searchQuery}
            placeholder="Tìm kiếm tên tư vấn viên..."
            onChangeText={(text) => setSearchQuery(text)}
            startIcon={<SearchNormal1 size={20} color={COLORS.primary} />}
            canClearText
          />
        }
      />

      <Content className="mt-2">
        <ScrollArea>
          {chatData.map((chat) => (
            <View key={chat.ChatId} className="mb-4">
              <ChatCard
                name={chat.nameConsultant}
                avatarUrl={chat.avatarUrlConsultant}
                lastMessage={chat.lastMessage}
                lastMessageAt={chat.lastMessageAt}
                onPress={() => handleViewChat(chat.ChatId, chat.nameConsultant)}
              />
            </View>
          ))}
        </ScrollArea>
      </Content>
    </Container>
  )
}

export default ChatScreen
