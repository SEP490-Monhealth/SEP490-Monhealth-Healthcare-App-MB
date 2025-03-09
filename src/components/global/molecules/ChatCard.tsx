import React from "react"

import { Image, Text, View } from "react-native"

import { formatTimeAgo } from "@/utils/formatters"

import { Card, CardHeader, HStack } from "../atoms"

interface ChatCardProps {
  name: string
  avatarUrl: string
  lastMessage: string
  lastMessageAt: string
  onPress?: () => void
}

export const ChatCard = ({
  name,
  avatarUrl,
  lastMessage,
  lastMessageAt,
  onPress
}: ChatCardProps) => {
  return (
    <Card hasImage onPress={onPress}>
      <HStack center gap={12}>
        <Image
          source={{ uri: avatarUrl }}
          className="h-14 w-14 rounded-xl border border-border"
        />

        <View className="flex-1 flex-col">
          <HStack center className="justify-between">
            <CardHeader label={name} />

            <Text className="font-tregular text-sm text-secondary">
              {formatTimeAgo(lastMessageAt)}
            </Text>
          </HStack>

          <Text
            className="font-tregular text-base text-accent"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {lastMessage}
          </Text>
        </View>
      </HStack>
    </Card>
  )
}
