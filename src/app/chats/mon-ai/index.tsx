import React, { useEffect, useRef, useState } from "react"

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

import { ChatInput, MessageItem, Welcome } from "@/components/local/tabs/chats"

import { useAuth } from "@/contexts/AuthContext"

import { useCreateChatMonAI } from "@/hooks/useChat"

const ChatMonAIScreen = () => {
  const { user } = useAuth()
  const userId = user?.userId

  const { mutate: chatMonAI } = useCreateChatMonAI()

  const flatListRef = useRef<FlatList>(null)

  const [chatHubConnection, setChatHubConnection] = useState<HubConnection>()
  const [connectionStatus, setConnectionStatus] = useState<boolean>(false)
  const [messages, setMessages] = useState<MessageType[]>([])
  const [isAITyping, setIsAITyping] = useState<boolean>(false)
  const [newMessage, setNewMessage] = useState<string>(
    "Tôi muốn tăng cân nhanh chóng, bạn có thể giúp tôi không?"
  )

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
      .withUrl(`${appConfig.baseUrl}/chat/mon-ai`)
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Information)
      .build()

    try {
      await hubConnection.start()
      console.log("Connection started")
      setConnectionStatus(true)

      hubConnection.on("ReceiveMessage", (message: any) => {
        console.log("=== Raw Message Structure ===")
        console.log(JSON.stringify(message, null, 2))

        setIsAITyping(false)

        try {
          if (
            message &&
            (message.content?.generalAdvice ||
              message.content?.summaryConversation)
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
      })
    } catch (error) {
      console.error("Error starting connection:", error)
      setConnectionStatus(false)
    }
    setChatHubConnection(hubConnection)
  }

  const handleSendMessage = async () => {
    if (chatHubConnection && newMessage) {
      const newData = {
        userId: userId || "",
        query: newMessage
      }

      try {
        const userMessage: ChatUserType = {
          messageId: Date.now().toString(),
          sender: userId || "",
          content: newMessage
        }
        setMessages((prevMessages) => [...prevMessages, userMessage])
        setIsAITyping(true)

        // console.log(JSON.stringify(newData, null, 2))
        await chatMonAI(newData)

        // await chatHubConnection.invoke("SendMessageToClient", newData)
        setNewMessage("")
      } catch (error) {
        console.error("Error sending message:", error)
        setIsAITyping(false)
      }
    }
  }

  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true })
      }, 100)
    }
  }, [messages])

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="px-6">
        <Header back label="Mon AI" />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 px-6 pt-2"
      >
        {messages.length === 0 ? (
          <Welcome />
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

        <ChatInput
          value={newMessage}
          onChangeText={setNewMessage}
          onSubmit={handleSendMessage}
          isDisabled={!newMessage.trim() || !connectionStatus}
          isAITyping={isAITyping}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default ChatMonAIScreen
