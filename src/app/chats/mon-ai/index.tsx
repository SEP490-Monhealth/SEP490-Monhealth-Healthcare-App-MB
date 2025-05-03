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
import AsyncStorage from "@react-native-async-storage/async-storage"

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
  // const [newMessage, setNewMessage] = useState<string>("")

  const { mutate: chatMonAI } = useCreateChatMonAI()

  const handleStartConnection = async () => {
    // console.log("🚀 Starting chat connection process...")
    // console.log(`🔑 Using userId: ${userId}`)
    setHasStarted(true)

    if (!connectionStatus || !chatHubConnection) {
      let connection: HubConnection | null = null

      try {
        // console.log("🔌 Building hub connection...")
        connection = new HubConnectionBuilder()
          .withUrl(`${appConfig.baseUrl}/chat/mon-ai`, {
            accessTokenFactory: async () => {
              const token = await AsyncStorage.getItem("accessToken")
              // console.log(`🔒 Access token retrieved: ${token ? "✓" : "✗"}`)
              return token || ""
            }
          })
          .withAutomaticReconnect()
          .configureLogging(LogLevel.Information)
          .build()

        // console.log("👂 Setting up message listener...")
        connection.on("ReceiveMessage", (message) => {
          // console.log("📨 Message received:", JSON.stringify(message, null, 2))
          handleReceiveMessage(message)
        })

        connection.on("ErrorOccurred", (error) => {
          console.error("❌ Error from SignalR:", error)
        })

        connection.on("JoinedChat", (message) => {
          console.log("✅ Join confirmation:", message)
        })

        // console.log("🔄 Starting connection...")
        await connection.start()
        // console.log("✅ Connection started successfully")
        setConnectionStatus(true)

        // console.log(`👤 Joining chat with userId: ${userId}`)
        await connection.invoke("JoinChat", userId)
        // console.log("✅ JoinChat invoked successfully")

        setChatHubConnection(connection)
      } catch (error) {
        // console.error("❌ Error starting connection:", error)
        setConnectionStatus(false)
      }
    } else {
      console.log(
        "🔄 Connection already established, reusing existing connection"
      )
    }
  }

  useEffect(() => {
    // console.log("🧹 Setting up cleanup function")
    return () => {
      // console.log("🔌 Component unmounting, stopping connection...")
      if (chatHubConnection) {
        chatHubConnection.off("LoadMessageHistory")
        chatHubConnection.off("ReceiveMessage")
        chatHubConnection.off("ErrorOccurred")
        chatHubConnection.off("JoinedChat")
        chatHubConnection.stop()
        // console.log("🔌 Connection stopped")
      }
    }
  }, [chatHubConnection])

  const handleReceiveMessage = useCallback((message: any) => {
    // console.log("🔍 Processing received message...")
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
            // console.log("⚠️ Duplicate message detected, skipping")
            return prevMessages
          }
          // console.log("✅ Adding new message to chat")
          return [...prevMessages, validatedMessage]
        })
      } else {
        console.log(
          "⚠️ Message doesn't contain expected content format:",
          message
        )
      }
    } catch (error) {
      console.error("❌ Error processing received message:", error)
    }
  }, [])

  const handleSendMessage = async () => {
    if (!chatHubConnection || !newMessage.trim() || !connectionStatus) {
      // console.log("❌ Cannot send message - connection issues or empty message")
      return
    }

    // console.log("📤 Preparing to send message:", newMessage)

    const userMessage: ChatUserType = {
      messageId: Date.now().toString(),
      sender: userId || "",
      content: newMessage
    }

    try {
      // console.log("📝 Adding user message to chat")
      setMessages((prevMessages) => [...prevMessages, userMessage])

      // console.log("⏳ Setting AI typing status")
      setIsAITyping(true)

      // console.log("🚀 Sending message to API")
      await chatMonAI({
        userId: userId || "",
        query: newMessage
      })
      // console.log("✅ Message sent successfully")

      setNewMessage("")
    } catch (error) {
      // console.error("❌ Error sending message:", error)
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
          <ChatWelcome onStart={handleStartConnection} />
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
