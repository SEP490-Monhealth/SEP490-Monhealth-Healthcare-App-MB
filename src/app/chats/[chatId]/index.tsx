import React, { useEffect, useRef, useState } from "react"

import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View
} from "react-native"

import { useLocalSearchParams } from "expo-router"

import { Send2 } from "iconsax-react-native"

import { HStack, Input } from "@/components/global/atoms"
import { ListFooter } from "@/components/global/molecules"
import { MessageCard } from "@/components/global/molecules/MessageCard"
import { Header } from "@/components/global/organisms"

import { sampleMessagesData } from "@/constants/data/messages"
import { MessageTypeEnum } from "@/constants/enum/Chat"

import { MessageType } from "@/schemas/messageSchema"

// Define interface for DateSeparator items
interface DateSeparatorType {
  messageId: string
  type: "dateSeparator"
  date: string
}

type FlatListItem = MessageType | DateSeparatorType

// Function to format date - Fixed to correctly identify today and yesterday
const formatDateForDisplay = (dateString: string): string => {
  // Parse the input date string as a UTC date
  const date = new Date(dateString)

  // Get the current date in UTC
  const today = new Date()
  const yesterday = new Date()
  yesterday.setUTCDate(yesterday.getUTCDate() - 1)

  // Create UTC-only date objects for comparison
  const messageDate = new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
  )
  const todayDate = new Date(
    Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate())
  )
  const yesterdayDate = new Date(
    Date.UTC(
      yesterday.getUTCFullYear(),
      yesterday.getUTCMonth(),
      yesterday.getUTCDate()
    )
  )

  // Compare dates and return the appropriate label
  if (messageDate.getTime() === todayDate.getTime()) {
    return "Hôm nay"
  } else if (messageDate.getTime() === yesterdayDate.getTime()) {
    return "Hôm qua"
  } else {
    const day = date.getUTCDate()
    const month = date.getUTCMonth() + 1
    const year = date.getUTCFullYear()
    return `${day}/${month}/${year}`
  }
}

const DateSeparator = ({ date }: { date: string }) => (
  <HStack center gap={8} className="my-4 justify-center">
    <View className="h-px flex-1 bg-muted" />
    <Text className="text-center font-tmedium text-sm text-accent">{date}</Text>
    <View className="h-px flex-1 bg-muted" />
  </HStack>
)

