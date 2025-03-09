import React from "react"

import { Image, Text, TouchableOpacity, View } from "react-native"

import { formatTimeAgo } from "@/utils/formatters"

import { HStack } from "../atoms"

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
    <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
      <View className="flex-1 flex-row items-center gap-2">
        <Image
          source={{ uri: avatarUrl }}
          className="h-20 w-20 rounded-full border border-border"
        />

        <View className="flex-1 flex-col gap-1">
          <HStack className="justify-between">
            <Text className="font-tmedium text-xl text-primary">{name}</Text>
            <Text className="font-tregular text-sm text-secondary">
              {formatTimeAgo(lastMessageAt)}
            </Text>
          </HStack>
          <Text
            className="w-5/6 font-tregular text-base text-secondary"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {lastMessage}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}
