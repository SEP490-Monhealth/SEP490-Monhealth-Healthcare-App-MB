import React, { useEffect, useState } from "react"

import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Linking,
  SafeAreaView,
  Text,
  View
} from "react-native"
import { Platform } from "react-native"
import { TouchableOpacity } from "react-native"

import { useLocalSearchParams } from "expo-router"

import { appConfig } from "@/configs/app"
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel
} from "@microsoft/signalr"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { ClipboardText, Send2 } from "iconsax-react-native"
import LottieView from "lottie-react-native"

import { HStack, Input, VStack } from "@/components/global/atoms"
import { MeetingCard } from "@/components/global/molecules"
import { MessageCard } from "@/components/global/molecules/MessageCard"
import { Header } from "@/components/global/organisms"

import { COLORS } from "@/constants/color"
import { BookingStatusEnum } from "@/constants/enum/Booking"

import { useAuth } from "@/contexts/AuthContext"

import { useGetBookingsByUserIdAndConsultantId } from "@/hooks/useBooking"
import { useGetChatById } from "@/hooks/useChat"

import { CreateMessageType, MessageType } from "@/schemas/messageSchema"

const containsEmail = (text: string) => {
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g
  return emailRegex.test(text)
}

const containsPhoneNumber = (text: string) => {
  const phoneRegex =
    /(\+?\d{1,4}[ .-]?)?(\(?\d{3,4}\)?[ .-]?)?\d{3}[ .-]?\d{4}/g
  return phoneRegex.test(text)
}

