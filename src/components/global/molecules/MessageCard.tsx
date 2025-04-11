import React from "react"

import { Image, Text, TouchableOpacity, View } from "react-native"

import { cn } from "@/lib/utils"

import { formatTime } from "@/utils/formatters"

interface MessageCardProps {
  sender?: boolean
  messageId: string
  message: string
  timestamp: string
  avatarUrl?: string
  isSelected?: boolean
  onPress?: () => void
}

export const MessageCard = ({
  sender = false,
  messageId,
  message,
  timestamp,
  avatarUrl,
  isSelected = false,
  onPress
}: MessageCardProps) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      className={cn(
        "mb-3 flex-row items-end gap-2",
        sender ? "justify-end" : "justify-start"
      )}
    >
      {!sender && avatarUrl && (
        <Image
          source={{ uri: avatarUrl }}
          className="mr-2 h-10 w-10 rounded-full"
        />
      )}

      {sender && isSelected && (
        <Text className="mr-2 self-center font-tregular text-xs text-accent">
          {formatTime(timestamp)}
        </Text>
      )}

      <View
        className={cn(
          "max-w-[70%] rounded-2xl px-4 py-2",
          sender ? "self-end bg-primary" : "self-start bg-muted"
        )}
      >
        <Text
          className={cn(
            "font-tregular text-base",
            sender ? "text-white" : "text-primary"
          )}
        >
          {message}
        </Text>
      </View>

      {!sender && isSelected && (
        <Text className="ml-2 self-center font-tregular text-xs text-accent">
          {formatTime(timestamp)}
        </Text>
      )}
    </TouchableOpacity>
  )
}
