import React, { useEffect, useState } from "react"

import {
  FlatList,
  KeyboardAvoidingView,
  SafeAreaView,
  View
} from "react-native"
import { Platform } from "react-native"
import { TouchableOpacity } from "react-native"

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

import { CreateMessageType, MessageType } from "@/schemas/messageSchema"

const ChatDetailsScreen = () => {
  const [chatHubConnection, setChatHubConnection] = useState<HubConnection>()
  const [connectionStatus, setConnectionStatus] = useState<boolean>(false)
  const [messages, setMessages] = useState<MessageType[]>([])
  const [newMessage, setNewMessage] = useState<string>("Halo")

  const senderId = "122DC7DF-16DE-49A3-AB83-5299686F6203"

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

      hubConnection.on("ReceiveMessage", (message: MessageType) => {
        console.log("Received message:", message)
        if (message) {
          setMessages((prevMessages) => [...prevMessages, message])
        }
      })

      hubConnection.on(
        "LoadMessageHistory",
        (messageHistory: MessageType[]) => {
          console.log("Received message history:", messageHistory)
          setMessages(messageHistory || [])
        }
      )
    } catch (error) {
      console.error("Error starting connection:", error)
      setConnectionStatus(false)
    }
    setChatHubConnection(hubConnection)
  }

  const handleSendMessage = async () => {
    if (chatHubConnection && newMessage) {
      const newData: CreateMessageType = {
        chatId: "556679e7-c406-404d-bcf0-d99bbd1a6c49",
        senderId: senderId,
        content: newMessage
      }

      try {
        await chatHubConnection.invoke("SendMessage", newData)
        setNewMessage("")
      } catch (error) {
        console.error("Error sending message:", error)
      }
    }
  }

  const renderMessageItem = ({ item }: { item: MessageType }) => (
    <MessageCard
      key={item.messageId}
      message={item.content}
      timestamp={item.createdAt}
    />
  )

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
          data={messages}
          renderItem={renderMessageItem}
          keyExtractor={(item) => item.messageId}
          inverted={false} // Set to true if you want newest messages at bottom
        />

        <HStack center gap={16} className="border-t border-border py-4">
          <View className="flex-1">
            <Input
              placeholder="Type a message..."
              value={newMessage}
              onChangeText={setNewMessage}
              onSubmitEditing={handleSendMessage}
              canClearText
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
