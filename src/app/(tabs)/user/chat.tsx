import React, { useEffect, useMemo, useState } from "react"

import { ActivityIndicator, Keyboard, View } from "react-native"
import { FlatList } from "react-native"

import { useRouter } from "expo-router"

import { LoadingScreen } from "@/app/loading"
import { SearchNormal1 } from "iconsax-react-native"

import { Container, Content, Input } from "@/components/global/atoms"
import {
  ChatCard,
  ErrorDisplay,
  ListFooter,
  ListHeader
} from "@/components/global/molecules"
import { Header, Section } from "@/components/global/organisms"

import { COLORS } from "@/constants/color"
import { sampleSubscriptionsData } from "@/constants/data/subscriptions"

import { useAuth } from "@/contexts/AuthContext"

import { useGetChatsByUserId } from "@/hooks/useChat"
import { useDebounce } from "@/hooks/useDebounce"

import { ChatType } from "@/schemas/chatSchema"

function ChatScreen() {
  const router = useRouter()

  const { user } = useAuth()
  const userId = user?.userId
  const userSubscription = user?.subscription

  const checkSubscription = userSubscription !== sampleSubscriptionsData[0].name

  const [chatsData, setChatsData] = useState<ChatType[]>([])
  const [page, setPage] = useState<number>(1)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false)

  const limit = 10

  const debouncedSearch = useDebounce(searchQuery)

  const { data, isLoading } = useGetChatsByUserId(userId, page, limit)

  useEffect(() => {
    if (data?.chats) {
      setChatsData((prev) =>
        page === 1 ? data.chats : [...prev, ...data.chats]
      )
      setHasMore(page * limit < data.totalItems)
    }
  }, [data, page])

  useEffect(() => {
    setPage(1)
  }, [debouncedSearch])

  useEffect(() => {
    if (!isLoading && isRefreshing) {
      setIsRefreshing(false)
    }
  }, [isLoading, isRefreshing])

  const loadMoreData = () => {
    if (!hasMore || isLoading) return
    setPage((prev) => prev + 1)
  }

  const onEndReached = () => {
    if (isLoading || !hasMore) return
    Keyboard.dismiss()
    loadMoreData()
  }

  const onRefresh = () => {
    setIsRefreshing(true)
    Keyboard.dismiss()
    setPage(1)
  }

  const handleChatMonAI = () => {
    router.push("/chats/mon-ai")
  }

  const handleViewChat = (chatId: string) => {
    router.push(`/chats/${chatId}`)
  }

  const FlatListHeader = useMemo(() => {
    return (
      <ListHeader>
        {checkSubscription && (
          <View className="pt-4">
            <ChatCard
              fullName="MonAI"
              avatarUrl={require("../../../../public/images/avatars/mon-ai/mon-ai-avatar.jpg")}
              lastMessage="Chào bạn! Tôi là MonAI, trợ lý ảo của bạn. Tôi có thể giúp gì cho bạn?"
              onPress={handleChatMonAI}
            />
          </View>
        )}

        <Section label="Danh sách tin nhắn" />
      </ListHeader>
    )
  }, [])

  if (chatsData.length === 0 && isLoading) return <LoadingScreen />

  return (
    <Container>
      <Header label="Nhắn tin" />

      <Content className="mt-2">
        <Input
          value={searchQuery}
          placeholder="Tìm kiếm tin nhắn..."
          onChangeText={(text) => setSearchQuery(text)}
          startIcon={<SearchNormal1 size={20} color={COLORS.primary} />}
          canClearText
        />

        <FlatList
          data={chatsData || []}
          keyExtractor={(item, index) => `${item.chatId}-${index}`}
          onRefresh={onRefresh}
          refreshing={isRefreshing}
          showsVerticalScrollIndicator={false}
          stickyHeaderIndices={[0]}
          initialNumToRender={10}
          maxToRenderPerBatch={5}
          windowSize={5}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.5}
          ListHeaderComponent={FlatListHeader}
          renderItem={({ item }) => (
            <ChatCard
              key={item.chatId}
              fullName={item.consultant.fullName}
              avatarUrl={item.consultant.avatarUrl}
              lastMessage={item.lastMessage}
              lastMessageAt={item.updatedAt}
              onPress={() => handleViewChat(item.chatId)}
            />
          )}
          ListFooterComponent={
            hasMore ? (
              <ListFooter>
                <ActivityIndicator color={COLORS.primary} />
              </ListFooter>
            ) : (
              <ListFooter />
            )
          }
          ListEmptyComponent={
            <ErrorDisplay
              imageSource={require("../../../../public/images/monhealth-no-data-image.png")}
              title="Không có dữ liệu"
              description="Không tìm thấy có tin nhắn nào ở đây!"
              marginTop={24}
            />
          }
          ItemSeparatorComponent={() => <View className="h-3" />}
        />
      </Content>
    </Container>
  )
}

export default ChatScreen
