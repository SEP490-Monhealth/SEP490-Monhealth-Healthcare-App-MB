import React from "react"

import { Image, Text, View } from "react-native"

import { cn } from "@/lib/utils"

import { formatTime } from "@/utils/formatters"

interface MessageCardProps {
  sender?: boolean
  message: string
  timestamp: string
  avatarUrl?: string
}

export const MessageCard = ({
  sender = false,
  message,
  timestamp,
  avatarUrl
}: MessageCardProps) => {
  return (
    <View
      className={cn(
        "flex-row items-end",
        sender ? "justify-end" : "justify-start"
      )}
    >
      {!sender && avatarUrl && (
        <Image
          source={{ uri: avatarUrl }}
          className="mr-2 h-10 w-10 rounded-full"
        />
      )}

      <View
        className={cn(
          "max-w-[70%] rounded-xl px-4 py-2",
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
        <Text
          className={cn(
            "mt-1 font-tregular text-xs text-accent",
            sender ? "text-left" : "text-right"
          )}
        >
          {formatTime(timestamp)}
        </Text>
      </View>
    </View>
  )
}
