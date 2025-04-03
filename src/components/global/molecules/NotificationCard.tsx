import React from "react"

import { Image, Text, TouchableOpacity, View } from "react-native"

import { useRouter } from "expo-router"

import { formatTimeAgo } from "@/utils/formatters"

import { Card, HStack } from "../atoms"

interface NotificationCardProps {
  title: string
  content: string
  timestamp: string
  actionUrl?: string
  isRead: boolean
  onPress?: () => void
  onReadChange?: (value: boolean) => void
}

export const NotificationCard = ({
  title,
  content,
  timestamp,
  actionUrl = "",
  isRead = false,
  onPress
}: NotificationCardProps) => {
  const router = useRouter()

  const handlePress = () => {
    if (onPress) {
      onPress()
    } else if (actionUrl) {
      router.push(actionUrl)
    }
  }

  return (
    <Card onPress={handlePress}>
      <HStack center gap={12}>
        <TouchableOpacity
          activeOpacity={1}
          className="mr-4 h-12 w-12 items-center justify-center rounded-full bg-muted"
        >
          <Image
            source={require("../../../../public/icons/notifications/ring.png")}
            style={{ width: 24, height: 24 }}
          />
        </TouchableOpacity>

        <View className="flex-1">
          <HStack center gap={12} className="justify-between">
            <Text
              className="flex-1 font-tmedium text-base text-primary"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {title} {isRead ? "" : "(Mới)"}
            </Text>

            <Text className="mr-1 font-tregular text-sm text-secondary">
              {formatTimeAgo(timestamp)}
            </Text>
          </HStack>

          <Text
            className="mt-1 font-tregular text-sm text-accent"
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {content}
          </Text>
        </View>
      </HStack>
    </Card>
  )
}
