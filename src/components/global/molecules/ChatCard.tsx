import React from "react"

import { Image, Text, View } from "react-native"

import { formatTimeAgo } from "@/utils/formatters"

import { Card, CardHeader, HStack } from "../atoms"

interface ChatCardProps {
  fullName: string
  avatarUrl?: string | number
  lastMessage?: string
  lastMessageAt?: string
  onPress?: () => void
}

export const ChatCard = ({
  fullName,
  avatarUrl,
  lastMessage,
  lastMessageAt,
  onPress
}: ChatCardProps) => {
  const isUrl = typeof avatarUrl === "string"

  return (
    <Card hasImage onPress={onPress}>
      <HStack center gap={12}>
        <Image
          source={isUrl ? { uri: avatarUrl } : avatarUrl}
          className="h-14 w-14 rounded-xl border border-border"
        />

        <View className="flex-1 flex-col">
          <HStack center className="justify-between">
            <CardHeader label={fullName} />

            <Text className="font-tregular text-sm text-accent">
              {lastMessageAt ? formatTimeAgo(lastMessageAt) : ""}
            </Text>
          </HStack>

          <Text
            className="font-tregular text-base text-accent"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {lastMessage || "Chưa có tin nhắn nào"}
          </Text>
        </View>
      </HStack>
    </Card>
  )
}
