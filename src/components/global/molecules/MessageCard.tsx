import React from "react"

import { Image, Text, TouchableOpacity, View } from "react-native"

import { cn } from "@/lib/utils"

import { getInitials } from "@/utils/helpers"

const formatTime = (timestamp: string): string => {
  const date = new Date(timestamp)
  const hours = date.getHours().toString().padStart(2, "0")
  const minutes = date.getMinutes().toString().padStart(2, "0")
  return `${hours}h${minutes}`
}

interface MessageCardProps {
  messageId?: string
  sender?: boolean
  name?: string
  avatarUrl?: string | null
  message: string
  timestamp: string
  isSelected?: boolean
  onPress?: () => void
}

export const MessageCard = ({
  messageId,
  sender = false,
  name = "",
  avatarUrl,
  message,
  timestamp,
  isSelected = false,
  onPress
}: MessageCardProps) => {
  const isAvatarValid = avatarUrl && avatarUrl.trim() !== ""

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      className={cn(
        "mb-2 flex-row items-end gap-2",
        sender ? "justify-end" : "justify-start"
      )}
    >
      {!sender && (
        <>
          {isAvatarValid ? (
            <View className="mr-2 h-10 w-10 overflow-hidden rounded-full">
              <Image source={{ uri: avatarUrl }} className="h-full w-full" />
            </View>
          ) : (
            <View className="mr-2 flex h-10 w-10 items-center justify-center rounded-full border border-muted bg-border">
              <Text className="font-tmedium text-xs text-primary">
                {getInitials(name)}
              </Text>
            </View>
          )}
        </>
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