function ChatDetailsScreen() {
  const { chatId } = useLocalSearchParams<{ chatId: string }>()

  const [messages, setMessages] = useState<MessageType[]>(sampleMessagesData)
  const [processedMessages, setProcessedMessages] = useState<FlatListItem[]>([])
  const [inputMessage, setInputMessage] = useState("")
  const flatListRef = useRef<FlatList>(null)
  const [shouldScrollToEnd, setShouldScrollToEnd] = useState(true)

  // Process messages to add date separators
  useEffect(() => {
    const result: FlatListItem[] = []
    let currentDate = ""

    messages.forEach((msg) => {
      // Get date from createdAt
      const messageDate = new Date(msg.createdAt).toISOString().split("T")[0]

      // If date is different from current date, add a separator
      if (messageDate !== currentDate) {
        currentDate = messageDate
        result.push({
          messageId: `date-${messageDate}`,
          type: "dateSeparator",
          date: formatDateForDisplay(msg.createdAt)
        })
      }

      // Add message to list
      result.push(msg)
    })

    setProcessedMessages(result)
  }, [messages])

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (shouldScrollToEnd && processedMessages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true })
      }, 100)
    }
  }, [processedMessages, shouldScrollToEnd])

  // Track scroll position to decide whether to auto-scroll
  const handleScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y
    const contentHeight = event.nativeEvent.contentSize.height
    const scrollViewHeight = event.nativeEvent.layoutMeasurement.height

    // If user scrolled near end (within 100px), enable auto-scroll
    const isNearEnd = contentHeight - offsetY - scrollViewHeight < 100
    setShouldScrollToEnd(isNearEnd)
  }

  // Send message
  const sendMessage = () => {
    if (inputMessage.trim() === "") return

    const newMessage: MessageType = {
      messageId: Date.now().toString(),
      chatId: chatId || "default",
      senderId: "9D7E87A9-B070-4607-A0B0-2D2322AECE9B",
      receiveId: "122DC7DF-16DE-49A3-AB83-5299686F6203",
      type: MessageTypeEnum.Sent,
      content: inputMessage,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    setMessages([...messages, newMessage])
    setInputMessage("")

    // Enable auto-scroll when user sends a new message
    setShouldScrollToEnd(true)

    // Simulate response
    setTimeout(() => {
      const responseMessage: MessageType = {
        messageId: (Date.now() + 1).toString(),
        chatId: chatId || "default",
        senderId: "122DC7DF-16DE-49A3-AB83-5299686F6203",
        receiveId: "9D7E87A9-B070-4607-A0B0-2D2322AECE9B",
        type: MessageTypeEnum.Received,
        content: "Đây là tin nhắn phản hồi tự động",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        avatarUrl:
          "https://firebasestorage.googleapis.com/v0/b/diamoondb-1412.appspot.com/o/Monhealth%2Fusers%2Fef00731b-724a-4e80-8930-36b2abffbec6.jpg?alt=media&token=408e26ce-b249-4139-a919-5cac9082c35c"
      }

      setMessages((prevMessages) => [...prevMessages, responseMessage])
    }, 1000)
  }

  // Render each item in flatlist
  const renderItem = ({ item }: { item: FlatListItem }) => {
    // If it's a date separator, render DateSeparator component
    if (item.type === "dateSeparator") {
      return <DateSeparator date={(item as DateSeparatorType).date} />
    }

    // If it's a message, render MessageCard
    const messageItem = item as MessageType
    const index = processedMessages.findIndex(
      (msg) => msg.messageId === messageItem.messageId
    )
    let previousItem: FlatListItem | undefined

    // Find previous message, skipping date separators
    for (let i = index - 1; i >= 0; i--) {
      if (processedMessages[i].type !== "dateSeparator") {
        previousItem = processedMessages[i]
        break
      }
    }

    // Show avatar if it's a received message and previous message was not received
    const showAvatar =
      messageItem.type === MessageTypeEnum.Received &&
      (!previousItem ||
        previousItem.type === MessageTypeEnum.Sent ||
        previousItem.type === "dateSeparator")

    return (
      <MessageCard
        type={messageItem.type}
        message={messageItem.content}
        timestamp={messageItem.createdAt}
        avatarUrl={showAvatar ? messageItem.avatarUrl : undefined}
      />
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="px-6">
        <Header back label="Van Huu Toan Con" />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 px-6"
      >
        <FlatList
          ref={flatListRef}
          data={processedMessages}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.messageId}
          renderItem={renderItem}
          onLayout={() => flatListRef.current?.scrollToEnd({ animated: false })}
          onScroll={handleScroll}
          scrollEventThrottle={400}
          onContentSizeChange={() => {
            if (shouldScrollToEnd) {
              flatListRef.current?.scrollToEnd({ animated: false })
            }
          }}
          ListFooterComponent={<ListFooter />}
          ItemSeparatorComponent={() => <View className="h-3" />}
        />

        <HStack center gap={16} className="border-t border-border py-4">
          <View className="flex-1">
            <Input
              placeholder="Nhập tin nhắn..."
              value={inputMessage}
              onChangeText={setInputMessage}
              onSubmitEditing={sendMessage}
              canClearText
            />
          </View>

          <TouchableOpacity
            disabled={inputMessage.trim() === ""}
            onPress={sendMessage}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-primary"
          >
            <Send2 variant="Bold" size="20" color="white" />
          </TouchableOpacity>
        </HStack>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default ChatDetailsScreen
