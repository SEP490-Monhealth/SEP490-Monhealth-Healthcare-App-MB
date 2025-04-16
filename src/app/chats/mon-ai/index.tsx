import React, { useCallback, useEffect, useRef, useState } from "react"

import {
  FlatList,
  KeyboardAvoidingView,
  SafeAreaView,
  View
} from "react-native"
import { Platform } from "react-native"

import { appConfig } from "@/configs/app"
import { ChatUserType, MessageType } from "@/types/mon-ai"
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel
} from "@microsoft/signalr"

import { Header } from "@/components/global/organisms"

import {
  ChatInput,
  ChatWelcome,
  MessageItem
} from "@/components/local/tabs/chats"

import { useAuth } from "@/contexts/AuthContext"

import { useCreateChatMonAI } from "@/hooks/useChat"

function ChatMonAIScreen() {
  const { user } = useAuth()
  const userId = user?.userId

  const flatListRef = useRef<FlatList>(null)

  const [chatHubConnection, setChatHubConnection] =
    useState<HubConnection | null>(null)
  const [connectionStatus, setConnectionStatus] = useState<boolean>(false)
  const [messages, setMessages] = useState<MessageType[]>([])
  const [isAITyping, setIsAITyping] = useState<boolean>(false)
  const [hasStarted, setHasStarted] = useState<boolean>(false)
  const [newMessage, setNewMessage] = useState<string>(
    "Tôi muốn tăng cân nhanh chóng, bạn có thể giúp tôi không?"
  )

  const { mutate: chatMonAI } = useCreateChatMonAI()

  const handleReceiveMessage = useCallback((message: any) => {
    setIsAITyping(false)

    try {
      if (
        message &&
        (message.content?.generalAdvice || message.content?.summaryConversation)
      ) {
        const validatedMessage = {
          messageId: message.messageId || Date.now().toString(),
          sender: message.sender || "MonAI",
          content: message.content
        }

        setMessages((prevMessages) => {
          const isDuplicate = prevMessages.some(
            (msg) => msg.messageId === validatedMessage.messageId
          )
          if (isDuplicate) {
            return prevMessages
          }
          return [...prevMessages, validatedMessage]
        })
      }
    } catch (error) {
      console.error("Error processing received message:", error)
    }
  }, [])

  const createHubConnection = useCallback(async () => {
    if (chatHubConnection) {
      return
    }

    const hubConnection = new HubConnectionBuilder()
      .withUrl(`${appConfig.baseUrl}/chat/mon-ai`)
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Information)
      .build()

    try {
      hubConnection.on("ReceiveMessage", handleReceiveMessage)

      await hubConnection.start()
      console.log("Connection started")

      setConnectionStatus(true)
      setHasStarted(true)
      setChatHubConnection(hubConnection)
    } catch (error) {
      console.error("Error starting connection:", error)
      setConnectionStatus(false)
      setHasStarted(false)
    }
  }, [chatHubConnection, handleReceiveMessage])

  useEffect(() => {
    return () => {
      if (chatHubConnection) {
        console.log("Stopping SignalR connection")
        chatHubConnection.stop()
      }
    }
  }, [chatHubConnection])

  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true })
      }, 100)
    }
  }, [messages])

  const handleStartConnection = () => {
    createHubConnection()
  }

  const handleSendMessage = async () => {
    if (!chatHubConnection || !newMessage.trim() || !connectionStatus) {
      return
    }

    const userMessage: ChatUserType = {
      messageId: Date.now().toString(),
      sender: userId || "",
      content: newMessage
    }

    try {
      setMessages((prevMessages) => [...prevMessages, userMessage])

      setIsAITyping(true)

      await chatMonAI({
        userId: userId || "",
        query: newMessage
      })

      setNewMessage("")
    } catch (error) {
      console.error("Error sending message:", error)
      setIsAITyping(false)
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="px-6">
        <Header back label="Mon AI" />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 px-6 pt-2"
      >
        {!hasStarted ? (
          <ChatWelcome onStartConnection={handleStartConnection} />
        ) : (
          <FlatList
            ref={flatListRef}
            data={messages}
            renderItem={({ item }) => (
              <MessageItem item={item} userId={userId} />
            )}
            keyExtractor={(item) => item.messageId}
            showsVerticalScrollIndicator={false}
            inverted={false}
            onContentSizeChange={() => {
              flatListRef.current?.scrollToEnd({ animated: true })
            }}
            onLayout={() => {
              flatListRef.current?.scrollToEnd({ animated: true })
            }}
            ListFooterComponent={() =>
              isAITyping ? (
                <MessageItem
                  item={{
                    messageId: "typing",
                    sender: "MonAI",
                    content: "Mon AI đang suy nghĩ..."
                  }}
                  userId={userId}
                />
              ) : null
            }
          />
        )}

        {hasStarted && (
          <ChatInput
            value={newMessage}
            onChangeText={setNewMessage}
            onSubmit={handleSendMessage}
            isDisabled={!newMessage.trim() || !connectionStatus}
            isAITyping={isAITyping}
          />
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default ChatMonAIScreen
