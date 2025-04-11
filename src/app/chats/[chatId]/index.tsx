import React, { useEffect, useState } from "react"

import {
  FlatList,
  KeyboardAvoidingView,
  SafeAreaView,
  View
} from "react-native"
import { Platform } from "react-native"
import { TouchableOpacity } from "react-native"

import { useLocalSearchParams } from "expo-router"

import { LoadingScreen } from "@/app/loading"
import { appConfig } from "@/configs/app"
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel
} from "@microsoft/signalr"
import { Send2 } from "iconsax-react-native"

import { HStack, Input } from "@/components/global/atoms"
import { MessageCard } from "@/components/global/molecules/MessageCard"
import { Header } from "@/components/global/organisms"

import { useAuth } from "@/contexts/AuthContext"

import { useCreateMessage, useGetMessagesByChatId } from "@/hooks/useMessage"

import { CreateMessageType, MessageType } from "@/schemas/messageSchema"

const ChatDetailsScreen = () => {
  const { chatId } = useLocalSearchParams<{ chatId: string }>()

  // console.log(chatId);

  const { user } = useAuth()
  const userId = user?.userId
  const consultantId = user?.consultantId

  const senderId = (consultantId ?? userId)!

  const [chatHubConnection, setChatHubConnection] = useState<HubConnection>()
  const [connectionStatus, setConnectionStatus] = useState<boolean>(false)
  const [newMessage, setNewMessage] = useState<string>("")
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(
    null
  )
  const { mutate: sendMessage } = useCreateMessage()

  const { data: messagesData, isLoading } = useGetMessagesByChatId(chatId)

  // console.log(JSON.stringify(messagesData, null, 2))

  useEffect(() => {
    createHubConnection()

    return () => {
      if (chatHubConnection) {
        chatHubConnection.stop()
      }
    }
  }, [])

  const createHubConnection = async () => {
    const hubConnection = new HubConnectionBuilder()
      .withUrl(`${appConfig.baseUrl}/chatbox`)
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Information)
      .build()

    try {
      await hubConnection.start()
      console.log("Connection started")
      setConnectionStatus(true)

      // hubConnection.on("ReceiveMessage", (message: MessageType) => {
      //   console.log("Received message:", message)
      //   if (message) {
      //     setMessages((prevMessages) => [...prevMessages, message])
      //   }
      // })

      // hubConnection.on(
      //   "LoadMessageHistory",
      //   (messageHistory: MessageType[]) => {
      //     console.log("Received message history:", messageHistory)
      //     setMessages(messageHistory || [])
      //   }
      // )
    } catch (error) {
      console.error("Error starting connection:", error)
      setConnectionStatus(false)
    }
    setChatHubConnection(hubConnection)
  }

  const handleSendMessage = async () => {
    if (chatHubConnection && newMessage) {
      const newData: CreateMessageType = {
        chatId: chatId,
        senderId,
        content: newMessage
      }

      try {
        console.log("Sending message:", JSON.stringify(newData, null, 2))

        await sendMessage(newData)

        setNewMessage("")
      } catch (error) {
        console.error("Error sending message:", error)
      }
    }
  }

  const handlePressMessage = async (selectedMessageId: string) => {
    setSelectedMessageId(selectedMessageId)
  }

  const renderMessageItem = ({ item }: { item: MessageType }) => (
    <MessageCard
      key={item.messageId}
      messageId={item.messageId}
      sender={item.senderId === senderId}
      message={item.content}
      timestamp={item.createdAt}
      avatarUrl={item.avatarUrl}
      isSelected={selectedMessageId === item.messageId}
      onPress={() => handlePressMessage(item.messageId)}
    />
  )

  if (isLoading) {
    return <LoadingScreen />
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
          data={messagesData}
          renderItem={renderMessageItem}
          keyExtractor={(item) => item.messageId}
          inverted
          showsVerticalScrollIndicator={false}
        />

        <HStack center gap={16} className="border-t border-border py-4">
          <View className="flex-1">
            <Input
              placeholder="Nhập tin nhắn..."
              value={newMessage}
              onChangeText={setNewMessage}
              onSubmitEditing={handleSendMessage}
            />
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            disabled={!newMessage.trim() || !connectionStatus}
            onPress={handleSendMessage}
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