function ChatDetailsScreen() {
  const { chatId } = useLocalSearchParams<{ chatId: string }>()

  const { user } = useAuth()
  const userId = user?.userId
  const consultantId = user?.consultantId

  const senderId = (consultantId ?? userId)!

  // console.log(userId, consultantId, senderId)

  const [chatHubConnection, setChatHubConnection] = useState<HubConnection>()
  const [connectionStatus, setConnectionStatus] = useState<boolean>(false)
  const [messages, setMessages] = useState<MessageType[]>([])
  const [newMessage, setNewMessage] = useState<string>("")
  const [isLoadingMessages, setIsLoadingMessages] = useState(true)
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null)
  const [validationError, setValidationError] = useState<string>("")

  const { data: chatData } = useGetChatById(chatId)

  const { data: bookingsData } = useGetBookingsByUserIdAndConsultantId(
    chatData?.userId,
    chatData?.consultantId
  )

  const currentBooking = bookingsData?.find(
    (booking) => booking.status === BookingStatusEnum.Booked
  )

  useEffect(() => {
    let connection: HubConnection | null = null

    const setupConnection = async () => {
      if (connection) {
        await connection.stop()
      }

      connection = new HubConnectionBuilder()
        .withUrl(`${appConfig.baseUrl}/chatbox`, {
          accessTokenFactory: async () => {
            const token = await AsyncStorage.getItem("accessToken")
            return token || ""
          }
        })
        .withAutomaticReconnect()
        .configureLogging(LogLevel.Information)
        .build()

      connection.on("LoadMessageHistory", (messageHistory: MessageType[]) => {
        // console.log("🔄 Message history received:", messageHistory)
        setMessages(messageHistory)
        setTimeout(() => setIsLoadingMessages(false), 0)
      })

      connection.on("ReceiveMessage", (message: MessageType) => {
        // console.log("📥 Received new message:", message)
        setMessages((prev) => {
          if (!prev.some((m) => m.messageId === message.messageId)) {
            return [message, ...prev]
          }
          return prev
        })
      })

      connection.on("ErrorOccurred", (errorMessage: string) => {
        console.error("🚨 Error from server:", errorMessage)
      })

      try {
        await connection.start()
        console.log("✅ Connection started")
        setConnectionStatus(true)
        await connection.invoke("JoinChat", chatId)
        setChatHubConnection(connection)
      } catch (error) {
        console.error("❌ Error starting connection:", error)
        setConnectionStatus(false)
        setIsLoadingMessages(false)
      }
    }

    setupConnection()

    return () => {
      if (connection) {
        connection.off("LoadMessageHistory")
        connection.off("ReceiveMessage")
        connection.off("ErrorOccurred")
        connection.stop()
      }
    }
  }, [chatId])

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !connectionStatus) return

    if (containsEmail(newMessage)) {
      setValidationError("Không được phép gửi địa chỉ email trong tin nhắn")
      return
    }

    if (containsPhoneNumber(newMessage)) {
      setValidationError("Không được phép gửi số điện thoại trong tin nhắn")
      return
    }

    setValidationError("")

    if (chatHubConnection) {
      const newData: CreateMessageType = {
        chatId: chatId,
        senderId,
        content: newMessage
      }

      try {
        // console.log("Sending message:", JSON.stringify(newData, null, 2))

        // await sendMessage(newData)

        await chatHubConnection.invoke("SendMessage", newData)

        setNewMessage("")
      } catch (error) {
        console.error("Error sending message:", error)
      }
    }
  }

  const handlePressMessage = async (selectedMessage: string) => {
    setSelectedMessage(selectedMessage)
  }

  const handleViewMeetingUrl = () => {
    if (currentBooking) {
      Linking.openURL(currentBooking.meetingUrl)
    }
  }

  const renderMessageItem = ({
    item,
    index
  }: {
    item: MessageType
    index: number
  }) => {
    const currentSender = item.senderId
    const nextMessage = messages?.[index - 1]
    const showAvatar = !nextMessage || nextMessage.senderId !== currentSender

    return (
      <MessageCard
        key={item.messageId}
        messageId={item.messageId}
        sender={currentSender === senderId}
        message={item.content}
        timestamp={item.createdAt}
        avatarUrl={showAvatar ? item.avatarUrl : undefined}
        isSelected={selectedMessage === item.messageId}
        onPress={() => handlePressMessage(item.messageId)}
      />
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <VStack gap={12} className="px-6">
        <Header
          back
          label={
            consultantId
              ? chatData?.member.fullName
              : chatData?.consultant.fullName
          }
          action={{
            icon: (
              <ClipboardText variant="Bold" size={20} color={COLORS.primary} />
            ),
            href: `/chats/${chatId}/information`
          }}
        />

        {currentBooking && (
          <MeetingCard
            meetingUrl={currentBooking.meetingUrl}
            onPress={handleViewMeetingUrl}
          />
        )}
      </VStack>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 px-6"
      >
        {isLoadingMessages ? (
          <View className="flex-1 items-center justify-center">
            <LottieView
              source={require("../../../../public/videos/monhealth-loading.json")}
              autoPlay
              loop
              style={{ width: 120, height: 120 }}
            />
          </View>
        ) : messages.length > 0 ? (
          <FlatList
            data={messages}
            renderItem={renderMessageItem}
            keyExtractor={(item, index) =>
              `${item.messageId ?? "msg"}-${index}`
            }
            inverted
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View className="flex flex-1 flex-col items-center justify-center gap-8 px-6 pb-24">
            <Image
              source={{
                uri: consultantId
                  ? chatData?.member.avatarUrl
                  : chatData?.consultant.avatarUrl
              }}
              className="rounded-full"
              style={{ height: 128, width: 128 }}
            />

            <VStack center gap={8}>
              <Text className="text-center font-tbold text-xl text-primary">
                {consultantId
                  ? "Hãy bắt đầu cuộc trò chuyện với người dùng!"
                  : "Hãy gửi câu hỏi cho chuyên viên!"}
              </Text>
              <Text className="text-center font-tregular text-base text-accent">
                {consultantId
                  ? "Khi người dùng gửi tin nhắn, bạn có thể phản hồi trực tiếp tại đây."
                  : "Bạn có thể đặt câu hỏi về sức khỏe, chuyên môn, hoặc bất kỳ điều gì bạn cần hỗ trợ."}
              </Text>
            </VStack>
          </View>
        )}

        <HStack center gap={16} className="border-t border-border py-4">
          <View className="flex-1">
            <Input
              placeholder="Nhập tin nhắn..."
              value={newMessage}
              onChangeText={(text) => {
                setNewMessage(text)
                if (validationError) setValidationError("")
              }}
              onSubmitEditing={handleSendMessage}
            />

            {validationError ? (
              <Text className="ml-2 mt-1 font-tregular text-sm text-destructive">
                {validationError}
              </Text>
            ) : null}
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
